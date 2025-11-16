const { Computer, sequelize } = require('../models');
require('dotenv').config();

const clearComputers = async () => {
  try {
    console.log('🗑️  Borrando computadores existentes...\n');
    
    await Computer.destroy({ where: {}, truncate: true });
    
    console.log('✅ Computadores borrados exitosamente!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

clearComputers();
