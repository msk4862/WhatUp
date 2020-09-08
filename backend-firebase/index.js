const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const postsRoute = require("./functions/resources/posts/posts.router"); 

const port = 8000

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
app.use("/api/posts", postsRoute);

var posts = []
var id = 0

// app.get('/posts', (req, res) => {
//     res.statusCode = 200;
//     res.json(posts);
// });

// app.get('/posts/:id', (req, res) => {
//     var post = _.find(posts, {id: req.params.id});
//     if (post) {
//         res.statusCode = 200;
//         res.json(post);
//     } else {
//         res.statusCode = 404;
//         res.json({'Error' : 'Post not found!'});
//     }
    
// });


// app.post('/posts', (req, res) => {
//     var post = req.body;
//     id++;
//     post.id = ''+id;
//     posts.push(post);

//     res.statusCode = 201;
//     res.json(post);
// });

// app.put('/posts/:id', (req, res) => {
//     var updatedData = req.body;
//     if (updatedData.id) {
//         //id will not be updated
//         delete updatedData.id;
//     } 
//     var postIndex = _.findIndex(posts, {id: req.params.id});
//     if(posts[postIndex]) {
//         var updatedPost = _.assign(posts[postIndex], updatedData);
//         res.status = 200;
//         res.json(updatedPost);
//     } else {
//         res.status = 404;
//         res.json({'Error': 'Post not found!'});
//     }
// });

// app.delete('posts/:id', (req, res) => {
//     var postIndex = _.findIndex(posts, {id: req.params.id});
//     if(posts[postIndex]) {
//         posts.splice(postIndex, 1);
//         res.status = 200;
//         res.json({'Success': 'Deleted!'});
//     } else {
//         res.status = 404;
//         res.json({'Error': 'Post not found!'});
//     }
// })

//if url dons't match any above routes
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(
        '<html><body>Hello there sunshine!!</body></html>'
    );
});

app.listen(port, (err) => {
    if(err) {
        console.log("Something went wrong!");
    }
    console.log(`listening on http://localhost:${port}`);
});

