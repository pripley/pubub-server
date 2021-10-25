let router = require("express").Router();
const { Brewery } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { name, location, rating, note } = req.body.brewery;
  try {
    const saveBrewery = await Brewery.create({
      name: name,
      location: location,
      rating: rating,
      note: note,       
      userId: req.user.id,
      owner: req.user.username,
    });
    res.status(200).json({
      message: "Brewery successfully saved!",
      recipe: saveBrewery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save brewery.",
      error: error,
    });
    console.log(error);
  }
});

// get all breweries for a user
router.get("/", validateSession, async (req, res) => {
  try {
    const breweries = await Brewery.findAll({
      where: { userId: req.user.id },      
    });
    if (breweries.length > 0) {
      res.status(200).json({
        breweries: breweries,
      });
    } else {
      res.status(404).json({
        message: "No breweries found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});

// get all breweries for a user other than their own
router.get("/:username", async (req, res) => {
  try {
    const breweries = await Brewery.findAll({
      where: { owner: req.params.username },
    });
    if (breweries.length > 0) {
      res.status(200).json({
        breweries: breweries,
      });
    } else {
      res.status(404).json({
        message: "No breweries found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const brewery = await Brewery.findByOne(req.params.id);
        if (brewery !== null) {        
            // return the recipe
            res.status(200).json({
                brewery: brewery,
            });
        } else {
            // the recipe was not found
            res.status(404).json({
                message: 'Brewery not found.',
            });
        }
    } 
    catch (err) {
        res.status(500).json({ error: err, message: "Internal error" });
      }   
    
});

// update a brewery
router.put('/:id', validateSession, (req, res) => {
const { name, location, favorite } = req.body.brewery;
  try {
    const updateBrewery = await Brewery.update({
      name: name,
      location: location,
      favorite: favorite,
      where: { id: req.params.id, owner: req.user.username }
    });
    res.status(200).json({
      message: "Brewery successfully saved!",
      brewery: updateBrewery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update brewery.",
      error: error,
    });
    console.log(error);
  }
});

//delete a brewery
router.delete('/:id', validateSession, (req, res) => {
    try {
        const deleteBrewery = await Brewery.destroy({
            where: { id: req.params.id, owner: req.user.username }
        })
        res.status(200).json({ message: 'Recipe Deleted', brewery: deleteBrewery })
    } catch(err) {
        res.status(500).json({ error: err, message: 'Error: Recipe not deleted' })
    }       
});

module.exports = router;
