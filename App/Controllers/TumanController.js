const { Tuman } = require('../../models');

class TumanController {
  static async get(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try{
      const result = await Tuman.findAll({
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
      const result = await Tuman.create({...req.body});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async update(req, res) {
    try {
      const result = await Tuman.update({...req.body}, {where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Tuman.destroy({where: {id: req.params.id}});
      return res.json({ items: result, statusCode: 200 });
    } catch (error) {
      return res.json({ statusCode: 404 });
    }
  }
}

module.exports = TumanController;
