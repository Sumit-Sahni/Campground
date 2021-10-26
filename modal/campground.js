const mongoose = require('mongoose');

const CampGroundShema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

const Campground = new mongoose.model('Campground', CampGroundShema);

module.exports = Campground;
