var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
const http = require('http');

// connection to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentadvisor",
});




var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Restful running on port 3000");
});

app.post("/register/", (req, res, next) => {
  var sqldata = req.body;
  var student_id = sqldata.student_id;
  var email = sqldata.email;
  var phone = sqldata.phone;  
  var email = sqldata.email;
  var password = sqldata.password;
 
      var sql = "INSERT INTO register(student_id,email,phone,password) VALUES (?,?,?,?)";
      var values = [student_id,email,phone,password];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Success");
        console.log("Registered" + sqldata);
      });
    
  });



app.post("/addadvisor/", (req, res, next) => {
  var sqldata = req.body;
  var name = sqldata.name;
  var department = sqldata.department;
  var campus_name = sqldata.campus_name;
  var designation = sqldata.designation;
  var location = sqldata.location;

      var sql = "INSERT INTO advisor (name,department,campus_name,designation,location) VALUES (?,?,?,?,?)";
      var values = [name, department, campus_name, designation, location];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Advisor Added Successfully");
        console.log("Added" + sqldata);
      });
    
  });

app.post("/login/", (req, res, next) => {
    var sqldata = req.body;
    var email = sqldata.email;
    var password = sqldata.password;
  
    con.query("SELECT * FROM register where email = ?", [email], function (
      err,
      result,
      fields
    ) {
      con.on("error", (err) => {
        console.log("[MySQL ERROR]", err);
      });
  
      if (result && result.length) {
        if (password == result[0].password) {
          res.json("Success");
        } else {
          res.json("Invalid user");
        }
      }
    });
  });




  app.get('/getadvisors', (req, res) => {
    
    
    con.query("SELECT * FROM advisor",(err, rows, fields) =>{
      if (!err) 
      res.send(rows)
      else
      console.log(err)

          });
  });
    




  
  



