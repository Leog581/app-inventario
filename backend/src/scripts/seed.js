require('dotenv').config();
const { sequelize, Perfil, Item } = require('../models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a Neon');

        await Perfil.create({
            nombre_comercial: 'APP de Inventario',
            propietario: 'Nombre propietario',
            telefono: '(011) 3456-7899',
            direccion: 'Maipu 188 - CABA - Argentina',
            email: 'info@miempresa.com.ar',
            web: 'www.appinventario.com.ar'
        });
        console.log('✅ Perfil cargado');

        await Item.bulkCreate([
            { codigo: 'SP7875', descripcion: 'Producto 1', unidad: 'Caja', cantidad: 9, precio: 99.00 },
            { codigo: 'TR87680', descripcion: 'Producto 2', unidad: 'Unidad', cantidad: 10, precio: 10.00 },
            { codigo: 'MK676554', descripcion: 'Producto 3', unidad: 'Unidad', cantidad: 2, precio: 20.00 },
            { codigo: 'YE98767', descripcion: 'Producto 4', unidad: 'Caja', cantidad: 6, precio: 50.00 },
            { codigo: 'XR23423', descripcion: 'Producto 5', unidad: 'Caja', cantidad: 7, precio: 36.00 },
            { codigo: 'PW98762', descripcion: 'Producto 6', unidad: 'Unidad', cantidad: 2, precio: 75.00 }
        ]);
        console.log('✅ 6 productos cargados');

        console.log('🎉 Datos iniciales cargados correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al cargar los datos:', error.message);
        process.exit(1);
    }
}

seed();