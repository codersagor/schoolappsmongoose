const express = require('express');
const { home, about } = require("../controllers/controllers");
const router  = express.Router();

// First get route
router.get('/', home);
router.get('/home', home);

router.get('/about', about)


module.exports = router;