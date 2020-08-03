const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// initialize our express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/exam-admin';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
  console.log("db connected");
}).catch((err) => {
  console.log("error: " + err);
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const QuestionSchema = new mongoose.Schema({
  _id: Number,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  rightOption: String
});

const Question = mongoose.model("Question", QuestionSchema);

const TestSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  question6: String,
  question7: String,
  question8: String,
  question9: String,
  question10: String,
})

const Test = mongoose.model("Test", TestSchema);

const StudentSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  rollNumber: String,
  year: String,
  lastTestName: String,
  lastTestScore: Number,
  lastTestFeedback: String
})

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  application: {
    name: {
      type: String,
    },
    receipt: {
      type: Number,
    },
    passType: {
      type: String,
    },
    Fees:{
      type: Number,
    },
    email:{
      type: String,
    },
    phone: {
      type: String
    }
  },
  isSubmitted: Boolean,
  slots: [{
    slot: {
      type:String
    }
  }]
})

const User = mongoose.model("User", userSchema);

const Student = mongoose.model("Student", StudentSchema);
// db.createCollection("sample");
// db.collection('sample').insert({_id: "item_id" , sequence_value : 0 });
// db.collection('sample').insert({_id: "item_id" , sequence_value : 0 });
// db.sample.insert ( {_id: "item_id" , sequence_value : 0 } );
// db.sample.insert ( {_id: "item_id" , sequence_value : 0 } );



// function getValueForNextSequence(sequenceOfName){
// return new Promise(resolve => {
//   var sequenceDoc = db.collection('sample').findAndModify(
//     {_id: sequenceOfName },
//     {$inc:{sequence_value:1}},
//     {new : true}
//    );
//     console.log(sequenceDoc);
//     resolve(sequenceDoc.sequence_value);
// })



// }

// async function getValue(sequenceOfName) {
//   var res = await getValueForNextSequence(sequenceOfName);
//   return res;
// }

app.get('/api/question', (req, res) => {
  getAsyncQuestions(res);
});

app.post('/api/question', (req, res) => {
  addAsyncQuestions(req,res);
});

app.put('/api/question', (req, res) => {
  updateAsyncOneQuestion(req,res);
});

app.get('/api/test', (req, res) => {
  getAsyncTests(res);
});

app.post('/api/test', (req, res) => {
  addAsyncTest(req, res);
});

app.get('/api/student', (req, res) => {
  getAsyncStudents(res);
});

app.post('/api/student', (req, res) => {
  addAsyncStudent(req, res);
});

app.put('/api/student', (req, res) => {
  updateAsyncOneStudent(req, res);
});

app.listen(3000, () => {
  console.log('Mongo Server is up and running..!!! ');
});


function getQuestions() {
  return new Promise(resolve => {
    const res = Question.find({});
    resolve(res);
  });
}

async function getAsyncQuestions(res) {
  const result = await getQuestions();
  // console.log(result);
  res.status(200);
  res.json(result);
}

async function addQuestions(req) {
  return new Promise(resolve => {
    Question.collection.count().then(data => {
      const question = new Question({
        _id: data+1,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        rightOption: req.body.rightOption
      });

      try {
        question.save();
        resolve('successfully saved');
      } catch (err) {
        resolve(err);
      }
    });
  });
}

async function addAsyncQuestions(req, res) {
  const result = await addQuestions(req);
  res.status(201);
  res.json(result);
}

function updateOneQuestion(req) {
  let id = Number(req.body.index);
  console.log(id);
  return new Promise(resolve => {
    try {
      console.log(req.body.newQuestion);
      Question.update({_id: id}, req.body.newQuestion).then(data => {
        console.log(data);
        resolve('successfully updated');
      })
    } catch (err) {
      resolve(err);
    }
  })
}

async function updateAsyncOneQuestion(req, res) {
  const result = await updateOneQuestion(req);
  res.status(201);
  res.json(result);
}


function addTest(req) {
  return new Promise(resolve => {
    Test.collection.count().then(data => {
      const test = new Test({
        _id: data+1,
        name: req.body.name,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4,
        question5: req.body.question5,
        question6: req.body.question6,
        question7: req.body.question7,
        question8: req.body.question8,
        question9: req.body.question9,
        question10: req.body.question10,
      });

      try {
        test.save();
        resolve('successfully saved');
      } catch (err) {
        resolve(err);
      }
    });
  })
}

async function addAsyncTest(req, res) {
  const result = await addTest(req);
  res.status(201);
  res.json(result);
}


function getTests() {
  return new Promise(resolve => {
    const res = Test.find({});
    resolve(res);
  });
}

async function getAsyncTests(res) {
  const result = await getTests();
  // console.log(result);
  res.status(200);
  res.json(result);
}

function getStudents() {
  return new Promise(resolve => {
    const res = Student.find({});
    resolve(res);
  });
}

async function getAsyncStudents(res) {
  const result = await getStudents();
  // console.log(result);
  res.status(200);
  res.json(result);
}

function addStudent(req) {
  return new Promise(resolve => {
    Student.collection.count().then(data => {
      const student = new Student({
        _id: data+1,
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        year: req.body.year,
        lastTestName: req.body.lastTestName,
        lastTestScore: req.body.lastTestScore,
        lastTestFeedback: req.body.lastTestFeedback
      });

      try {
        student.save();
        resolve('successfully saved');
      } catch (err) {
        resolve(err);
      }
    });
  })
}

async function addAsyncStudent(req, res) {
  const result = await addStudent(req);
  res.status(201);
  res.json(result);
}

function updateOneStudent(req) {
  let id = Number(req.body.index);
  console.log(id);
  Student.updateOne
  return new Promise(resolve => {
    try {
      Student.update({_id: id}, req.body.newStudent).then(data => {
        console.log(data);
        resolve('successfully updated');
      })
    } catch (err) {
      resolve(err);
    }
  })
}

async function updateAsyncOneStudent(req, res) {
  const result = await updateOneStudent(req);
  res.status(201);
  res.json(result);
}
