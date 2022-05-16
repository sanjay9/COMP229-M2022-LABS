const http = require('http'); //CommonJS Module pattern (CJS)
const fs = require('fs');
const mime = require('mime-types');

let lookup = mime.lookup; // alias for mime.lookup

const port = 3000;

const server = http.createServer(function(req, res) 
{
    let path = req.url; //alias fro req.url

    if(path =="/" || path == "/home"){
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1));
    console.log(`MIME TYPE: ${mime_type}`);
    //console.log(__dirname);
    fs.readFile(__dirname + path, function(err, data)
    {
        if(err){
            res.writeHead(404); // status - file not found
            console.log(`ERROR: ${err.message}`);
            return res.end(err.message); //output error message to the page
            
        }
        res.setHeader("X-Content-Type-Optios", "nosniff"); //security guard
        res.writeHead(200, {'Content-Type': mime_type}); 
       // res.writeHead(200); // status - all ok
        res.end(data);
        console.log(`DATA: ${data}`);
    });
});

server.listen(port, function()
{
    console.log(`Server running at Port: ${port}`);
});