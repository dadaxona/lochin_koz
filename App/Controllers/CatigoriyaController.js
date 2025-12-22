const { Catigoriya } = require('../../models');

class CatigoriyaController {
  static async get(req, res) {    
    try{
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await Catigoriya.findAll({
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
      const result = await Catigoriya.create({...req.body});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async update(req, res) {
    try {
      const result = await Catigoriya.update({...req.body}, {where: {id: Number(req.params.id)}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Catigoriya.destroy({where: {id: Number(req.params.id)}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }
}

module.exports = CatigoriyaController;
