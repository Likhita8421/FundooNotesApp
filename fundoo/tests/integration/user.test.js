import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let jwtToken;
let NewjwtToken;
let noteId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  //USER Registration with valid details
  describe('POST /registration', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        FirstName: 'priya',
        LastName: 'wasnik',
        EmailId: 'pw@gmail.com',
        Password: 'wasnik123'
      };
      request(app)
        .post('/api/v1/users/')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    //USER Registration with invalid details
    it('given new user when added should return status 400', (done) => {
      const userdetails = {
        FirstName: 123,
        LastName: '12',
        EmailId: 'pw@.com',
        Password: 'wk123'
      };
      request(app)
        .post('/api/v1/users')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });

  //User Login with valid login details
  describe('POST /login', () => {
    it('given new user when added should return status 200', (done) => {
      const userdetails = {
        EmailId: 'pw@gmail.com',
        Password: 'wasnik123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          jwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  //Forget Password
  describe('POST /forgetPwd', () => {
    it('Given user mailId should check details and send mail with reset link', (done) => {
      const userdetails = {
        EmailId: 'pw@gmail.com',
      };
      request(app)
        .post('/api/v1/users/forgetPwd')
        .send(userdetails)
        .end((err, res) => {
          NewjwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  // //reset Password
  // describe('PUT /resetPwd', () => {
  //   it('Given user mailId should check details and send mail with reset link', (done) => {
  //     const userdetails = {
  //       Password: 'priya123'
  //     };
  //     request(app)
  //       .put(`/api/v1/users/resetPwd/${NewjwtToken}`)
  //       .send(userdetails)
  //       .set('authorization', `bearer ${NewjwtToken}`)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(HttpStatus.OK);
  //         done();
  //       });
  //   });
  // });


  //Add New Note
  describe('POST /AddNote', () => {
    it('Given new note details should be saved', (done) => {
      const userdetails = {
        Title: 'season',
        Description: 'rainy season'
      };
      request(app)
        .post('/api/v1/note')
        .send(userdetails)
        .set('authorization', `bearer ${jwtToken}`)
        .end((err, res) => {
          noteId = res.body.data._id;
          console.log("$$$$$$$$$..NoteId=========> ", noteId)
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  //Get All notes for a User
  describe('GET /note', () => {
    it('Given user login details should fetch all notes', (done) => {
      request(app)
        .get('/api/v1/note')
        .set('authorization', `bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  //Get a note by Id for a User
  describe('GET /note', () => {
    it('Given user login details should fetch all notes', (done) => {
      request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('authorization', `bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });



  //Update a Note
  describe('PUT /updateNote', () => {
    it('given the note id of a user should update the note', (done) => {
      const userdetails = {
        Title: 'season',
        Description: 'summer season'
      };
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .send(userdetails)
        .set('authorization', `bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  //Delete a Note
  describe('Delete /deleteNote', () => {
    it('given the note id of a user should delete the note', (done) => {
      const userdetails = {
        Description: 'summer season'
      };
      request(app)
        .delete(`/api/v1/note/${noteId}`)
        .send(userdetails)
        .set('authorization', `bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


});
