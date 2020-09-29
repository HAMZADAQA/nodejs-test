const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./modules/blog');
// express app
const app = express();
// connect to db
//const dbURI = 'mongodb+srv://Hamza:test1234@nodejs.vacxy.mongodb.net/node-js?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://Hamza:test1234@nodejs.vacxy.mongodb.net/node-js?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))
// listen for requests
//app.listen(3000);

app.get('/', (req, res) => {
   res.sendFile('./views/index.html', {root: __dirname});
})
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
})
app.get('/home', (req, res) => {
    res.sendFile('./views/home.html', {root: __dirname});
})

////////
app.get('/add-blog', (req, res) => {
   const blog = new Blog({
       title: 'new blog 2',
       snippet: 'about my new blog',
       body: 'more about my new blog'
   });
   blog.save()
   .then((result) => {
       res.send(result)
   })
   .catch((err) => {
       console.log(err)
   })
})
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
       res.send(result);
    })
    .catch((err) => {
        console.log(err)
    });
});
//Single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('5f2fe12502ac712b04e78640')
    .then((result) => {
        res.send(result);
        console.log(result)
    })
    .catch((err) => {
        console.log(err);
    })
})
app.get('/delete-blog',(req, res) => {
    Blog.deleteOne('5f2fe12502ac712b04e78640')
    .then((result) => {
        res.send(result)
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})
// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})