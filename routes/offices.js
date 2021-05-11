const express = require('express');
const router = express.Router();
const offices = require('../controllers/offices');

router.get('/all', offices.getAllRecords);
router.get('/city/:city', offices.allByCity);
router.get('/state/:state', offices.allByState);
router.get('/zip/:zip', offices.allByZip);

module.exports = router;
