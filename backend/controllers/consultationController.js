const { Consultation, Computer, User, sequelize } = require('../models');
const { Op } = require('sequelize');
const geminiService = require('../services/geminiService');

/**
 * @desc    Crear nueva consulta y obtener recomendaciones
 * @route   POST /api/consultations
 * @access  Private
 */
const createConsultation = async (req, res, next) => {
  try {
    const { use, performance, budget, portability, programs } = req.body;

    // Validaciones
    if (!use || !performance || !budget || !portability) {
      return res.status(400).json({
        success: false,
        message: 'Por favor completa todos los campos requeridos'
      });
    }

    // 1. Llamar a Gemini AI para obtener especificaciones técnicas
    const techSpecs = await geminiService.generateTechSpecs({
      use,
      performance,
      budget,
      portability,
      programs
    });

    // 2. Buscar computadores que cumplan los requisitos
    const computers = await Computer.findAll({
      where: {
        price: { [Op.lte]: budget },
        type: portability,
        cpuScore: { [Op.gte]: techSpecs.min_cpu_score },
        gpuScore: { [Op.gte]: techSpecs.min_gpu_score },
        ramGb: { [Op.gte]: techSpecs.min_ram_gb }
      },
      order: [
        // Ordenar por mejor puntuación combinada primero
        [sequelize.literal('(cpu_score + gpu_score)'), 'DESC'],
        ['price', 'ASC'] // Luego por precio más bajo
      ]
    });

    // 3. Guardar la consulta en la base de datos
    const consultation = await Consultation.create({
      userId: req.user.id,
      use,
      performance,
      budget,
      portability,
      programs,
      minCpuScore: techSpecs.min_cpu_score,
      minGpuScore: techSpecs.min_gpu_score,
      minRamGb: techSpecs.min_ram_gb,
      aiReasoning: techSpecs.reasoning,
      resultsCount: computers.length
    });

    // 4. Actualizar contador de consultas del usuario
    await User.increment('consultationsCount', {
      where: { id: req.user.id }
    });

    // Helper function to generate search URLs
    const generateSearchUrls = (computerName) => {
      const searchQuery = encodeURIComponent(computerName);
      return {
        solotodo: `https://www.solotodo.cl/search?search=${searchQuery}`,
        falabella: `https://www.falabella.com/falabella-cl/search?Ntt=${searchQuery}`,
        ripley: `https://simple.ripley.cl/search/${searchQuery}`
      };
    };

    res.status(201).json({
      success: true,
      message: 'Consulta procesada exitosamente',
      data: {
        consultation: {
          id: consultation.id,
          createdAt: consultation.createdAt
        },
        techSpecs,
        computers: computers.map(comp => ({
          id: comp.id,
          name: comp.name,
          price: comp.price,
          type: comp.type,
          cpu: comp.cpu,
          cpuScore: comp.cpuScore,
          ram: comp.ram,
          ramGb: comp.ramGb,
          storage: comp.storage,
          gpu: comp.gpu,
          gpuScore: comp.gpuScore,
          screen: comp.screen,
          weight: comp.weight,
          imageUrl: comp.imageUrl,
          searchUrls: generateSearchUrls(comp.name)
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener todas las consultas del usuario actual
 * @route   GET /api/consultations
 * @access  Private
 */
const getMyConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 10 // Últimas 10 consultas
    });

    res.json({
      success: true,
      count: consultations.length,
      data: { consultations }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener una consulta específica por ID
 * @route   GET /api/consultations/:id
 * @access  Private
 */
const getConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id // Solo puede ver sus propias consultas
      }
    });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consulta no encontrada'
      });
    }

    res.json({
      success: true,
      data: { consultation }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConsultation,
  getMyConsultations,
  getConsultation
};
