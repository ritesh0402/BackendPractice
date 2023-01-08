const express = require('express');
const path = require('path');
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('partials', path.join(__dirname, 'views/partials'));

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let comments = [
   {
      id: uuid(),
      usrname: "a",
      comment: "abcd sdgsdgsdfgds "
   },
   {
      id: uuid(),
      usrname: "b",
      comment: "abcd sgfdfgdfgfdgfd"
   },
   {
      id: uuid(),
      usrname: "c",
      comment: "abcd gdfgdfgdfgdfg"
   },
   {
      id: uuid(),
      usrname: "d",
      comment: "abcd fgdfgdfgdfg"
   }
];


app.get('/comments', (req, res) => {
   res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
   res.render('comments/new', { comments })
})

app.post('/comments', (req, res) => {
   const { usrname, comment } = req.body;
   comments.push({ usrname, comment, id: uuid() })
   res.redirect("/comments")
   // res.render('comments/create', { comments })
})

app.get('/comments/:id', (req, res) => {
   const { id } = req.params;
   const comment = comments.find(c => c.id === id)
   res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
   const { id } = req.params;
   const comment = comments.find(c => c.id === id)
   res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
   // res.render('comments/update', { comments })
   const { id } = req.params;
   const newComment = req.body.comment;
   const foundComment = comments.find(c => c.id === id)
   foundComment.comment = newComment;
   //not an ideal way to update data
   res.redirect("/comments")
})

app.delete('/comments/:id', (req, res) => {
   const { id } = req.params;
   comments = comments.filter(c => c.id !== id)
   res.redirect("/comments")
})



app.listen(port, () => {
   console.log(`Listening on port: ${port}`)
})