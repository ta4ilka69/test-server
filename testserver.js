const express = require('express');
const Storage = require('./Storage.js');
const hbs = require('express-handlebars');
const app = express();
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: '',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/'
}))

app.use("/static",express.static(__dirname + '/static'));

const store = new Storage();

app.get('/', (req, res) => {
  let list = store.list();
  res.render("index", {list});
});

app.get('/delete', (req, res) => {
  const tmpid = parseInt(req.query.id, 10);
  if (store.delete(tmpid)) {
    res.redirect('/');
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/edit', (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (store.hasId(id)) {
    res.render("Edit",{id:id})
  } else {
    res.status(404).send('Not found');
  }
});

app.post('/edit', (req, res) => {
  const tmpid = parseInt(req.query.id, 10);
  if (store.edit(req.body.eddata,tmpid)) {
    res.redirect('/');
  } else {
    res.status(404).send('Not found');
  }
});

app.post('/add', (req, res) => {
  store.add(req.body.data);
  res.redirect('/');
});

app.listen(3000);
