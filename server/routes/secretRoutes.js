const express = require("express");
const router = express.Router();
const {getSecrets,createSecret,likeSecret}= require('../controllers/secretController');

router.get("/",getSecrets);
router.post('/',createSecret);
router.put('/:id/like', likeSecret);

module.exports = router;