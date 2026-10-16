require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const itemsRoutes = require('./routes/itemsRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/items', itemsRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/proveedores', proveedoresRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;