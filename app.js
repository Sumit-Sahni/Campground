const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const Campground = require('./modal/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGOOSE WORKING');
    }).catch((er) => {
        console.log('Mongooes Failed');
    });
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


app.get('/campgrounds', async (req, res) => {
 const campgrounds = await Campground.find({});
    res.render('campground/index', {campgrounds})

})
app.get('/campgrounds/new', (req, res) => {
    res.render('./new',)
})

app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)  ; 
    res.render('campground/show',{campground})
})

app.get('campground/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('/edit', { campground });
})
app.listen(8000, () => {
    console.log('Server Working');
});