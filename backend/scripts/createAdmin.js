const { User, sequelize } = require('../models');

async function createAdminUser() {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexión a la base de datos establecida');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({
      where: { email: 'admin@techadvisor.cl' }
    });

    if (existingAdmin) {
      console.log('⚠ El usuario administrador ya existe');
      console.log('Email:', existingAdmin.email);
      console.log('Nombre:', existingAdmin.name);
      process.exit(0);
    }

    // Crear usuario administrador
    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@techadvisor.cl',
      password: 'admin123',
      isAdmin: true
    });

    console.log('✓ Usuario administrador creado exitosamente');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('isAdmin:', admin.isAdmin);

    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
    process.exit(1);
  }
}

createAdminUser();
