// const printer = require('printer'),
const fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    printer = require('node-printer');

var lastPrinted;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = 4730;
app.listen(port, () => {
    console.log("Print server started on port: " + port);
});



app.post('/api/print', (req, res) => {
    if(lastPrinted != req.body.printNumber){
        if(printer.getDefaultPrinterName() == 'THERMAL'){
            // console.log(req.body.buffer);
            // var i = fs.readFileSync(new Buffer(req.body.buffer, 'base64'));
            var smegma = new Buffer(req.body.buffer, 'base64');
            printer.printDirect({
                data: smegma,
                type: 'PDF',
                success: function(jobID){
                    lastPrinted = req.body.printNumber;
                    res.status(201).send('Printed successfully');
                },
                error: function(err){
                    res.status(500).send(err);
                }
            });


        }
    }
});
