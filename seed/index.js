
const mongoose = require('mongoose');
const Campground = require('../modal/campground');
const cities = require('./cities');
const {places, descriptors} =require('./seedHelper')


mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('MONGOOSE WORKING');
    }).catch((er) => {
    console.log('Mongooes Failed');
    })



const sample = (array) => {
 return   array[Math.floor(Math.random() * array.length)]
}


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const rand = Math.floor(Math.random() * 55) + 1;
        const price =  Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            title:`${sample(descriptors)}, ${sample(places)}`,
            location: `${cities[rand].city}, ${cities[rand].state}`,
            image: 'https://source.unsplash.com/collection/190727',
            description: 'About avove Photo',
            price
        })
        await camp.save();
    }
   
}
seedDB().then(() => {
    mongoose.connection.close();
})