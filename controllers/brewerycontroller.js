let router = require("express").Router();
const { Brewery } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { name, location, favorite } = req.body.brewery;
  try {
    const saveBrewery = await Brewery.create({
      name: name,
      location: location,
      favorite: favorite,
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
router.get("/mine", validateSession, async (req, res) => {
  try {
    const breweries = await Brewery.findAll({
      where: { userId: req.user.id },
      include: "user",
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
router.get("/owner/:username", async (req, res) => {
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

module.exports = router;
