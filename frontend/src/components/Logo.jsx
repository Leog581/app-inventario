function Logo() {
    return (
        <div className="flex items-center gap-3">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                {/* Caja principal */}
                <rect x="4" y="16" width="24" height="24" rx="3" fill="#10b981" />
                <rect x="4" y="16" width="24" height="8" rx="3" fill="#34d399" />
                <line x1="16" y1="24" x2="16" y2="40" stroke="#047857" strokeWidth="1.5" />
                {/* Caja secundaria apilada */}
                <rect x="20" y="6" width="22" height="22" rx="3" fill="#059669" />
                <rect x="20" y="6" width="22" height="7" rx="3" fill="#34d399" opacity="0.8" />
                <line x1="31" y1="13" x2="31" y2="28" stroke="#047857" strokeWidth="1.5" />
            </svg>
            <div>
                <h1 className="text-xl font-bold text-gray-800 leading-tight">
                    APP de Inventario
                </h1>
                <p className="text-xs text-gray-500">Gestión de productos</p>
            </div>
        </div>
    );
}

export default Logo;