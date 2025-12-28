const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const sharp = require('sharp');
class FileUplode {
    static async CMD () {
        const pythonPath = `"C:\\Users\\abdul\\Desktop\\lochin_koz\\venv\\Scripts\\python.exe"`;
        const scriptPath = `"C:\\Users\\abdul\\Desktop\\lochin_koz\\create_model.py"`;
        execSync(`${pythonPath} ${scriptPath}`, { stdio: 'inherit' });
        console.log("Model muvaffaqiyatli yangilandi.");
    }
    static async imgSize(buffer) {
        const maxSize = 200 * 1024;
        const width = 480;
        const height = 640;
        let quality = 80;
        let output = await sharp(buffer)
            .rotate()
            .resize(width, height, { fit: 'inside' })
            .toColourspace('srgb')
            .jpeg({ quality })
            .toBuffer();
        while (output.length > maxSize && quality > 10) {
            quality -= 5;
            output = await sharp(buffer)
                .rotate()
                .resize(width, height, { fit: 'inside' })
                .toColourspace('srgb')
                .jpeg({ quality })
                .toBuffer();
        }
        return output;
    }
    
    static async uplodePhoto (file, id) {
        const uploadDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const oldPath = path.join(uploadDir, `${id}.jpg`);
        if (fs.existsSync(oldPath)) {
            try {
                fs.unlinkSync(oldPath);
                console.log("Eski rasm o'chirildi:", oldPath);
            } catch (err) {
                console.error("Eski rasmni o‘chirishda xato:", err);
            }
        }
        const uniqueName = `${id}.jpg`;
        const savePath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(savePath, file);
        return uniqueName;
    }

    static async RemoveImage (id) {
        const uploadDir = path.join(__dirname, "../../uploads");
        const oldPath = path.join(uploadDir, `${id}.jpg`);
        if (fs.existsSync(oldPath)) {
            try {
                fs.unlinkSync(oldPath);
                console.log("Eski rasm o'chirildi:", oldPath);
            } catch (err) {
                console.error("Eski rasmni o‘chirishda xato:", err);
            }
        }
    }
    static async option (query) {
        let where = {};
        if (query.id) {
            where.id = Number(query.id);
        }
        if (query.davlatId) {
            where.davlatId = Number(query.davlatId);
        }
        if (query.viloyatId) {
            where.viloyatId = Number(query.viloyatId);
        }
        if (query.tumanId) {
            where.tumanId = Number(query.tumanId);
        }
        if (query.mahalla) {
            where.mahalla = query.mahalla;
        }
        if (query.sana) {
            where.sana = query.sana;
        }
        if (query.jinsi) {
            where.jinsi = query.jinsi;
        }
        if (query.catigoriya) {
            where.catigoriya = query.catigoriya;
        }
        if (query.bolim) {
            where.bolim = query.bolim;
        }
        if (query.search) {
            where[Op.or] = [
                { ism: { [Op.like]: `%${query.search}%` } },
                { familiya: { [Op.like]: `%${query.search}%` } },
                { sharif: { [Op.like]: `%${query.search}%` } },
            ];
        }
        if (query.pnfel) {
            where[Op.or] = [
                { pnfel: { [Op.like]: `%${query.pnfel}%` } },
                { seriya: { [Op.like]: `%${query.pnfel}%` } }
            ];
        }
        return { where };
    }
}
module.exports = FileUplode;