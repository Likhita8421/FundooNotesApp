import { _id } from '@hapi/joi/lib/base';
import note from '../models/notes.models';
import { client } from '../config/redis';
import { cli } from 'winston/lib/winston/config';

//get all note
export const getAllNotes = async (userdetails) => {
  const data = await note.find({ userId: userdetails.userId });
  if (data) {
    await client.set('getAllData', JSON.stringify(data));
    return data;

  }
};


//create new note
export const newNotes = async (body) => {
  const data = await note.create(body);
  if (data) {
    await client.del('getAllData');
    return data;
  }
};

//update a note
export const updateNotes = async (_id, body) => {
  console.log("data==> ", body.userId)
  const data = await note.findByIdAndUpdate(

    { _id: _id, userId: body.userId },
    { Title: body.Title, Description: body.Description },

    {
      new: true
    }
  );

  return data;
};

//delete a note
export const deleteNotes = async (_id) => {
  await note.findByIdAndDelete(
    {_id:_id, userId:_id.userId}
    );

  return '';
};

//get single note
export const getNotes = async (_id) => {
  const data = await note.findById(
    { _id:_id, userId:_id.userId},
  );
  return data;
};



//Archive  note
export const archiveNotes = async (_id) => {
  const data = await note.findByIdAndUpdate(

    { _id:_id, userId:_id.userId},

    {
      isArchived: true
    },
    {
      new: true
    }
  );
  console.log("archived data=====>", data)
  return data;
};



//trash note
export const trashNotes = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
       _id:_id, userId:body.userId,
    },
    {
      isDeleted: true
    },
    {
      new: true
    }
  );
  console.log("trashed data===>",data)
  return data;
}