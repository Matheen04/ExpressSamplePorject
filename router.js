const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const studentData = require("./studentData.json");


router.get("/route", (req, res) => {
  res.send("Route navigation successful");
});

// get student data
router.get("/studentdata", (req, res) => {
  res.json(studentData);
});

// get student data based on id
router.get("/studentdata/:id", (req, res) => {
  const newArray = studentData.filter((eachStudent) => {
    return eachStudent.id === req.params.id;
  });
  res.json(newArray);
});

// add new student data 
router.post("/", (req, res) => {
  //const updatedArray = [...studentData, req.body]
  const newStudentData = {
    studentName: req.body.studentName,
    id: uuid.v4(),
    totalMarks: req.body.totalMarks
  };
  studentData.push(newStudentData)
  res.json(studentData);
});

// update student data 
router.put("/studentdata/:id", (req, res) => {
  const dataFound = studentData.some(eachItem => eachItem.id === req.params.id);
  if(dataFound){
    studentData.map((eachItem) => {
      if(eachItem.id === req.params.id){
        eachItem.studentName = req.body.studentName ? req.body.studentName : eachItem.studentName;
        eachItem.totalMarks = req.body.totalMarks ? req.body.totalMarks : eachItem.totalMarks
      }
    })
  }
  res.json(studentData);
});


//Deletes student data
router.delete("/studentdata/:id", (req, res) => {
  const dataFound = studentData.some(eachItem => eachItem.id === req.params.id);
  console.log(dataFound);
  
  if(dataFound){
    res.json({msg: "Student data deleted", updatedData: studentData.filter((eachStudent) => {
      return eachStudent.id !== req.params.id
    })});
  } else{
    res.status(400).json({msg: "Student not found"});
  }
});

//Invalid routes
router.all("*", (req, res) => {
  res.send(`Invalid route - ${req.url}`);
});




module.exports = router;
