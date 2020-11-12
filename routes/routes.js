const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');

router.get('/home',controller.gethome);
router.post('/login',controller.postlogin);
router.get('/register',controller.getregister);
router.post('/register',controller.postregister);
router.get('/studentform',controller.getstudentdataform);
router.post('/studentsubmit',controller.fillstudentdata);
router.get('/start/test',controller.tandcpagestarttest);
router.get('/teststart',controller.questionpage);
router.get('/load',controller.load12);
router.post('/submitAnswer',controller.answersheet);
router.get('/about',controller.about);
router.get('/timerecieve',controller.timeR);
router.get('/addquestions',controller.addquestions);
router.post('/addquestions',controller.postaddquestions);
router.post('/email/verification',controller.emailverify);
router.post('/email/verification/d',controller.emailverifyd);
router.get('/noofquestions',controller.sendquestionno);
module.exports = router;
