const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//import routes
const postRoutes = require('./routes/posts');
const locationRoutes = require('./routes/locations')
app.use('/posts', postRoutes);
app.use('/locations', locationRoutes);



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

//connect to db
mongoose
.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("connected to mongodb");
});


app.listen(port, () => console.log(`Listening on port ${port}`));