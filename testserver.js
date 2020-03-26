const express = require('express');
const storage = require('./Storage.js');
const app = express();

app.use(express.urlencoded({ extended: true }));

const store = new storage();


app.get('/', function (req, res) {
  let template = store.list();
  res.send(
    template +
      `
        <form action="/add" method="post">
            <input type="text" placeholder="Data" name="data"/>
            <button type="submit">Send</button>
</form>
`
  );
});

app.get('/delete', function (req, res) {
  let tmpid = parseInt(req.query.id, 10);
  if (store.hasid(tmpid)) {
    store.delete(tmpid);
    res.redirect('/');
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/edit', function (req, res) {
  let id = parseInt(req.query.id);
  if (store.hasid(id)) {
    res.send(`<form action="/edit?id=${id}" method="post">
            <input type="text" placeholder="Editor" name="eddata"/>
            <button type="submit">Edit</button> </form>`);
  } else {
    res.status(404).send('Not found');
    return;
  }
});


app.post('/edit', function (req, res) {
  let tmpid = parseInt(req.query.id, 10);
  if (store.hasid(tmpid)) {
    store.edit(req.body.eddata, tmpid);
    res.redirect('/');
  } else {
    res.status(404).send('Not found');
    return;
  }
});


app.post('/add', function (req, res) {
  store.add(req.body.data);
  res.redirect('/');
});

app.listen(3000);
