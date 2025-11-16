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
        // ===== LAPTOPS BÁSICAS - OFICINA (300k-500k) =====
        {
          name: "HP 14s Basic",
          price: 349990,
          type: "laptop",
          cpu: "Intel Celeron N4500",
          cpuScore: 2,
          ram: "4GB DDR4",
          ramGb: 4,
          storage: "128GB SSD",
          gpu: "Intel UHD Graphics",
          gpuScore: 1,
          screen: "14\" HD",
          weight: "1.4 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=HP+14s",
          uses: ["oficina"]
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
          uses: ["oficina"]
        },
        {
          name: "Lenovo IdeaPad 3",
          price: 429990,
          type: "laptop",
          cpu: "AMD Ryzen 3 5300U",
          cpuScore: 4,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 2,
          screen: "15.6\" Full HD",
          weight: "1.7 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=IdeaPad+3",
          uses: ["oficina", "estudio"]
        },
        {
          name: "ASUS E410",
          price: 379990,
          type: "laptop",
          cpu: "Intel Pentium N5030",
          cpuScore: 2,
          ram: "4GB DDR4",
          ramGb: 4,
          storage: "128GB eMMC",
          gpu: "Intel UHD Graphics",
          gpuScore: 1,
          screen: "14\" HD",
          weight: "1.3 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=ASUS+E410",
          uses: ["oficina"]
        },

        // ===== LAPTOPS MEDIAS - ESTUDIO/PROGRAMACION (500k-900k) =====
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
          uses: ["oficina", "estudio"]
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
          uses: ["oficina", "estudio"]
        },
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
          uses: ["oficina", "estudio", "programacion"]
        },
        {
          name: "Dell Inspiron 15",
          price: 699990,
          type: "laptop",
          cpu: "Intel i5-1155G7",
          cpuScore: 6,
          ram: "12GB DDR4",
          ramGb: 12,
          storage: "512GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 3,
          screen: "15.6\" Full HD",
          weight: "1.8 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Inspiron",
          uses: ["estudio", "programacion"]
        },
        {
          name: "ASUS Zenbook 14",
          price: 849990,
          type: "laptop",
          cpu: "Intel i5-1240P",
          cpuScore: 7,
          ram: "16GB LPDDR5",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 4,
          screen: "14\" Full HD",
          weight: "1.4 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Zenbook",
          uses: ["estudio", "programacion", "oficina"]
        },

        // ===== LAPTOPS PROGRAMACION/DISEÑO MEDIO (900k-1.3M) =====
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
          uses: ["estudio", "programacion", "oficina"]
        },
        {
          name: "Lenovo IdeaPad 5 Pro",
          price: 979990,
          type: "laptop",
          cpu: "AMD Ryzen 7 5800H",
          cpuScore: 8,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 4,
          screen: "16\" 2.5K",
          weight: "2.0 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=IdeaPad+5",
          uses: ["programacion", "diseno", "estudio"]
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
          uses: ["estudio", "programacion", "diseno"]
        },
        {
          name: "HP Envy 15",
          price: 1149990,
          type: "laptop",
          cpu: "Intel i7-1260P",
          cpuScore: 8,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "NVIDIA MX550",
          gpuScore: 5,
          screen: "15.6\" Full HD",
          weight: "1.9 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Envy+15",
          uses: ["programacion", "diseno"]
        },
        {
          name: "Dell XPS 13",
          price: 1249990,
          type: "laptop",
          cpu: "Intel i7-1250U",
          cpuScore: 7,
          ram: "16GB LPDDR5",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 4,
          screen: "13.4\" FHD+",
          weight: "1.2 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=XPS+13",
          uses: ["programacion", "estudio", "oficina"]
        },

        // ===== LAPTOPS GAMING/DISEÑO ALTO (1.2M-2M+) =====
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
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "ASUS TUF Gaming A15",
          price: 1099990,
          type: "laptop",
          cpu: "AMD Ryzen 7 6800H",
          cpuScore: 8,
          ram: "16GB DDR5",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "NVIDIA RTX 3050",
          gpuScore: 7,
          screen: "15.6\" FHD 144Hz",
          weight: "2.3 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=TUF+A15",
          uses: ["gaming", "diseno"]
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
          uses: ["gaming", "diseno"]
        },
        {
          name: "Lenovo Legion 5 Pro",
          price: 1699990,
          type: "laptop",
          cpu: "AMD Ryzen 7 7745HX",
          cpuScore: 9,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "1TB SSD",
          gpu: "NVIDIA RTX 4070",
          gpuScore: 9,
          screen: "16\" WQHD 165Hz",
          weight: "2.5 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Legion+5",
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "ASUS ROG Strix G16",
          price: 1899990,
          type: "laptop",
          cpu: "Intel i9-13980HX",
          cpuScore: 10,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "1TB SSD",
          gpu: "NVIDIA RTX 4070",
          gpuScore: 9,
          screen: "16\" WQHD 240Hz",
          weight: "2.6 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=ROG+Strix",
          uses: ["gaming", "diseno"]
        },
        {
          name: "MacBook Pro 14 M3",
          price: 1899990,
          type: "laptop",
          cpu: "Apple M3 Pro",
          cpuScore: 9,
          ram: "18GB Unificada",
          ramGb: 18,
          storage: "512GB SSD",
          gpu: "Apple M3 Pro 14-core",
          gpuScore: 8,
          screen: "14\" Liquid Retina XDR",
          weight: "1.6 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=MacBook+Pro",
          uses: ["diseno", "programacion"]
        },
        {
          name: "Razer Blade 15",
          price: 2299990,
          type: "laptop",
          cpu: "Intel i9-13900H",
          cpuScore: 10,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "1TB SSD",
          gpu: "NVIDIA RTX 4080",
          gpuScore: 10,
          screen: "15.6\" QHD 240Hz",
          weight: "2.1 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Razer+Blade",
          uses: ["gaming", "diseno"]
        },
        {
          name: "MSI Creator Z16P",
          price: 2499990,
          type: "laptop",
          cpu: "Intel i9-13900H",
          cpuScore: 10,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "2TB SSD",
          gpu: "NVIDIA RTX 4070",
          gpuScore: 9,
          screen: "16\" Mini LED QHD+",
          weight: "2.4 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Creator+Z16",
          uses: ["diseno", "programacion"]
        },

        // ===== DESKTOPS BÁSICOS - OFICINA (300k-600k) =====
        {
          name: "PC Oficina Básico",
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
          uses: ["oficina"]
        },
        {
          name: "HP Desktop M01",
          price: 399990,
          type: "desktop",
          cpu: "AMD Ryzen 3 3250U",
          cpuScore: 3,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 2,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=HP+M01",
          uses: ["oficina"]
        },
        {
          name: "Lenovo IdeaCentre 3",
          price: 449990,
          type: "desktop",
          cpu: "Intel i3-12100",
          cpuScore: 5,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "512GB SSD",
          gpu: "Intel UHD 730",
          gpuScore: 2,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=IdeaCentre",
          uses: ["oficina", "estudio"]
        },
        {
          name: "Dell Inspiron Desktop",
          price: 549990,
          type: "desktop",
          cpu: "Intel i5-12400",
          cpuScore: 6,
          ram: "12GB DDR4",
          ramGb: 12,
          storage: "512GB SSD",
          gpu: "Intel UHD 730",
          gpuScore: 2,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Dell+Desktop",
          uses: ["oficina", "estudio", "programacion"]
        },

        // ===== DESKTOPS MEDIOS - PROGRAMACION (600k-1M) =====
        {
          name: "Lenovo IdeaCentre 5",
          price: 649990,
          type: "desktop",
          cpu: "AMD Ryzen 5 5600G",
          cpuScore: 6,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 3,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=IdeaCentre+5",
          uses: ["oficina", "estudio", "programacion"]
        },
        {
          name: "HP Pavilion Desktop",
          price: 749990,
          type: "desktop",
          cpu: "Intel i5-12600",
          cpuScore: 7,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "1TB SSD",
          gpu: "Intel UHD 770",
          gpuScore: 3,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Pavilion+PC",
          uses: ["programacion", "estudio"]
        },
        {
          name: "ASUS VivoDesk M3400",
          price: 899990,
          type: "desktop",
          cpu: "AMD Ryzen 7 5700G",
          cpuScore: 7,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "1TB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 4,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=VivoDesk",
          uses: ["programacion", "diseno"]
        },

        // ===== DESKTOPS APPLE =====
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
          uses: ["oficina", "estudio", "diseno"]
        },
        {
          name: "Mac Mini M2",
          price: 699990,
          type: "desktop",
          cpu: "Apple M2",
          cpuScore: 8,
          ram: "8GB Unificada",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Apple M2 10-core",
          gpuScore: 5,
          screen: null,
          weight: "1.2 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Mac+Mini",
          uses: ["programacion", "diseno", "estudio"]
        },
        {
          name: "Mac Studio M2 Max",
          price: 2499990,
          type: "desktop",
          cpu: "Apple M2 Max",
          cpuScore: 10,
          ram: "32GB Unificada",
          ramGb: 32,
          storage: "512GB SSD",
          gpu: "Apple M2 Max 30-core",
          gpuScore: 9,
          screen: null,
          weight: "2.7 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Mac+Studio",
          uses: ["diseno", "programacion"]
        },

        // ===== DESKTOPS GAMING/DISEÑO (1.2M-2.5M+) =====
        {
          name: "PC Gaming RTX 3060",
          price: 1199990,
          type: "desktop",
          cpu: "AMD Ryzen 5 5600X",
          cpuScore: 7,
          ram: "16GB DDR4",
          ramGb: 16,
          storage: "1TB SSD NVMe",
          gpu: "NVIDIA RTX 3060",
          gpuScore: 8,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=PC+RTX3060",
          uses: ["gaming", "diseno"]
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
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "PC Gaming RTX 4070",
          price: 1699990,
          type: "desktop",
          cpu: "Intel i7-13700K",
          cpuScore: 9,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "2TB SSD NVMe",
          gpu: "NVIDIA RTX 4070",
          gpuScore: 9,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=PC+RTX4070",
          uses: ["gaming", "diseno", "programacion"]
        },
        {
          name: "ASUS ROG Strix GT35",
          price: 2199990,
          type: "desktop",
          cpu: "Intel i9-13900K",
          cpuScore: 10,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "2TB SSD NVMe",
          gpu: "NVIDIA RTX 4080",
          gpuScore: 10,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=ROG+GT35",
          uses: ["gaming", "diseno"]
        },
        {
          name: "PC Workstation RTX 4090",
          price: 2899990,
          type: "desktop",
          cpu: "AMD Ryzen 9 7950X",
          cpuScore: 10,
          ram: "64GB DDR5",
          ramGb: 64,
          storage: "4TB SSD NVMe",
          gpu: "NVIDIA RTX 4090",
          gpuScore: 10,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=RTX+4090+WS",
          uses: ["diseno", "gaming", "programacion"]
        },
        {
          name: "Alienware Aurora R15",
          price: 2599990,
          type: "desktop",
          cpu: "Intel i9-13900KF",
          cpuScore: 10,
          ram: "32GB DDR5",
          ramGb: 32,
          storage: "2TB SSD NVMe",
          gpu: "NVIDIA RTX 4080",
          gpuScore: 10,
          screen: null,
          weight: null,
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Alienware",
          uses: ["gaming", "diseno"]
        },

        // ===== LAPTOPS ADICIONALES PARA VARIEDAD =====
        {
          name: "HP 15s Slim",
          price: 469990,
          type: "laptop",
          cpu: "Intel i3-1215U",
          cpuScore: 4,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "256GB SSD",
          gpu: "Intel UHD Graphics",
          gpuScore: 2,
          screen: "15.6\" Full HD",
          weight: "1.6 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=HP+15s",
          uses: ["oficina", "estudio"]
        },
        {
          name: "Lenovo V15 G3",
          price: 529990,
          type: "laptop",
          cpu: "AMD Ryzen 5 5625U",
          cpuScore: 5,
          ram: "8GB DDR4",
          ramGb: 8,
          storage: "512GB SSD",
          gpu: "AMD Radeon Graphics",
          gpuScore: 3,
          screen: "15.6\" Full HD",
          weight: "1.7 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=V15+G3",
          uses: ["estudio", "programacion"]
        },
        {
          name: "Acer Swift 3",
          price: 799990,
          type: "laptop",
          cpu: "Intel i5-1240P",
          cpuScore: 7,
          ram: "16GB LPDDR4x",
          ramGb: 16,
          storage: "512GB SSD",
          gpu: "Intel Iris Xe",
          gpuScore: 4,
          screen: "14\" Full HD",
          weight: "1.2 kg",
          imageUrl: "https://placehold.co/400x300/e0e0e0/555?text=Swift+3",
          uses: ["estudio", "programacion", "oficina"]
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
