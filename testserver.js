// JavaScript source code
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

const stack = [];

app.get("/", function (req, res) {
    let template = "<ul>";
    for (let i = 0, st = stack.reverse(); i < st.length; i++) {
        template += (`<li>` + st[i] + `</li>`);
    }
    template += "</ul>";
    stack.reverse();
    res.send(template+`
        <form action="/add" method="post">
            <input type="text" placeholder="Data" name="data"/>
            <button type="submit">Send</button>
</form>
<form action="/delete" method="post">
            <input type="text" placeholder="To delete" name="deldata"/>
            <button type="submit">Delete</button>
</form>
`)});
app.post("/delete", function (req, res)
{
    stack.splice(stack.indexOf(req.body.deldata), 1);
    res.redirect("/");
})

app.post("/add", function (req, res) {
    stack.push(req.body.data);
    res.redirect("/");
});

app.listen(3000);
