const { User, Rasm, Info } = require('../../models');
const FileUplode = require('../Servis/FileUplode');

class UserController {
  static async search (req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 25;
      const offset = (page - 1) * limit;
      const option = await FileUplode.option(req.query);
      const findAll = await User.findAll({
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
      const result = await User.findAll({
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

  static async create(req, res) {
    try {
      const result = await User.create({...req.body});
      const jsonData = JSON.parse(req.body.infoList || [])
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
      await Info.destroy({where: {userId: Number(req.params.id)}})
      const result = await User.update({...req.body}, {where: {id: req.params.id}});
      const jsonData = JSON.parse(req.body.infoList || [])
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
      const jsonData = JSON.parse(req.body.infoList || [])
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
      const jsonData = JSON.parse(req.body.infoList || [])
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
