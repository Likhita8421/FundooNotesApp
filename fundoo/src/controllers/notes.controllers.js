import HttpStatus from 'http-status-codes';
import * as noteService from '../services/notes.services';


/**
 * Controller to get all notes 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await noteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Fetched All Notes successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single Note by id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNotes = async (req, res, next) => {
  try {
    const data = await noteService.getNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Single note Fetched Successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNotes = async (req, res, next) => {
  try {
    console.log("data====>", req.body)
    const data = await noteService.newNotes(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Created Note successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNotes = async (req, res, next) => {
  try {
    const data = await noteService.updateNotes(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Updated Note Successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNotes = async (req, res, next) => {
  try {
    await noteService.deleteNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Deleted a Note Successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Controller to archive note
export const archiveNotes = async (req, res, next) => {
  try {
    const data = await noteService.archiveNotes(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Archived Note Successfully'
    });
  } catch (error) {
    next(error);
  }
};



// Controller for Trash note
export const trashNotes = async (req, res, next) => {
  try {
    const data = await noteService.trashNotes(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note trash Successfull'
    });
  } catch (error) {
    next(error);
  }
};