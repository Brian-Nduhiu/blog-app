const express = require("express");
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://brian:VceNBlxfzGm6u09N@myblog.dqcbm.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log(`connected to db`);
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch(err => console.log(err));


const PORT = process.env.PORT || 3500;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(express.urlencoded({ extended: true }));

app.get('^/$|/index', (req, res) => {

    res.redirect('/blogs');
});


app.use('/blogs', blogRoutes);

app.get('/about-us|/about', (req, res) => {
    res.render('about', { title: 'About' });
});


app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});




