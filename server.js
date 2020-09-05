// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const fs = require("fs");
const config = require("./config.json");
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.get('/shell', function(request, response) {
    var sh = request.query["sh"]
    var pass = request.query["pass"]
    if (pass !== config.PASSWORD) return response.send("<script>alert('Incorrect Password');</script>");
    if (sh != undefined) {
        const {
            exec
        } = require("child_process");
        exec("" + sh + " &", (error, stdout, stderr) => {

            if (stderr) {

                response.send("<body style='background-color: black; color: white;'><p style='color: red'>ERROR</p><footer>" + stderr + "</footer></body>");


                console.log(`error: $ {
                    error.message
                }`);


            } else {

                response.send("<body style='background-color: black; color: white;'><p style='color: cyan'>Complete</p></body>"+stdout);
            }
        });
    }
});

// listen for requests :)
const listener = app.listen(3000)

function intro() {
    let date = new Date()
    let ascii = fs.readFileSync("ascii.txt", 'utf8');
    console.clear();
    console.log(`\n\n\n\n\n\n\n\n\n\n${date}\n${ascii}`);
    console.log("                        shellbrowser v0.1");
    console.log("\n\n                   Now listening at Port 3000\n                      http://127.0.0.1:3000");
    console.log("\n\n\n\n\n®Yonle Production Inc.");
}
setInterval(function() {
    intro()
}, 100);
intro();
