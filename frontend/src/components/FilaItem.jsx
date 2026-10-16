import { useState, useEffect } from 'react';

function FilaItem({ item, onEditar, onEliminar }) {
    const [editando, setEditando] = useState(false);
    const [cantidad, setCantidad] = useState(item.cantidad);
    const [precio, setPrecio] = useState(item.precio);

    // Si el item cambia desde afuera, sincronizamos
    useEffect(() => {
        setCantidad(item.cantidad);
        setPrecio(item.precio);
    }, [item.cantidad, item.precio]);

    // Guarda los cambios y sale del modo edición
    function handleGuardar() {
        const nuevaCantidad = parseInt(cantidad, 10);
        const nuevoPrecio = parseFloat(precio);

        // Si hay algo inválido, revertimos y salimos
        if (isNaN(nuevaCantidad) || isNaN(nuevoPrecio)) {
            setCantidad(item.cantidad);
            setPrecio(item.precio);
            setEditando(false);
            return;
        }

        // Solo enviamos lo que cambió
        if (nuevaCantidad !== item.cantidad) onEditar(item.id, 1, nuevaCantidad);
        if (nuevoPrecio !== item.precio) onEditar(item.id, 2, nuevoPrecio);

        setEditando(false);
    }

    // Cancela la edición sin guardar
    function handleCancelar() {
        setCantidad(item.cantidad);
        setPrecio(item.precio);
        setEditando(false);
    }

    // Enter guarda, Escape cancela
    function handleKeyDown(e) {
        if (e.key === 'Enter') handleGuardar();
        if (e.key === 'Escape') handleCancelar();
    }

    // Total en vivo (se recalcula mientras editás)
    const total = Number(cantidad) * Number(precio);

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="py-3 px-3 text-center text-sm font-mono text-gray-700">
                {item.codigo}
            </td>
            <td className="py-3 px-3 text-left text-sm">{item.descripcion}</td>
            <td className="py-3 px-3 text-center text-sm text-gray-600">{item.unidad}</td>

            {/* Cantidad */}
            <td className="py-3 px-3 text-center">
                {editando ? (
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-20 border-2 border-emerald-400 rounded px-2 py-1 text-sm text-center focus:outline-none focus:border-emerald-600 bg-emerald-50"
                    />
                ) : (
                    <span className="text-sm">{item.cantidad}</span>
                )}
            </td>

            {/* Precio */}
            <td className="py-3 px-3 text-right">
                {editando ? (
                    <input
                        type="number"
                        step="0.01"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-24 border-2 border-emerald-400 rounded px-2 py-1 text-sm text-right focus:outline-none focus:border-emerald-600 bg-emerald-50"
                    />
                ) : (
                    <span className="text-sm">${Number(item.precio).toFixed(2)}</span>
                )}
            </td>

            {/* Total */}
            <td className="py-3 px-3 text-right text-sm font-semibold text-gray-800">
                ${total.toFixed(2)}
            </td>

            {/* Acciones */}
            <td className="py-3 px-3 text-right whitespace-nowrap">
                {editando ? (
                    <>
                        <button
                            onClick={handleGuardar}
                            className="text-emerald-600 hover:text-emerald-800 text-lg mr-2 font-bold"
                            title="Guardar (Enter)"
                        >
                            ✓
                        </button>
                        <button
                            onClick={handleCancelar}
                            className="text-gray-500 hover:text-gray-700 text-lg"
                            title="Cancelar (Esc)"
                        >
                            ✗
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setEditando(true)}
                            className="text-blue-600 hover:text-blue-800 text-base mr-3"
                            title="Editar"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => onEliminar(item.id)}
                            className="text-red-600 hover:text-red-800 text-base"
                            title="Eliminar"
                        >
                            🗑️
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default FilaItem;