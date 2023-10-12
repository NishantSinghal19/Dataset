const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken'); // Import the authentication middleware
const { authenticateUser } = require('../controllers/auth.controller');

const {
  addRecord,
  deleteRecord,
  getSummarySalary,
  getContractSummarySalary,
  getDepartmentSummarySalary,
  getNestedSalarySummaryStatistics
} = require('../controllers/api.controller');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authenticateUser(username, password);
    res.status(200).json({ message: 'Authentication successful', token: result.token });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

router.post('/add-record', authenticateToken, addRecord);
router.delete('/delete-record/:name', authenticateToken, deleteRecord);
router.get('/summary-salary', authenticateToken, getSummarySalary);
router.get('/contract-summary-salary', authenticateToken, getContractSummarySalary);
router.get('/department-summary-salary', authenticateToken, getDepartmentSummarySalary);
router.get('/nested-department-summary-salary',authenticateToken,getNestedSalarySummaryStatistics);

module.exports = router;
