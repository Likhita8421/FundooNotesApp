import { _id } from '@hapi/joi/lib/base';
import note from '../models/notes.models';
import { client } from '../config/redis';
import Label from '../models/label.model';
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
    { _id: _id, userId: _id.userId }
  );

  return '';
};

//get single note
export const getNotes = async (_id) => {
  const data = await note.findById(
    { _id: _id, userId: _id.userId },
  );
  return data;
};



//Archive  note
export const archiveNotes = async (_id, userId) => {
  const data = await note.findOne({ _id: _id, userId: userId });
  const currentStatus = !data.isArchived;
  const resdata = await note.findOneAndUpdate({ _id: _id, userId: userId }, { isArchived: currentStatus }, { new: true });

  return resdata;
};

// export const archiveNotes = async (_id) => {
//   const data = await note.findByIdAndUpdate(
//     { _id: _id, userId: _id.userId },{ isArchived: true  }, { new: true }  );    

//   console.log("archived data=====>", data)
//   return data;
// };



//trash note
export const trashNotes = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
      _id: _id, userId: body.userId,
    },
    {
      isDeleted: true
    },
    {
      new: true
    }
  );
  console.log("trashed data===>", data)
  return data;
}


// adding label
export const addLabel = async (_id, LabelId) => {
  const labelCheck = await Label.find({ id: LabelId })
  if (labelCheck != null) {
    const data = await note.findByIdAndUpdate({ _id: _id }, { $addToSet: { LabelId: LabelId } }, { new: true });
    return data;
  }
};

//Delete Lable from note
export const deleteLabel = async (_id, LabelId) => {
  const data = await note.findByIdAndUpdate({ _id: _id }, { $pull: { LabelId: LabelId } }, { new: true });
  return data;
}

//add Collaborators to note
export const addCollaborator = async (_id, Collaborators) => {
  const Check = await Label.find({ id: Collaborators })
  if (Check != null) {
    const data = await note.findByIdAndUpdate({ _id: _id }, { $addToSet: { Collaborators: Collaborators } }, { new: true });
    return data;
  }
};

//Delete delete Collaborators from note
export const deleteCollab = async (_id, Collaborators) => {
  const data = await note.findByIdAndUpdate({ _id: _id }, { $pull: { Collaborators: Collaborators } }, { new: true });
  return data;
}




//Unarchive  note
// export const unArchiveNote = async (_id) => {
//   let userData = {


//   const data = await note.findByIdAndUpdate(

//     { _id: _id, userId: _id.userId },

//     {
//       isArchived: true
//     },
//     {
//       new: true
//     }
//   );
//   console.log("archived data=====>", data)
//   return data;
// };