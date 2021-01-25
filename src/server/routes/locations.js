const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

//gets all locations
router.get('/', async (req, res) => {
    try{
        const locations = await Location.find();
        res.json(locations);
    }
    catch(err){
        res.json({message: err});
    }
});

//posts a location
router.post('/', async (req, res) => {
    const location = new Location({
        id: req.body.id,
        name: req.body.name,
        area: req.body.area,
        type: req.body.type,
        continent: req.body.continent
    });
    console.log(req.body);
    try{
        const savedLocation = await location.save();
        res.json(savedLocation);
    }
    catch(err){
        res.json({message: err});
    }
});

//gets specific location
router.get('/:locationId', async (req, res) => {
    try{
        const location = await Location.findById(req.params.locationId);
        res.json(location);
    }
    catch(err){
        res.json({message: err});
    }
});

//delete location
router.delete('/:locationId', async (req, res) => {
    try{
        const removedLocation = await Location.remove({_d: req.params.locationId});
        res.json(removedLocation);
    }
    catch(err){
        res.json({message: err});
    }
});

//update location
// router.patch('/:locationId', async (req, res) => {
//     try{
//         const updatedLocation = await Location.updateOne(
//             {id: req.params.postId},
//             {$set: {title: req.body.title}}
//         );
//         res.json(updatedPost);
//     }
//     catch(err){
//         res.json({message: err});
//     }
// });


module.exports = router;