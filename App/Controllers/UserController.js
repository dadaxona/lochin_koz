const { User, Rasm, Info, Yuklash, Davlat, Viloyat, Tuman } = require('../../models');
const FileUplode = require('../Servis/FileUplode');
const { DateTime } = require("luxon");
const axios = require('axios');
const FormData = require('form-data');
const { Op } = require('sequelize');
class UserController {
  static async search_photo(req, res) {
    try {      
      if (!req.file) return res.json({ statusCode: 400, message: "Rasm yo'q" });
      const form = new FormData();
      form.append('image', req.file.buffer, {
        filename: 'search.jpg',
        contentType: req.file.mimetype,
      });
      const response = await axios.post('http://localhost:5050/search', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      const aiResult = response.data;
      if (!aiResult && aiResult.results.length < 1) {
        return res.json({ statusCode: 404 });
      }
      const ids = aiResult.results.map(item => item.id);
      const users = await Rasm.findAll({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });
      if (users && users.length) {
        const id = users.map(item => item.userId);
        const findAll = await User.findAll({
          where: { id: {[Op.in]: id } },
          include: [
            {
              model: Info
            },
            {
              model: Rasm
            }
          ]
        });
        return res.json({ statusCode: 200, items: findAll });
      } else {
        return res.json({ statusCode: 404 });
      }
    } catch (error) {
      console.error("AI Server bilan bog'lanishda xato:", error.message);
      return res.json({ statusCode: 500 });
    }
  }

  static async search (req, res) {
    try {
      let findAll;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 25;
      const offset = (page - 1) * limit;
      if (req.query.qoshimcha) {
        findAll = await User.findAll({
          limit,
          offset,
          order: [['id', 'DESC']],
          include: [
            {
              model: Info,
              where: {qoshimcha: { [Op.like]: `%${req.query.qoshimcha}%` }}
            },
            {
              model: Rasm
            }
          ]
        })
      } else {
        const option = await FileUplode.option(req.query);
        findAll = await User.findAll({
          ...option,
          limit,
          offset,
          order: [['id', 'DESC']],
          include: [
            {
              model: Info
            },
            {
              model: Rasm
            }
          ]
        })
      }
      return res.json({ statusCode: 200, items: findAll });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async get(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try{
      const option = await FileUplode.option(req.query);
      const result = await User.findAll({
        ...option,
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']],
        include: [
          {
            model: Info
          },
          {
            model: Rasm
          }
        ]
      });
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async yuklash (req, res) {
    try {
      const { ism, familiya, sharif, lavozim } = req.user.result;
      const { setfio, pnfel, davlatId, viloyatId, tumanId, mahalla, sana, jinsi, catigoriya, bolim, toifa } = req.body;
      let davlat, viloyat, tuman;
      if (davlatId) {
        const d = await Davlat.findByPk(Number(davlatId));
        davlat = d.davlat;
      }
      if (viloyatId) {
        const d = await Viloyat.findByPk(Number(viloyatId));
        viloyat = d.viloyat;
      }
      if (tumanId) {
        const d = await Tuman.findByPk(Number(tumanId));
        tuman = d.tuman;
      }
      const nowInUzbekistan = DateTime.now().setZone("Asia/Tashkent");
      const formattedDate = nowInUzbekistan.toFormat("yyyy-MM-dd HH:mm:ss");
      await Yuklash.create({
        xodim: `${ism} ${familiya} ${sharif}`,
        lavozim: lavozim || '',
        fio: setfio || '',
        pnfel: pnfel || '',
        davlat: davlat || '',
        viloyat: viloyat || '',
        tuman: tuman || '',
        mahalla: mahalla || '',
        sana: sana || '',
        jinsi: jinsi || '',
        catigoriya: catigoriya || '',
        bolim: bolim || '',
        toifa: toifa || '',
        vaqt: String(formattedDate)
      })
      return res.json({statusCode: 200})
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async create(req, res) {
    try {      
      const result = await User.create({...req.body});
      const jsonData = req.body.infoList;
      if (jsonData.length > 0) {
        let arr = [];
        for (let i = 0; i < jsonData.length; i++) {
          const element = jsonData[i];
          arr.push({
            userId: result.id,
            qoshimcha: element.qoshimcha,
          })
        }        
        await Info.bulkCreate(arr);
      }
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async update(req, res) {
    try {
      await Info.destroy({where: {userId: Number(req.params.id)}});
      const result = await User.update({...req.body}, {where: {id: req.params.id}});      
      const jsonData = req.body.infoList;
      if (jsonData.length > 0) {
        let arr = [];
        for (let i = 0; i < jsonData.length; i++) {
          const element = jsonData[i];
          arr.push({
            userId: Number(req.params.id),
            qoshimcha: element.qoshimcha,
          })
        }        
        await Info.bulkCreate(arr);
      }
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async user_uplode (req, res) {
    try {
      const respond = await User.create({...req.body});
      for (let i = 0; i < req.files.length; i++) {
        const element = req.files[i];
        const optimizedBuffer = await FileUplode.imgSize(element.buffer);
        const rasmlar = await Rasm.create({
          userId: respond.id
        })
        const data = await FileUplode.uplodePhoto(optimizedBuffer, rasmlar.id);
        rasmlar.rasm = data;
        await rasmlar.save();
      }
      const jsonData = JSON.parse(req.body.infoList) || req.body.infoList;
      if (jsonData.length > 0) {
        let arr = [];
        for (let i = 0; i < jsonData.length; i++) {
          const element = jsonData[i];
          arr.push({
            userId: respond.id,
            qoshimcha: element.qoshimcha,
          })
        }        
        await Info.bulkCreate(arr);
      }
      return res.json({ statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async user_update (req, res) {
    try {
      await Info.destroy({where: {userId: Number(req.params.id)}})
      const respond = await User.findByPk(Number(req.params.id));
      const rasims = await Rasm.findAll({
        where: {userId: respond.id}
      })
      if (rasims.length > 0) {
        for (let i = 0; i < rasims.length; i++) {
          const element = rasims[i];
          await FileUplode.RemoveImage(element.id);
          await rasims.destroy();
        }
      }
      const resp = await User.update({...req.body}, {where: {id: Number(req.params.id)}});
      if (resp) {
        for (let i = 0; i < req.files.length; i++) {
          const element = req.files[i];
          const optimizedBuffer = await FileUplode.imgSize(element.buffer);
          const rasmlar = await Rasm.create({
            userId: Number(req.params.id)
          })
          const data = await FileUplode.uplodePhoto(optimizedBuffer, rasmlar.id);
          rasmlar.rasm = data;
          await rasmlar.save();
        }
      }
      const jsonData = JSON.parse(req.body.infoList) || req.body.infoList;
      if (jsonData.length > 0) {
        let arr = [];
        for (let i = 0; i < jsonData.length; i++) {
          const element = jsonData[i];
          arr.push({
            userId: Number(req.params.id),
            qoshimcha: element.qoshimcha,
          })
        }        
        await Info.bulkCreate(arr);
      }
      return res.json({ statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }

  static async delete(req, res) {
    try {
      const respond = await User.findByPk(Number(req.params.id));
      const rasims = await Rasm.findAll({
        where: {userId: respond.id}
      })
      if (rasims.length > 0) {
        for (let i = 0; i < rasims.length; i++) {
          const element = rasims[i];
          await FileUplode.RemoveImage(element.id);
          await element.destroy();
        }
      }
      await respond.destroy();
      return res.json({ statusCode: 200 });
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 404 });
    }
  }
}

module.exports = UserController;
