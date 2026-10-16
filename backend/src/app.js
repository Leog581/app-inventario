require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const itemsRoutes = require('./routes/itemsRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Rutas de la API
app.use('/api/items', itemsRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/proveedores', proveedoresRoutes);

// Manejo de errores (siempre al final, en este orden)
app.use(notFound);
app.use(errorHandler);

// Arranque del servidor
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a Neon establecida');

        await sequelize.sync();
        console.log('✅ Tablas sincronizadas con Neon');

        /* app.listen(PORT, '127.0.0.1', () => {
            console.log(` Servidor en http://localhost:${PORT}`);
        }); */

    } catch (error) {
        if (error.name === 'SequelizeConnectionRefusedError') {
        console.error('❌ Error de conexión a la BD:', error.parent.code);
        } else if (error.name === 'SequelizeHostNotFoundError') {
        console.error('❌ Host de la BD no encontrado:', error.message);
        } else {
        console.error('❌ Error inesperado:', error);
        }
        process.exit(1);
    }
}

startServer();

module.exports = app;