const { Router } = require('express');
const multer = require('multer');
const AdminController = require('../Controllers/AdminController');
const { verifyToken } = require('../Middleware/Auth');
const CatigoriyaController = require('../Controllers/CatigoriyaController');
const DavlatController = require('../Controllers/DavlatController');
const ViloyatController = require('../Controllers/ViloyatController');
const TumanController = require('../Controllers/TumanController');
const UserController = require('../Controllers/UserController');
const BolimController = require('../Controllers/BolimController');
const route = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/verifiy', verifyToken, AdminController.verifiy);

route.get('/catigoriya', CatigoriyaController.get);
route.post('/catigoriya', CatigoriyaController.create);
route.put('/catigoriya/:id', CatigoriyaController.update);
route.delete('/catigoriya/:id', CatigoriyaController.delete);

route.get('/bolim', BolimController.get);
route.post('/bolim', BolimController.create);
route.put('/bolim/:id', BolimController.update);
route.delete('/bolim/:id', BolimController.delete);

route.get('/all', DavlatController.all);
route.get('/davlat', DavlatController.get);
route.post('/davlat', DavlatController.create);
route.put('/davlat/:id', DavlatController.update);
route.delete('/davlat/:id', DavlatController.delete);

route.get('/viloyat', ViloyatController.get);
route.post('/viloyat', ViloyatController.create);
route.put('/viloyat/:id', ViloyatController.update);
route.delete('/viloyat/:id', ViloyatController.delete);

route.get('/tuman', TumanController.get);
route.post('/tuman', TumanController.create);
route.put('/tuman/:id', TumanController.update);
route.delete('/tuman/:id', TumanController.delete);

route.get('/search', UserController.search);
route.get('/user', UserController.get);
route.post('/user', UserController.create);
route.put('/user/:id', UserController.update);
route.post('/user_uplode', upload.array('images'), UserController.user_uplode);
route.put('/user_uplode/:id', upload.array('images'), UserController.user_update);
route.delete('/user/:id', UserController.delete);

module.exports = route;