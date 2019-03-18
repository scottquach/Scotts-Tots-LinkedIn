const functions = require('firebase-functions');

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');
const cors = require('cors')({ origin: true });


const app = express();
const port = 3000;
app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// app.use(express.static(path.join(__dirname, './dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './dist'));
// });

// let pool = mysql.createPool({
//     host: 'uw.mysql.database.azure.com',
//     user: 'group_mu@uw',
//     password: 'Database1',
//     database: 'css_475',
// });

app.post('/api/query', (req, res) => {
    console.log('quering');
    console.log(req.body);
    if (req.body.query) {
        let connection = mysql.createConnection({
            host: 'uw.mysql.database.azure.com',
            user: 'group_mu@uw',
            password: 'Database1',
            database: 'css_475',
        });

        connection.connect();
        return connection.query(req.body.query, (error, results, fields) => {
            if (error) throw error;
            console.log("result was " + JSON.stringify(results, null, 2));
            res.send(results);
            connection.end();
        });
    } else console.log("query was empty")

});
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports.app = functions.https.onRequest(app);
exports.query = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        console.log('quering');
        console.log(request.body);
        if (request.body.query) {
            let connection = mysql.createConnection({
                host: 'uw.mysql.database.azure.com',
                user: 'group_mu@uw',
                password: 'Database1',
                database: 'css_475',
            });
            connection.query(request.body.query, (error, results, fields) => {
                if (error) {
                    response.send("error with query");
                    throw error;
                }
                console.log("result was " + JSON.stringify(results, null, 2));
                response.send(results);
                connection.end();
            });
        } else {
            console.log("query was empty")
            response.send("query was empty")
        }
    })
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
