// URL base de la API. En desarrollo, Vite la redirige al backend por el proxy.
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Helper genérico: hace fetch y lanza error si la respuesta no es OK
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(error.error || `Error HTTP ${res.status}`);
    }

    // Si es 204 (No Content), no hay body que parsear
    if (res.status === 204) return null;

    return res.json();
}

// ============================================================
// ITEMS
// ============================================================

// Lista todos los items + totales calculados
export async function getItems() {
    return fetchJSON(`${API_URL}/items`);
}

// Crea un item nuevo
export async function createItem(item) {
    return fetchJSON(`${API_URL}/items`, {
        method: 'POST',
        body: JSON.stringify(item)
    });
}

// Actualiza cantidad o precio de un item
// campo: 1 = cantidad, 2 = precio
export async function updateItem(id, campo, valor) {
    return fetchJSON(`${API_URL}/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ campo, valor })
    });
}

// Elimina un item
export async function deleteItem(id) {
    return fetchJSON(`${API_URL}/items/${id}`, {
        method: 'DELETE'
    });
}

// ============================================================
// PERFIL
// ============================================================

// Devuelve los datos del negocio
export async function getPerfil() {
    return fetchJSON(`${API_URL}/perfil`);
}