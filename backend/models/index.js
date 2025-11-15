const { sequelize, testConnection } = require('../config/database');
const User = require('./User');
const Computer = require('./Computer');
const Consultation = require('./Consultation');

// Definir relaciones entre modelos

// Un usuario puede tener muchas consultas
User.hasMany(Consultation, {
  foreignKey: 'userId',
  as: 'consultations'
});

// Una consulta pertenece a un usuario
Consultation.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Sincronizar modelos con la base de datos
const syncModels = async () => {
  try {
    // alter: true actualiza las tablas sin borrar datos (en desarrollo)
    // force: true borra y recrea las tablas (cuidado con datos existentes)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Computer,
  Consultation,
  syncModels,
  testConnection
};
