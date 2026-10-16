// 404 - Ruta no encontrada
const notFound = (req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
};

// Manejador central de errores
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    // Error de validación de Sequelize (ej: campo requerido vacío)
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Datos inválidos',
            detalles: err.errors.map(e => e.message)
        });
    }

    // Error de restricción única (ej: email repetido)
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Recurso duplicado',
            detalles: err.errors.map(e => e.message)
        });
    }

    // JSON mal formado en el body
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'JSON mal formado' });
    }

    // Error genérico (no revelar detalles internos al cliente)
    res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = { notFound, errorHandler };