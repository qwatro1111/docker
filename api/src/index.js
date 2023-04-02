const express = require('express');
const mongoose = require('mongoose')
const { connectDb } = require('./helpers/db');
const { host, port, db } = require('./configuration');
const app = express();
const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
   app.listen(port, () => {
       console.log(`Started api service on port ${port}`);
       console.log(`Our host ${host}`);
       console.log(`Our database ${db}`);

//        Post.find({})
//            .then(posts => console.log('posts', posts))
//            .catch(err => console.log(err));
       const silence = new Post({ name: "Silence" });
       silence.save({})
           .then(silence => console.log('silence with volumes', silence))
           .catch(err => console.log(err));
   });
};

app.get('/test', (req, res) => {
    res.send('Our api server is work correctly!');
});

connectDb()
    .on('error', console.log)
    .on('disconnection', connectDb)
    .on('open', startServer);