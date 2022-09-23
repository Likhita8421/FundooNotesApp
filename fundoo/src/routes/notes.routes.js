import express from 'express';
import * as noteController from '../controllers/notes.controllers';
import { noteValidator } from '../validators/notes.validators';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck } from '../middlewares/redis.middleware';

const router = express.Router();

//route to get all note
router.get('',userAuth,redisCheck, noteController.getAllNotes);

//route to create a new note 
router.post('',noteValidator,userAuth, noteController.newNotes);

//route to get a note by  id
router.get('/:_id',userAuth, noteController.getNotes);

//route to update a note by id
router.put('/:_id',userAuth, noteController.updateNotes);

//route to delete a user by id
router.delete('/:_id',userAuth, noteController.deleteNotes);

//route to archive Note
router.put('/:_id/archive/',userAuth, noteController.archiveNotes);

//route to archive Note
router.put('/:_id/trash/',userAuth, noteController.trashNotes);

export default router;
