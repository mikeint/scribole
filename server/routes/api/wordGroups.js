const express = require('express');
const router = express.Router();

// @route       GET api/wordGroups/getAllWords
// @desc        Get All Word Groups
// @access      Public
router.get('/getAllWords', (req, res) => {
    res.send('[somedata]');
}); 

module.exports = router;