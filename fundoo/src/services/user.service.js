import User from '../models/user.model';
import bcrypt from 'bcrypt';
//import jwt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as utilsService from '../utils/user.util';
import { sender } from '../config/rabbitmq';



//create new user
export const newUser = async (body) => {
  const SearchData = await User.findOne({ EmailId: body.EmailId });
  if (SearchData != null) {
    throw new Error("User is already Exist")
  } else {
    const saltRounds = 10;
    console.log("user details in service=====> ", body)
    console.log("user Password in service=====> ", body.Password)

    const hashPassword = bcrypt.hashSync(body.Password, saltRounds);
    console.log("Hash Password in service=====> ", hashPassword)
    body.Password = hashPassword
    console.log("user details in after password hashing=====> ", body)


    const data = await User.create(body);
    sender(data);
    console.log("rabbitmq======> ", data)
    return data;
  }
};


//get login user
export const checkLogin = async (userdetails) => {
  const data = await User.findOne({ EmailId: userdetails.EmailId });
  if (data != null) {
    const checkPwdMatch = bcrypt.compareSync(userdetails.Password, data.Password); // true
    console.log("user details===> ", checkPwdMatch)
    if (checkPwdMatch) {
      //  return data;
      //const token = jwt.sign({data},process.env.SECRET_KEY);
      var token = jwt.sign({ FirstName: data.FirstName, LastName: data.LastName, EmailId: data.EmailId, id: data._id }, process.env.SECRET_KEY);

      return token;
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("invalid EmailId")
  }
};

//get forget Pasword 
export const forgetPassword = async (userdetails) => {
  const data = await User.findOne({ EmailId: userdetails.EmailId });
  if (data != null) {
    var token = jwt.sign({ EmailId: data.EmailId, id: data._id }, process.env.NEW_SECRET_KEY);
    var details = await utilsService.sendMail(data.EmailId, token);
    return details;
  } else {
    throw new Error("invalid EmailId")
  }
};


//update to Reset Pasword 
export const resetPassword = async (body) => {
  console.log("body=====>", body)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.Password, saltRounds);
  console.log("hashedpwd=====>", hashedPassword)
  const data = await User.findOneAndUpdate({ EmailId: body.userId },
    {
      Password: hashedPassword
    },
  );

  console.log("data====> ", data)

  return data;
};