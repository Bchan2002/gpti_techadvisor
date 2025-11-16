const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Computer = sequelize.define('Computer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  type: {
    type: DataTypes.ENUM('laptop', 'desktop'),
    allowNull: false
  },
  cpu: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpuScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cpu_score',
    validate: {
      min: 1,
      max: 10
    }
  },
  ram: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ramGb: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ram_gb',
    validate: {
      min: 1
    }
  },
  storage: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  gpu: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  gpuScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'gpu_score',
    validate: {
      min: 1,
      max: 10
    }
  },
  screen: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  weight: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'image_url'
  },
  solotodoUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'solotodo_url'
  },
  uses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  }
}, {
  tableName: 'computers',
  timestamps: true
});

module.exports = Computer;
