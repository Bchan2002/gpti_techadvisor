const { sequelize } = require('../models');
const { User, Computer } = require('../models');
require('dotenv').config();

const initProduction = async () => {
  try {
    console.log('🚀 Inicializando base de datos de producción...\n');

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ force: false });
    console.log('✅ Tablas sincronizadas\n');

    // Verificar si ya existe un admin
    const adminExists = await User.findOne({ where: { email: 'admin@techadvisor.cl' } });

    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@techadvisor.cl',
        password: 'admin123',
        isAdmin: true
      });
      console.log('✅ Usuario administrador creado\n');
    } else {
      console.log('ℹ️  Usuario administrador ya existe\n');
    }

    // Verificar si hay computadores
    const computerCount = await Computer.count();
    
    if (computerCount === 0) {
      console.log('⚠️  No hay computadores en la base de datos');
      console.log('💡 Ejecuta: npm run seed para agregar computadores de ejemplo\n');
    } else {
      console.log(`✅ ${computerCount} computadores en la base de datos\n`);
    }

    console.log('✅ Inicialización completada!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en inicialización:', error);
    process.exit(1);
  }
};

initProduction();
