import Label from '../models/label.model';

//add label
export const addLabel = async (body) => {
    const data = await Label.create(body);
    return data;
};

//get all label
getAllLabel
export const getAllLabel = async (body) => {
    const data = await Label.find(body);
    return data;
};

//update label
export const updateLabel = async (_id, body) => {
    const data = await Label.findByIdAndUpdate(
        {
            _id: _id
        },
        body,
        {
            new: true
        })
    return data;
};


//delete label
export const deleteLabel = async (_id) => {
    await Label.findOneAndDelete(_id)
};