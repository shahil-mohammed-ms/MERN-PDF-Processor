const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfModule = require('../../Modules/pdf/pdfController')

const fs = require('fs');
const pdfPoppler = require('pdf-poppler');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

//for converting pdf to images

const pdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'pdf');
const imageDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'image');

// Ensure the directories exist, or create them
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const storagepdf = multer.memoryStorage();
const uploadpdf = multer({ storage: storagepdf });

router.post('/uploadpdf', uploadpdf.single('pdfFile'),pdfModule.ConvertPdfToImage)


//ConvertImageToPdf

router.post('/convertToPDF',pdfModule.ConvertImageToPdf)


module.exports = router;