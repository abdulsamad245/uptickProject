const express = require('express');
const router = express.Router();
const controllers = require('../controllers/note-controllers');
const { check, validationResult } = require('express-validator');
const verifyToken = require('../auth/VerifyToken');

router.post('/note', verifyToken, controllers.createNote);
router.get('/note/list', verifyToken, controllers.getAllNotes);
router.get('/note', verifyToken, controllers.getNotesList);
router.get('/note/:id', verifyToken, controllers.getNoteByID);
router.put('/note/:id', verifyToken, controllers.updateNoteById);
router.delete('/note/:id', verifyToken, controllers.deleteNoteById);

module.exports = router;
