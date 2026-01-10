import cv2
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS kutubxonasi
from insightface.app import FaceAnalysis

app_flask = Flask(__name__)

# --- CORS SOZLAMASI ---
# Bu barcha domenlardan (Node.js, React va h.k.) so'rovlarni qabul qilish imkonini beradi
CORS(app_flask) 

# Modelni yuklash
print("Model yuklanmoqda...")
face_app = FaceAnalysis(name='buffalo_l', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
face_app.prepare(ctx_id=0, det_size=(640, 640))

# Bazani yuklash funksiyasi (alohida funksiyaga oldik)
def load_database():
    global embeddings_db
    try:
        with open("model.pkl", "rb") as f:
            embeddings_db = pickle.load(f)
        return True
    except Exception as e:
        print(f"Baza yuklashda xato: {e}")
        embeddings_db = {}
        return False

load_database()
print("AI Server tayyor!")

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 1. QIDIRUV ENDPOINTI (Bir nechta yuzlar uchun)
@app_flask.route('/search', methods=['POST'])
def search():
    if 'image' not in request.files:
        return jsonify({"results": [], "error": "Rasm yuborilmadi"}), 400
    
    file = request.files['image']
    img_array = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    # 1. Rasm ichidagi barcha yuzlarni aniqlash
    faces = face_app.get(img)
    
    if not faces:
        return jsonify({"results": [], "message": "No face detected"}), 200

    # JS dagi let results = [] kabi massiv yaratamiz
    results = []

    # 1. Rasm ichidagi barcha yuzlarni bitta-bitta ko'rib chiqamiz
    for face in faces:
        face_emb = face.embedding
        
        best_id = None
        max_sim = 0.0

        # 2. Bazadagi har bir inson bilan solishtiramiz
        for id_, emb in embeddings_db.items():
            sim = cosine_similarity(face_emb, emb)
            
            if sim > 0.6 and sim > max_sim:
                max_sim = sim
                best_id = id_

            # 3. Agar ID topilgan bo'lsa va u hali results massivimizda bo'lmasa qo'shamiz
            if best_id is not None:
                # JS-dagi results.find(r => r.id === best_id) mantiqi:
                already_exists = any(item['id'] == best_id for item in results)
                
                if not already_exists:
                    results.append({
                        "id": best_id,
                        "similarity": round(float(max_sim), 2)
                    })

    return jsonify({"results": results})
# 2. MODELNI YANGILASH ENDPOINTI (Node.js yangi rasm qo'shganda buni chaqiradi)
@app_flask.route('/reload', methods=['GET'])
def reload_db():
    if load_database():
        return jsonify({"status": "success", "message": "Model database reloaded"})
    return jsonify({"status": "error"}), 500

if __name__ == '__main__':
    # host='0.0.0.0' tarmoqdagi boshqa qurilmalar ulanishi uchun
    app_flask.run(host='0.0.0.0', port=5050, debug=False)