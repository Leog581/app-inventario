function Totales({ valorTotal, stockTotal }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Card: valor total */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-md">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-2 top-8 w-16 h-16 bg-white/5 rounded-full" />
                <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                        💰
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-50">
                            Valor total del inventario
                        </p>
                        <p className="text-3xl font-bold mt-0.5">
                            ${valorTotal.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Card: artículos */}
            <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                        📦
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Artículos en inventario
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-0.5">
                            {stockTotal}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Totales;