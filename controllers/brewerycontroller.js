let router = require("express").Router();
const { Brewery } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { name, street, city, state, zip, type, favorite } = req.body.brewery;
  try {
    const saveBrewery = await Brewery.create({
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      type: type,
      favorite: favorite,
      userId: req.user.id,
    });
    res.status(200).json({
      message: "Brewery successfully saved!",
      brewery: saveBrewery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save brewery.",
      error: error,
    });
    console.log(error);
  }
});

// Get all breweries for a user
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

// Get all breweries for another user other than logged in user
router.get("/user/:id", async (req, res) => {
  try {
    const breweries = await Brewery.findAll({
      where: { userId: req.params.id },
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

// Get a brewery by ID
router.get("/:id", validateSession, async (req, res) => {
  try {
    const brewery = await Brewery.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (brewery !== null) {
      // return the brewery
      res.status(200).json({
        brewery: brewery,
      });
    } else {
      // the brewery was not found
      res.status(404).json({
        message: "Brewery not found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});

// Update a brewery
router.put('/:id', validateSession, async (req, res) => {
  const { name, street, city, state, zip, type, favorite } = req.body.brewery;
  try {
    const updateBrewery = await Brewery.update({
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      type: type,
      favorite: favorite},
      {where: { id: req.params.id, userId: req.user.id }}
    );
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

// Delete a brewery
router.delete("/:id", validateSession, async (req, res) => {
  try {
    const deleteBrewery = await Brewery.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    res
      .status(200)
      .json({ message: "Brewery deleted", brewery: deleteBrewery });
  } catch (err) {
    res.status(500).json({ error: err, message: "Error: Brewery not deleted" });
  }
});

module.exports = router;
