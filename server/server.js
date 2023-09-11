const express = require('express');
const dynamoose = require("dynamoose");
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({ 
    "region": "ca-central-1"
});
// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const wordGroups = require('./routes/api/wordGroups');
//const testAPI = require('./routes/api/testAPI'); 
const passport = require('passport'); 
const cors = require('cors');
const methodOverride = require('method-override');
//var path = require('path');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(methodOverride('_method'));

// connect to mongoDB through mongoose
// const db = require('./config/keys').mongoURI;
// mongoose
//     .connect(db)
//     .then(() => console.log(`connected to ${db}`))
//     .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// to host static build
//app.use(express.static(path.join(__dirname + "/../client/build"))); 
app.get('/', (req, res) => res.send("Hello World"));

// USE routes
app.use('/api/users', users);
app.use('/api/wordGroups', wordGroups);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app

// sls offline - runs serverless server locally
// sls deploy - deploy the serverless server to aws