const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllConsultations,
  getAllComputers
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// Todas las rutas requieren autenticación y permisos de admin
router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/consultations', getAllConsultations);
router.get('/computers', getAllComputers);

module.exports = router;
