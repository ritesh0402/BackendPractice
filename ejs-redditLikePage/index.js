const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const redditData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/posts/:subreddit', (req, res) => {
   const { subreddit } = req.params;
   const data = redditData[subreddit];
   if (data) {
      res.render('subreddit', { subreddit, ...data });
   } else {
      res.send("Page not Available");
   }
})

app.listen(port, () => {
   console.log(`Listening on port: ${port}`)
})