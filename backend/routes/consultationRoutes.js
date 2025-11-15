const express = require('express');
const router = express.Router();
const {
  createConsultation,
  getMyConsultations,
  getConsultation
} = require('../controllers/consultationController');
const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.post('/', createConsultation);
router.get('/', getMyConsultations);
router.get('/:id', getConsultation);

module.exports = router;
