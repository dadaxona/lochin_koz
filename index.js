const express = require('express');
const cors = require('cors');
const path = require("path");
const route = require('./App/Routes/route');
const { verifyToken } = require('./App/Middleware/Auth');
const AdminController = require('./App/Controllers/AdminController');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.post('/login', AdminController.login);
app.post('/registration', AdminController.registration);
route.get('/checkking_auth', verifyToken, AdminController.checkking_auth);

app.use(verifyToken);
app.use(route);
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");
// setfio, pnfel, davlatId, viloyatId, tumanId, mahalla, sana, jinsi, catigoriya, bolim