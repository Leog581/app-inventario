import Logo from './Logo';

function Header({ perfil }) {
    if (!perfil) return null;

    return (
        <header className="mb-6 border-b border-gray-300 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Columna 1: logo */}
                <div>
                    <Logo />
                </div>

                {/* Columna 2: contacto */}
                <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">E-mail:</span> {perfil.email}</p>
                    <p><span className="font-semibold">Teléfono:</span> {perfil.telefono}</p>
                    <p><span className="font-semibold">Sitio web:</span> {perfil.web}</p>
                </div>

                {/* Columna 3: propietario y dirección */}
                <div className="text-sm text-gray-700 space-y-1 md:text-right">
                    <p className="font-semibold">{perfil.propietario}</p>
                    <p>{perfil.direccion}</p>
                </div>
            </div>
        </header>
    );
}

export default Header;