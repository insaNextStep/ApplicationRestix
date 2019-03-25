const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/TutoAngular'));

// Send all requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/TutoAngular/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 8080, ()=> {
  // console.log('lancement du server');
});