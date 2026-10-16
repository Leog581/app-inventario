import { useState, useEffect, useRef } from 'react';
import FilaItem from './FilaItem';
import { updateItem, deleteItem } from '../api/client';

function TablaItems({ items, onRecargar, onAbrirModal }) {
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [dropdownAbierto, setDropdownAbierto] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Cerrar dropdown al hacer clic afuera
    useEffect(() => {
        function handleClickFuera(e) {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)
            ) {
                setDropdownAbierto(false);
            }
        }
        document.addEventListener('mousedown', handleClickFuera);
        return () => document.removeEventListener('mousedown', handleClickFuera);
    }, []);

    // Si el item seleccionado se edita o elimina, sincronizamos el panel
    useEffect(() => {
        if (itemSeleccionado) {
            const actualizado = items.find((i) => i.id === itemSeleccionado.id);
            setItemSeleccionado(actualizado || null);
        }
    }, [items]);

    // Sugerencias para el dropdown (máx 8)
    const sugerencias = busqueda.trim()
        ? items
            .filter((item) => {
                const q = busqueda.toLowerCase();
                return (
                    item.codigo.toLowerCase().includes(q) ||
                    item.descripcion.toLowerCase().includes(q)
                );
            })
            .slice(0, 8)
        : [];

    // Items a mostrar en la tabla
    const itemsFiltrados = itemSeleccionado
        ? items.filter((i) => i.id === itemSeleccionado.id)
        : busqueda.trim()
            ? items.filter((item) => {
                const q = busqueda.toLowerCase();
                return (
                    item.codigo.toLowerCase().includes(q) ||
                    item.descripcion.toLowerCase().includes(q)
                );
            })
            : items;

    function seleccionarSugerencia(item) {
        setItemSeleccionado(item);
        setBusqueda('');
        setDropdownAbierto(false);
    }

    function limpiarSeleccion() {
        setItemSeleccionado(null);
        setBusqueda('');
    }

    async function handleEditar(id, campo, valor) {
        try {
            await updateItem(id, campo, valor);
            await onRecargar();
        } catch (error) {
            alert('Error al editar: ' + error.message);
        }
    }

    async function handleEliminar(id) {
        if (!confirm('¿Está seguro de eliminar este ítem?')) return;
        try {
            await deleteItem(id);
            // Si eliminamos el que estaba seleccionado, limpiamos el panel
            if (itemSeleccionado && itemSeleccionado.id === id) {
                setItemSeleccionado(null);
            }
            await onRecargar();
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    }

    return (
        <div>
            {/* Barra superior */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                {/* Buscador con autocomplete */}
                <div className="relative w-full md:w-96">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                        🔍
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setDropdownAbierto(true);
                            if (itemSeleccionado) setItemSeleccionado(null);
                        }}
                        onFocus={() => busqueda && setDropdownAbierto(true)}
                        placeholder="Buscar por código o descripción..."
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-9 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    {busqueda && (
                        <button
                            onClick={limpiarSeleccion}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                            title="Limpiar"
                        >
                            ✕
                        </button>
                    )}

                    {/* Dropdown de sugerencias */}
                    {dropdownAbierto && sugerencias.length > 0 && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-[fadeIn_120ms_ease-out]"
                        >
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {sugerencias.length} {sugerencias.length === 1 ? 'coincidencia' : 'coincidencias'}
                            </div>
                            <ul className="max-h-80 overflow-y-auto">
                                {sugerencias.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            onClick={() => seleccionarSugerencia(item)}
                                            className="w-full text-left px-3 py-2.5 hover:bg-emerald-50 transition-colors flex items-center justify-between gap-3 border-b border-gray-100 last:border-0"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {item.descripcion}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono mt-0.5">
                                                    {item.codigo} · {item.unidad}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-semibold text-emerald-700">
                                                    {item.cantidad}
                                                </p>
                                                <p className="text-xs text-gray-400">en stock</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Botón agregar */}
                <button
                    onClick={onAbrirModal}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:shadow transition-all"
                >
                    <span className="text-lg leading-none">+</span>
                    Agregar Ítem
                </button>
            </div>

            {/* Panel de detalle del item seleccionado */}
            {itemSeleccionado && (
                <div className="mb-4 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-5 animate-[fadeIn_200ms_ease-out]">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                                📌
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                    Producto seleccionado
                                </p>
                                <h3 className="text-lg font-bold text-gray-800">
                                    {itemSeleccionado.descripcion}
                                </h3>
                            </div>
                        </div>
                        <button
                            onClick={limpiarSeleccion}
                            className="text-gray-400 hover:text-gray-700 text-lg"
                            title="Quitar selección"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Código</p>
                            <p className="text-sm font-mono font-semibold text-gray-800">
                                {itemSeleccionado.codigo}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Unidad</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {itemSeleccionado.unidad}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Cantidad</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {itemSeleccionado.cantidad}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Costo unitario</p>
                            <p className="text-sm font-semibold text-gray-800">
                                ${Number(itemSeleccionado.precio).toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Costo total</p>
                            <p className="text-sm font-bold text-emerald-700">
                                ${Number(itemSeleccionado.total).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Contador */}
            <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {itemSeleccionado ? 'Producto seleccionado' : 'Listado de productos'}
                </p>
                <p className="text-xs text-gray-500">
                    {itemsFiltrados.length} de {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
                </p>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                                <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider">Código</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Descripción</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider">Unidad</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider">Cantidad</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider">Costo</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider">Costo Total</th>
                                <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {itemsFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <span className="text-4xl">🔍</span>
                                            <p className="text-sm font-medium text-gray-500">
                                                No se encontraron resultados
                                            </p>
                                            <button
                                                onClick={limpiarSeleccion}
                                                className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                                            >
                                                Limpiar búsqueda
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                itemsFiltrados.map((item) => (
                                    <FilaItem
                                        key={item.id}
                                        item={item}
                                        onEditar={handleEditar}
                                        onEliminar={handleEliminar}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

export default TablaItems;