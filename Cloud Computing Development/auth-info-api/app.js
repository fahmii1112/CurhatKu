require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./services/firebaseConfig');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const infoRoutes = require('./routes/info');
const diskusiRoutes = require('./routes/diskusi');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/info', infoRoutes);
app.use('/diskusi', diskusiRoutes);
app.use('/comment', commentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));