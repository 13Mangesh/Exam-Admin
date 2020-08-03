const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database("./exam.db", sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
     if (err) {
       return console.error(err.message);
     }
     console.log('Connected to the in-memory SQlite database.');
   });


// Tables needed to create

  // db.run(" create table questions (question TEXT, option1 TEXT, option2 TEXT, option3 TEXT, option4 TEXT, rightOption TEXT)");
  // db.run(" create table test (name TEXT, question1 INTEGER, question2 INTEGER, question3 INTEGER, question4 INTEGER, question5 INTEGER, question6 INTEGER, question7 INTEGER, question8 INTEGER, question9 INTEGER, question10 INTEGER)");
  // db.run(" create table student (name TEXT, rollNumber TEXT, year TEXT, lastTestName TEXT, lastTestScore INTEGER, lastTestFeedBack)");







// SQLite code for future reference - NO NEED TO RUN

// let sql = `SELECT *
//   FROM questions
//   WHERE rowid  = ?`;
// let playlistId = 11;

// // first row only
// db.get(sql, [playlistId], (err, row) => {
// if (err) {
// return console.error(err.message);
// }
// return row
// ? console.log(row.rowid, row.question)
// : console.log(`No playlist found with the id ${playlistId}`);

// });
// db.serialize(() => {
  // db.run(" create table questions (question TEXT, option1 TEXT, option2 TEXT, option3 TEXT, option4 TEXT, rightOption TEXT)");
  // db.run(" create table test (name TEXT, question1 INTEGER, question2 INTEGER, question3 INTEGER, question4 INTEGER, question5 INTEGER, question6 INTEGER, question7 INTEGER, question8 INTEGER, question9 INTEGER, question10 INTEGER)");
  // db.run(" create table student (name TEXT, rollNumber TEXT, year TEXT, lastTestName TEXT, lastTestScore INTEGER, lastTestFeedBack)");
  // db.run(" create table authStudent (rollNumber TEXT, password TEXT)");
  // db.each("select name from sqlite_master where type='table'", function (err, table) {
  //   console.log(table);
  // });

  //db.run("CREATE TABLE lorem2 (info TEXT, other TEXT)");
  //  db.run("DROP TABLE questions");
  // var stmt = db.prepare("INSERT INTO lorem2 VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i, "test");
  // }
  // stmt.finalize();
  //let info = 'mkp';
  // db.run(`INSERT INTO authStudent(rollNumber, password) VALUES(?,?)`, ['2017BTECS00100','2017BTECS00100'], function(err) {
  //   if (err) {
  //     return console.log(err.message);
  //   }
  //   // get the last insert id
  //   console.log(`A row has been inserted with rowid ${this.lastID}`);
  // });

  //   db.run(`INSERT INTO questions(question, option1, option2, option3, option4) VALUES(?,?,?,?,?)`, ['sample q2', 'opt1-2', 'jhhopt2', 'onkpt3', 'ojhjkpt4'], function(err) {
  //   if (err) {
  //     return console.log(err.message);
  //   }
  //   // get the last insert id
  //   console.log(`A row has been inserted with rowid ${this.lastID}`);
  // });

  // db.run(`UPDATE student SET rollNumber = ? where name = ?`, ['2017BTECS00100', 'Mangesh Puri']);

  // db.each("SELECT * FROM student", function(err, row) {
  //     // console.log(row.id + ": " + row.info + '  '+ row.other);
  //     console.log(row);
  // });


// });

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/', (req, res) => {
    res.send('success');
});

app.get('/api/question', (req, res) => {
  getAsyncQuestions(res);
});

app.post('/api/question', (req, res) => {
  addAsyncQuestions(req, res);
});

app.put('/api/question', (req, res) => {
  updateAsyncOneQuestion(req, res);
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

app.listen(3000, () => console.log('app listening on port 3000!'));

function getQuestions() {
  return new Promise(resolve => {
    let sql = `SELECT * FROM questions`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      resolve(rows);
    });
  });
}

async function getAsyncQuestions(res) {
  const result = await getQuestions();
  // console.log(result);
  res.status(200);
  res.json(result);
}

function addQuestions(req) {
  return new Promise(resolve => {
    db.run(`INSERT INTO questions(question, option1, option2, option3, option4, rightOption) VALUES(?,?,?,?,?,?)`, [req.body.question, req.body.option1, req.body.option2, req.body.option3, req.body.option4, req.body.rightOption], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
      resolve(this.lastID);
    });
  })
}

async function addAsyncQuestions(req, res) {
  const result = await addQuestions(req);
  res.status(201);
  res.json(result);
}

function updateOneQuestion(req) {
  return new Promise(resolve => {
    db.run(`UPDATE questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, rightOption = ? WHERE rowid = ?`, [req.body.newQuestion.question, req.body.newQuestion.option1, req.body.newQuestion.option2, req.body.newQuestion.option3, req.body.newQuestion.option4, req.body.newQuestion.rightOption, req.body.index], function (err) {
      if (err) {
        return console.log(err.message);
      }
      resolve(this.changes);
    })
  })
}

async function updateAsyncOneQuestion(req, res) {
  const result = await updateOneQuestion(req);
  res.status(201);
  res.json(result);
}


function addTest(req) {
  return new Promise(resolve => {
    db.run(`INSERT INTO test(name, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10) VALUES(?,?,?,?,?,?,?,?,?,?,?)`, [req.body.name, req.body.question1, req.body.question2, req.body.question3, req.body.question4, req.body.question5, req.body.question6, req.body.question7, req.body.question8, req.body.question9, req.body.question10], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
      resolve(this.lastID);
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
    let sql = `SELECT * FROM test`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      resolve(rows);
    });
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
    let sql = `SELECT * FROM student`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      resolve(rows);
    });
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
    db.run(`INSERT INTO authStudent(rollNumber, password) VALUES(?,?)`, [req.body.rollNumber, req.body.rollNumber]);
    db.run(`INSERT INTO student(name, rollNumber, year, lastTestName, lastTestScore, lastTestFeedback) VALUES(?,?,?,?,?,?)`, [req.body.name, req.body.rollNumber, req.body.year, req.body.lastTestName, req.body.lastTestScore, req.body.lastTestFeedback], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
      resolve(this.lastID);
    });
  })
}

async function addAsyncStudent(req, res) {
  const result = await addStudent(req);
  res.status(201);
  res.json(result);
}

function updateOneStudent(req) {
  return new Promise(resolve => {
    db.run(`UPDATE student SET lastTestName = ?, lastTestScore = ?, lastTestFeedback = ? WHERE rowid = ?`, [req.body.newStudent.lastTestName, req.body.newStudent.lastTestScore, req.body.newStudent.lastTestFeedback, req.body.index], function (err) {
      if (err) {
        return console.log(err.message);
      }
      resolve(this.changes);
    })
  })
}

async function updateAsyncOneStudent(req, res) {
  const result = await updateOneStudent(req);
  res.status(201);
  res.json(result);
}
