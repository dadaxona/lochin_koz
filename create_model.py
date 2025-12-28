import os
import cv2
import pickle
from insightface.app import FaceAnalysis

# Rasmlar joylashgan katalog
folder_path = "uploads"
app = FaceAnalysis(name="buffalo_l", providers=["CUDAExecutionProvider", "CPUExecutionProvider"])
# InsightFace App
app.prepare(ctx_id=0, det_size=(640, 640))  # ctx_id=0 -> birinchi GPU, det_size optimal

# Embaddinglar saqlanadigan dictionary
embeddings_dict = {}

# Rasmlarni qayta ishlash
for filename in os.listdir(folder_path):
    if filename.lower().endswith(".jpg"):
        file_id = os.path.splitext(filename)[0]  # fayl nomidan ID olish, masalan "1413"
        img_path = os.path.join(folder_path, filename)
        img = cv2.imread(img_path)
        if img is None:
            print(f"Rasmni ochib bo‘lmadi: {filename}")
            continue

        faces = app.get(img)
        if len(faces) == 0:
            print(f"Yuz topilmadi: {filename}")
            continue

        # Birinchi yuz embaddingini olish
        embeddings_dict[file_id] = faces[0].embedding

        print(f"ID {file_id}: embedding yaratildi")

# Saqlash
with open("model.pkl", "wb") as f:
    pickle.dump(embeddings_dict, f)

print(f"Jami {len(embeddings_dict)} embaddinglar saqlandi.")
