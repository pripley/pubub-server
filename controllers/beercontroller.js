let router = require("express").Router();
const { Beer } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { name, location, rating, servingStyle, flavor, availability, note } = req.body.beer;
  try {
    const saveBeer = await Beer.create({
      name: name,
      location: location,
      rating: rating,
      servingStyle: servingStyle,
      flavor: flavor,
      availability: availability,
      note: note,
      userId: req.user.id,
      owner: req.user.username,
    });
    res.status(200).json({
      message: "Beer successfully saved!",
      recipe: saveBeer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save beer.",
      error: error,
    });
    console.log(error);
  }
});

// get all beers for a user
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

// get all beers for a user other than their own
router.get("/:username", async (req, res) => {
  try {
    const beers = await Beer.findAll({
      where: { owner: req.params.username },
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


router.get('/:id', async (req, res) => {
    try {
        const beer = await Beer.findOne(req.params.id);
        if (beer !== null) {        
            // return the recipe
            res.status(200).json({
                beer: beer,
            });
        } else {
            // the recipe was not found
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
    const { name, location, rating, servingStyle, flavor, availability, note } = req.body.beer;
  try {
    const updateBeer = await Beer.update({
        name: name,
      location: location,
      rating: rating,
      servingStyle: servingStyle,
      flavor: flavor,
      availability: availability,
      note: note,
      where: { id: req.params.id, owner: req.user.username }
    });
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
            where: { id: req.params.id, owner: req.user.username }
        })
        res.status(200).json({ message: 'Beer deleted', beer: deleteBeer })
    } catch(err) {
        res.status(500).json({ error: err, message: 'Error: Beer not deleted' })
    }       
});

module.exports = router;