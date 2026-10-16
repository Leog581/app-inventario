import { useState, useEffect } from 'react';
import { getItems, getPerfil } from '../api/client';
import Header from '../components/Header';
import Totales from '../components/Totales';
import TablaItems from '../components/TablaItems';
import ModalNuevoItem from '../components/ModalNuevoItem';

function Home() {
    const [perfil, setPerfil] = useState(null);
    const [items, setItems] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [stockTotal, setStockTotal] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    async function cargarItems() {
        try {
            setError(null);
            const data = await getItems();
            setItems(data.items);
            setValorTotal(data.valorTotal);
            setStockTotal(data.stockTotal);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const p = await getPerfil();
                setPerfil(p);
            } catch (err) {
                setError(err.message);
            }
            await cargarItems();
        })();
    }, []);

    if (cargando) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Cargando inventario...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30 flex items-center justify-center p-6">
                <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        No se pudo cargar el inventario
                    </h3>
                    <p className="text-sm text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-5 rounded-lg text-sm"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <Header perfil={perfil} />
                    <Totales valorTotal={valorTotal} stockTotal={stockTotal} />
                    <TablaItems
                        items={items}
                        onRecargar={cargarItems}
                        onAbrirModal={() => setModalAbierto(true)}
                    />
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    App de Inventario · {new Date().getFullYear()}
                </p>
            </div>

            <ModalNuevoItem
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                onGuardado={async () => {
                    setModalAbierto(false);
                    await cargarItems();
                }}
            />
        </div>
    );
}

export default Home;