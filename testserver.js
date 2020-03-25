// JavaScript source code
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

const stack = [];
let counter = 0;

app.get("/", function (req, res) {
    let template = "<ul>";
    for (let i = 0; i < stack.length; i++) {
        let id = stack[i].id;
        template += (`<li>` + stack[i].value + `  ` + `<a href="/edit?id=${id}">Edit</a>` + `  ` + `<a href="/delete?id=${id}">Delete</a>` + `</li>`);
    }
    template += "</ul>";
    res.send(template+`
        <form action="/add" method="post">
            <input type="text" placeholder="Data" name="data"/>
            <button type="submit">Send</button>
</form>
`)});
app.get("/delete", function (req, res)
{
    let tmpid = parseInt(req.query.id);
    const i = stack.findIndex((el) => el.id === tmpid)
    stack.splice(i, 1);
    res.redirect("/");
})

app.get("/edit", function (req, res) {
    let id = parseInt( req.query.id);
    res.send(`<form action="/edit?id=${id}" method="post">
            <input type="text" placeholder="Editor" name="eddata"/>
            <button type="submit">Edit</button> </form>`)
})

app.post("/edit", function (req, res) {
    let tmpid = parseInt(req.query.id);
    const i = stack.findIndex((el) => el.id === tmpid)
    stack[i].value = req.body.eddata;
    res.redirect("/");
})


app.post("/add", function (req, res) {
    counter++;
    stack.unshift({ value : req.body.data, id : counter });
    res.redirect("/");
});

app.listen(3000);
