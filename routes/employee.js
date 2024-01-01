var express = require('express');
var router = express.Router();
const employee = require('../controller/employeecontroller');
const auth =require('../middleware/auth');

router.post('/login',employee.employee_login);
router.get('/task',auth.employee,employee.employee_task);
router.get('/decline/:id',auth.employee,employee.decline);
router.get('/complete/:id',auth.employee,employee.complete);

module.exports = router;
