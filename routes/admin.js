var express = require('express');
var router = express.Router();
const admin= require('../controller/admincontroller');
const multer = require('multer');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname); // Use the current timestamp as the filename
    },
  });
  
  const upload = multer({ storage: storage });

/* GET home page. */
router.post('/',admin.admin_register);
router.post('/admin_login',admin.admin_login);
router.post('/register',auth.admin,upload.single('photo'),admin.employee_register);
router.get('/emp_views',auth.admin,admin.employee_views);
router.get('/emp_single/:id',auth.admin,admin.employee_single);
router.get('/delete/:id',auth.admin,admin.delete);
router.post('/update/:id',auth.admin,admin.update);
router.post('/add_task',auth.admin,admin.add_task);
router.get('/task_delete/:id',auth.admin,admin.task_delete);
router.post('/task_update/:id',auth.admin,admin.task_update);
router.get('/task_single/:id',auth.admin,admin.task_single);


module.exports = router;
