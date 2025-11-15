const { User, Computer, sequelize } = require('../models');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...\n');

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ force: false });

    // ============================================
    // 1. CREAR USUARIO ADMINISTRADOR
    // ============================================

    const adminExists = await User.findOne({ where: { email: 'admin@techadvisor.cl' } });

    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@techadvisor.cl',
        password: 'admin123',
        isAdmin: true
      });
      console.log('✅ Usuario administrador creado');
      console.log('   Email: admin@techadvisor.cl');
      console.log('   Password: admin123\n');
    } else {
      console.log('ℹ️  Usuario administrador ya existe\n');
    }

    // ============================================
    // 2. CREAR COMPUTADORES
    // ============================================

    const computerCount = await Computer.count();

    if (computerCount === 0) {
      const computers = [
        {
          name: "Lenovo ThinkPad E14",
          price: 749990,
          type: "laptop",
          cpu: "Intel i5-1235U",
          cpuScore: 6,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 3,
          screen: "14\" Full HD",
          weight: "1.6 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=ThinkPad",
          solotodoUrl: "https://www.solotodo.cl/products/154569-lenovo-thinkpad-e14-gen-4-21e3s06s00",
          uses: ["oficina", "estudio", "programacion"]
        },
        {
          name: "HP Pavilion 15",
          price: 649990,
          type: "laptop",
          cpu: "AMD Ryzen 5 5500U",
          cpuScore: 5,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "512GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 3,
          screen: "15.6\" Full HD",
          weight: "1.8 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Pavilion",
          solotodoUrl: "https://www.solotodo.cl/products/172352-hp-pavilion-15-eg2053cl-6m0z0ua",
          uses: ["oficina", "estudio"]
        },
        {
          name: "ASUS VivoBook 15",
          price: 579990,
          type: "laptop",
          cpu: "Intel i3-1215U",
          cpuScore: 4,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Intel UHD Graphics",
          gpuScore: 2,
          screen: "15.6\" Full HD",
          weight: "1.7 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=VivoBook",
          solotodoUrl: "https://www.solotodo.cl/products/167230-asus-vivobook-15-x1502za-ej503w",
          uses: ["oficina", "estudio"]
        },
        {
          name: "Dell G15 Gaming",
          price: 1199990,
          type: "laptop",
          cpu: "Intel i7-12700H",
          cpuScore: 9,
          ram: "16GB DDR5",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "NVIDIA RTX 3060",
          gpuScore: 8,
          screen: "15.6\" FHD 165Hz",
          weight: "2.5 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Dell+G15",
          solotodoUrl: "https://www.solotodo.cl/products/163530-dell-g15-5520-n5i7u16512w1s",
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "MacBook Air M2",
          price: 1099990,
          type: "laptop",
          cpu: "Apple M2",
          cpuScore: 8,
          ram: "8GB Unificada",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Apple M2 8-core",
          gpuScore: 5,
          screen: "13.6\" Liquid Retina",
          weight: "1.2 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=MacBook+Air",
          solotodoUrl: "https://www.solotodo.cl/products/140209-apple-macbook-air-136-m2-8-core-gpu-8gb-256gb-mlxw3cl",
          uses: ["estudio", "programacion", "diseno"]
        },
        {
          name: "HP Omen 40L",
          price: 1899990,
          type: "desktop",
          cpu: "AMD Ryzen 7 5800X",
          cpuScore: 9,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "1TB SSD NVMe",
          gpu: "NVIDIA RTX 3070 Ti",
          gpuScore: 9,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=HP+Omen",
          solotodoUrl: "https://www.solotodo.cl/products/135968-hp-omen-40l-gt21-0012la-57x70la",
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "iMac 24\" M1",
          price: 1299990,
          type: "desktop",
          cpu: "Apple M1",
          cpuScore: 7,
          ram: "8GB Unificada",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Apple M1 7-core",
          gpuScore: 4,
          screen: "24\" 4.5K Retina",
          weight: "4.5 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=iMac+24",
          solotodoUrl: "https://www.solotodo.cl/products/113063-apple-imac-24-m1-7-core-gpu-8gb-256gb-mgtf3cia",
          uses: ["oficina", "estudio", "diseno"]
        },
        {
          name: "Lenovo IdeaCentre 5",
          price: 499990,
          type: "desktop",
          cpu: "AMD Ryzen 5 5600G",
          cpuScore: 5,
          ram: "12GB DDR4",
          ramGb: 12,
          storage: "512GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 3,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=IdeaCentre",
          solotodoUrl: "https://www.solotodo.cl/products/159491-lenovo-ideacentre-gaming-5-17acn7-90vj0008cl",
          uses: ["oficina", "estudio"]
        },
        {
          name: "Acer Aspire 3",
          price: 399990,
          type: "laptop",
          cpu: "Intel i3-1115G4",
          cpuScore: 3,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Intel UHD Graphics",
          gpuScore: 2,
          screen: "15.6\" Full HD",
          weight: "1.7 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Aspire+3",
          solotodoUrl: "https://www.solotodo.cl/products/169368-acer-aspire-3-a315-58-393s-nxaddsp00d",
          uses: ["oficina"]
        },
        {
          name: "MSI Katana 15",
          price: 1499990,
          type: "laptop",
          cpu: "Intel i7-13620H",
          cpuScore: 9,
          ram: "16GB DDR5",
          ramGb: 16,
          storage: "1TB SSD",
          gpu: "NVIDIA RTX 4060",
          gpuScore: 9,
          screen: "15.6\" FHD 144Hz",
          weight: "2.2 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=MSI+Katana",
          solotodoUrl: "https://www.solotodo.cl/products/169121-msi-katana-15-b13vfk-830us",
          uses: ["gaming", "diseno"]
        },
        {
          name: "Samsung Galaxy Book3",
          price: 899990,
          type: "laptop",
          cpu: "Intel i7-1355U",
          cpuScore: 7,
          ram: "16GB LPDDR4x",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 4,
          screen: "15.6\" Full HD",
          weight: "1.6 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Galaxy+Book3",
          solotodoUrl: "https://www.solotodo.cl/products/170648-samsung-galaxy-book3-np750xfg-ka3cl",
          uses: ["estudio", "programacion", "oficina"]
        },
        {
          name: "PC de Oficina (Básico)",
          price: 349990,
          type: "desktop",
          cpu: "Intel Celeron G5905",
          cpuScore: 2,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "240GB SSD",
          gpu: "Intel UHD 610",
          gpuScore: 1,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=PC+Oficina",
          solotodoUrl: "https://www.solotodo.cl/products/127438-gear-office-celeron-g5905-8-gb-ram-240-gb-ssd",
          uses: ["oficina"]
        }
      ];

      await Computer.bulkCreate(computers);
      console.log(`✅ ${computers.length} computadores creados\n`);
    } else {
      console.log(`ℹ️  Ya existen ${computerCount} computadores en la base de datos\n`);
    }

    console.log('✅ Seed completado exitosamente!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
};

seedDatabase();
