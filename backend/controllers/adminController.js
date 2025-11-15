const { User, Consultation, Computer } = require('../models');
const { Op } = require('sequelize');

/**
 * @desc    Obtener estadísticas del panel de administración
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getStats = async (req, res, next) => {
  try {
    // Total de consultas
    const totalConsultations = await Consultation.count();

    // Total de usuarios (excluyendo admins)
    const totalUsers = await User.count({
      where: { isAdmin: false }
    });

    // Consultas de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayConsultations = await Consultation.count({
      where: {
        createdAt: { [Op.gte]: today }
      }
    });

    // Tasa de conversión (usuarios que han hecho al menos una consulta)
    const usersWithConsultations = await User.count({
      where: {
        isAdmin: false,
        consultationsCount: { [Op.gt]: 0 }
      }
    });

    const conversionRate = totalUsers > 0
      ? ((usersWithConsultations / totalUsers) * 100).toFixed(1)
      : 0;

    // Uso más popular
    const popularUses = await Consultation.findAll({
      attributes: [
        'use',
        [Consultation.sequelize.fn('COUNT', 'use'), 'count']
      ],
      group: ['use'],
      order: [[Consultation.sequelize.fn('COUNT', 'use'), 'DESC']],
      limit: 3,
      raw: true
    });

    res.json({
      success: true,
      data: {
        totalConsultations,
        totalUsers,
        todayConsultations,
        conversionRate: parseFloat(conversionRate),
        popularUses
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener todos los usuarios
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { isAdmin: false },
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: users.length,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Eliminar un usuario
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // No permitir eliminar administradores
    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'No se pueden eliminar usuarios administradores'
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener todas las consultas (admin)
 * @route   GET /api/admin/consultations
 * @access  Private/Admin
 */
const getAllConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']],
      limit: 50 // Últimas 50 consultas
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
 * @desc    Obtener todos los computadores
 * @route   GET /api/admin/computers
 * @access  Private/Admin
 */
const getAllComputers = async (req, res, next) => {
  try {
    const computers = await Computer.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      count: computers.length,
      data: { computers }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  getAllConsultations,
  getAllComputers
};
