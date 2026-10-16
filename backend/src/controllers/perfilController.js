const { Perfil } = require('../models');

// GET /api/perfil → devuelve el perfil (siempre el id=1)
const getPerfil = async (req, res) => {
    const perfil = await Perfil.findByPk(1);

    if (!perfil) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.json(perfil);
};

module.exports = { getPerfil };