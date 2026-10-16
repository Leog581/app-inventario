const { Item } = require('../models');

// GET /api/items → lista todos los items + totales
const getItems = async (req, res) => {
    const rows = await Item.findAll({ order: [['id', 'ASC']] });

    const items = rows.map(r => {
        const cantidad = Number(r.cantidad);
        const precio = Number(r.precio);
        return {
            id: r.id,
            codigo: r.codigo,
            descripcion: r.descripcion,
            unidad: r.unidad,
            cantidad,
            precio,
            total: Number((cantidad * precio).toFixed(2))
        };
    });

    const valorTotal = items.reduce((sum, i) => sum + i.total, 0);
    const stockTotal = items.reduce((sum, i) => sum + i.cantidad, 0);

    res.json({
        items,
        valorTotal: Number(valorTotal.toFixed(2)),
        stockTotal
    });
};

// POST /api/items → crea un item nuevo
const createItem = async (req, res) => {
    const { codigo, descripcion, unidad, cantidad, precio } = req.body;

    // Validación mínima
    if (!codigo || !descripcion || !unidad || cantidad == null || precio == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevo = await Item.create({
        codigo,
        descripcion,
        unidad,
        cantidad: parseInt(cantidad, 10),
        precio: parseFloat(precio)
    });

    res.status(201).json(nuevo);
};

// PATCH /api/items/:id → actualiza cantidad o precio
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { campo, valor } = req.body; // campo: 1=cantidad, 2=precio

    const item = await Item.findByPk(id);
    if (!item) {
        return res.status(404).json({ error: 'Item no encontrado' });
    }

    if (campo === 1) {
        item.cantidad = parseInt(valor, 10);
    } else if (campo === 2) {
        item.precio = parseFloat(valor);
    } else {
        return res.status(400).json({ error: 'Campo inválido' });
    }

    await item.save();
    res.json(item);
};

// DELETE /api/items/:id → elimina un item
const deleteItem = async (req, res) => {
    const { id } = req.params;

    const item = await Item.findByPk(id);
    if (!item) {
        return res.status(404).json({ error: 'Item no encontrado' });
    }

    await item.destroy();
    res.status(204).send(); // 204 = sin contenido
};

module.exports = { getItems, createItem, updateItem, deleteItem };