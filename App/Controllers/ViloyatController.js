const { Viloyat, Tuman } = require('../../models');

class ViloyatController {
  static async viloyat (req, res) {
    try{
      const result = await Viloyat.findAll({
        include: [
          {
            model: Tuman
          }
        ],
        order: [['viloyat', 'ASC']]
      });
      return res.json({ items: result, statusCode: 200 });
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
      const result = await Viloyat.findAll({
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
      const result = await Viloyat.create({...req.body});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async update(req, res) {
    try {
      const result = await Viloyat.update({...req.body}, {where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Viloyat.destroy({where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }
}

module.exports = ViloyatController;
