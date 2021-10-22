const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/algamoney-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/algamoney-ui/index.html');
});

app.listen(process.env.PORT || 4200);

// aplicação com url https://algamoney-ui-angular-prod.herokuapp.com/
// Rodar o comando   node server.js