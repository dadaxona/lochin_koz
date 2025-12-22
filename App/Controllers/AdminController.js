const Servis = require("../Servis/Servis");
const { Admin, Viloyat, Tuman } = require('../../models');
const { generateToken } = require("../Middleware/Auth");
const { Op } = require("sequelize");
class AdminController {

    static async checkking_auth (req, res) {        
        return req.user.result.login ? res.json({ statusCode: 200 }) : res.json({ statusCode: 404 });
    }

    static async verifiy (req, res) {
        if (req && req.user && req.user.result && req.user.result.id) {
            return res.json({statusCode: 200})
        } else {
            return res.json({statusCode: 404})
        }
    }

    static async login (req, res) {
        try {            
            const result = await new Servis(Admin, {
                where: {
                    login: req.body.login,
                    password: req.body.password
                }
            }).findOne()            
            if (result) {
                const token = generateToken({
                    result
                })
                return res.json({statusCode: 200, token, viloyatId: result?.viloyatId, tumanId: result?.tumanId, role: result?.role})
            } else {
                const result = await new Servis(Admin, {...req.body}).create()
                const token = generateToken({
                    result
                })
                return res.json({statusCode: 200, token})
            }
        } catch (error) {
            console.log(error, 'login');
            return res.json({statusCode: 404})
        }
    }

    static async registration (req, res) {
        try {
            const result = await new Servis(Admin, {...req.body}).create()
            const token = generateToken({
                result
            })
            return res.json({statusCode: 200, token})
        } catch (error) {
            console.log(error, 'registration');
            return res.json({statusCode: 404})
        }
    }

    static async get (req, res) {
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await Admin.findAll({
                where: {role: {[Op.notIn]: ['Sup', 'Tum']}},
                limit: limit,
                offset: offset,
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Viloyat
                    },
                    {
                        model: Tuman
                    }
                ]
            });
            return res.json({ items: result, statusCode: 200 });
        } catch (error) {
            console.log(error);
            return res.json({statusCode: 404})
        }
    }

    static async get2 (req, res) {
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await Admin.findAll({
                where: { 
                    viloyatId: Number(req.query.viloyatId),
                    role: {[Op.notIn]: ['Sup', 'Vil']}
                },
                limit: limit,
                offset: offset,
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Viloyat
                    },
                    {
                        model: Tuman
                    }
                ]
            });
            return res.json({ items: result, statusCode: 200 });
        } catch (error) {
            console.log(error);
            return res.json({statusCode: 404})
        }
    }
    
    static async create (req, res) {
        try {
            const check_log = await Admin.findOne({
                where: {
                    login: req.body.login
                }
            });
            if (!check_log) {
                await Admin.create({...req.body});
                return res.json({statusCode: 200})
            } else {
                return res.json({statusCode: 202})
            }
        } catch (error) {
            console.log(error);
            return res.json({statusCode: 404})
        }
    }

    static async update (req, res) {
        try {
            const check_log = await Admin.findOne({
                where: {
                    login: req.body.login
                }
            });
            if (!check_log) {
                await Admin.update({...req.body}, {where: {id: Number(req.params.id)}});
                return res.json({statusCode: 200});
            } else {
                return res.json({statusCode: 202});
            }
        } catch (error) {
            console.log(error);
            return res.json({statusCode: 404})
        }
    }

    static async delete (req, res) {
        try {
            await Admin.destroy({where: {id: Number(req.params.id)}});
            return res.json({ statusCode: 200 });
        } catch (error) {
            console.log(error);
            return res.json({statusCode: 404})
        }
    }
}

module.exports = AdminController;