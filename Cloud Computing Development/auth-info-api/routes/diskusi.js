const express = require('express');
const { saveDiskusi, getAllDiskusi, deleteDiskusi } = require('../controllers/diskusiController');

const router = express.Router();

// Endpoint untuk menyimpan diskusi
router.post('/', saveDiskusi);

// Endpoint untuk mengambil semua diskusi
router.get('/', getAllDiskusi);

// Endpoint untuk menghapus diskusi berdasarkan ID
router.delete('/:id', deleteDiskusi);

module.exports = router;