import express from 'express';
import { labelValidator } from '../validators/notes.validators';
import { userAuth } from '../middlewares/auth.middleware';
import * as labelController from '../controllers/label.controller';

const router = express.Router();

//route for add label 
router.post('', labelValidator, userAuth, labelController.addLabel);

//route to add label 
router.get('', userAuth, labelController.getAllLabel);

//route to update label
router.put('/:_id', userAuth, labelController.updateLabel);

//route to delete label
router.delete('/:_id', userAuth, labelController.deleteLabel);

export default router;