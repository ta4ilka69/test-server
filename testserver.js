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

const Time = new Date();


app.get('/', (req, res) => {
  const time = Time.getHours().toString()+":"+Time.getMinutes().toString()+", "+Time.getDate().toString()+"."+(Time.getMonth()+1).toString()+"."+Time.getFullYear().toString();
  let list = store.list();
  res.render("index", {list:list,time:time});
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
  const time = Time.getHours().toString()+":"+Time.getMinutes().toString()+", "+Time.getDate().toString()+"."+(Time.getMonth()+1).toString()+"."+Time.getFullYear().toString();
  if (store.hasId(id)) {
    res.render("Edit",{id:id,time:time})
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