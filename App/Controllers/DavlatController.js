const { Davlat, Viloyat, Tuman, Catigoriya, Bolim, Toifa } = require('../../models');

class DavlatController {
  static async all(req, res) {
    try{
      const result = await Davlat.findAll({
        include: [
          {
            model: Viloyat,
            include: [
              {
                model: Tuman
              }
            ]
          }
        ]
      });
      const result2 = await Catigoriya.findAll({
        include: [
          {
            model: Bolim,
            include: [
              {
                model: Toifa
              }
            ]
          }
        ]
      })
      const result3 = await Tuman.findAll({
        where: {viloyatId: Number(req.query.viloyatId)}
      })
      return res.json({ items: result, items2: result2, items3: result3, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async get(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try{
      const result = await Davlat.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
      });
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async create(req, res) {
    try {
      const result = await Davlat.create({...req.body});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async update(req, res) {
    try {
      const result = await Davlat.update({...req.body}, {where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Davlat.destroy({where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }
}

module.exports = DavlatController;
