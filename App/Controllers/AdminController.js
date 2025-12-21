const Servis = require("../Servis/Servis");
const { Admin } = require('../../models');
const { generateToken } = require("../Middleware/Auth");
class AdminController {
    static async get (req, res) {
        return res.json({keldi: 'Ishladi'})
    }

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
                return res.json({statusCode: 200, token})
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
}

module.exports = AdminController;