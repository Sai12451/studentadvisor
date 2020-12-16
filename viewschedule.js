var mysql = require('mysql');
var http = require ('http');

var con = mysql.createConnection({
  host: "localhost",
  user     : 'root',
  password : '',
  database : 'dailyplanner'
});


var json;
con.connect(function(err) {
  if (err) throw err;
 console.log("Connected!");
//create a server object:

            con.query("SELECT * FROM table_schedule", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                var obj = [];
                for (var i = 0; i < result.length; i++){

                    var p = {};           // Object
                    p['sid'] = result[i].sid ;
				          	p['sdate']=result[i].sdate ;
                    p['stime']=result[i].stime ;
                    p['description']=result[i].description ;
                    obj.push(p);
                
                }
                
                json= JSON.stringify(obj, undefined, 2); 
                
              })

              let app = http.createServer((req, res) => {
                // Set a response type of plain text for the response
                res.writeHead(200, {'Content-Type': 'text/plain'});
            
                // Send back a response and end the connection
                res.end(json);
            });
            
            // Start the server on port 3000
            app.listen(3000, '192.168.0.106');



});



