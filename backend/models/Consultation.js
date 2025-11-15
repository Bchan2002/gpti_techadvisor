const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Necesidades del usuario
  use: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  performance: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  portability: {
    type: DataTypes.ENUM('laptop', 'desktop'),
    allowNull: false
  },
  programs: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Especificaciones técnicas recomendadas por la IA
  minCpuScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'min_cpu_score'
  },
  minGpuScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'min_gpu_score'
  },
  minRamGb: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'min_ram_gb'
  },
  aiReasoning: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'ai_reasoning'
  },
  // Resultados
  resultsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'results_count'
  }
}, {
  tableName: 'consultations',
  timestamps: true
});

module.exports = Consultation;
