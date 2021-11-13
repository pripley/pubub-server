let router = require("express").Router();
const { Beer } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { name, location, rating, servingStyle, note } = req.body.beer;
  try {
    const saveBeer = await Beer.create({
      name: name,
      location: location,
      rating: rating,
      servingStyle: servingStyle,
      note: note,
      userId: req.user.id,          
    });
    res.status(200).json({
      message: "Beer successfully saved!",
      beer: saveBeer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save beer.",
      error: error,
    });
    console.log(error);
  }
});

// Get all beers for a user
router.get("/", validateSession, async (req, res) => {
  try {
    const beers = await Beer.findAll({
      where: { userId: req.user.id },      
    });
    if (beers.length > 0) {
      res.status(200).json({
        beers: beers,
      });
    } else {
      res.status(404).json({
        message: "No beers found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});

// Get all beers for another user other than logged in
router.get("/user/:id", async (req, res) => {
  try {
    const beers = await Beer.findAll({
      where: { userId: req.params.id },
      include: "user"
    });
    if (beers.length > 0) {
      res.status(200).json({
        beers: beers,
      });
    } else {
      res.status(404).json({
        message: "No beers found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});

// Get all beers by location
router.get('/location/:location', async (req, res) => {
  try {
    const beers = await Beer.findAll({
      where: { location: req.params.location },
      include: "user"
    });
    if (beers.length > 0) {   
          // return the beers
          res.status(200).json({
              beers: beers,
          });
      } else {
          // the beers were not found
          res.status(404).json({
              message: 'Beers not found.',
          });
      }
  } 
  catch (err) {
      res.status(500).json({ error: err, message: "Internal error" });
    }   
  
});

router.get('/:id', async (req, res) => {
    try {
        const beer = await Beer.findOne(req.params.id);
        if (beer !== null) {        
            // return the beer
            res.status(200).json({
                beer: beer,
            });
        } else {
            // the beer was not found
            res.status(404).json({
                message: 'Beer not found.',
            });
        }
    } 
    catch (err) {
        res.status(500).json({ error: err, message: "Internal error" });
      }   
    
});

// update a beer
router.put('/:id', validateSession, async (req, res) => {
  const { name, location, rating, servingStyle, note } = req.body.beer;
  try {
    const updateBeer = await Beer.update({
      name: name,
      location: location,
      rating: rating,
      servingStyle: servingStyle,
      note: note},
      {where: { id: req.params.id, userId: req.user.id }}
    );
    res.status(200).json({
      message: "Beer successfully saved!",
      beer: updateBeer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update beer.",
      error: error,
    });
    console.log(error);
  }
});

//delete a beer
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const deleteBeer = await Beer.destroy({
            where: { id: req.params.id, userId: req.user.id }
        })
        res.status(200).json({ message: 'Beer deleted', beer: deleteBeer })
    } catch(err) {
        res.status(500).json({ error: err, message: 'Error: Beer not deleted' })
    }       
});

module.exports = router;