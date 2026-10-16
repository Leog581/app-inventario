const { Proveedor } = require('../models');
const { Op } = require('sequelize');

// GET /api/proveedores?q=texto → busca por nombre
const searchProveedores = async (req, res) => {
    const q = (req.query.q || '').trim();

    const proveedores = await Proveedor.findAll({
        where: {
            nombre: { [Op.like]: `%${q}%` }
        },
        limit: 40
    });

    // Formato que espera Select2 (id + text)
    const resultado = proveedores.map(p => ({
        id: p.id,
        text: p.nombre,
        email: p.email,
        telefono: p.telefono,
        direccion: p.direccion
    }));

    res.json(resultado);
};

module.exports = { searchProveedores };