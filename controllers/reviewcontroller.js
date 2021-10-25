let router = require("express").Router();
const { Review } = require("../models");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, async (req, res) => {
  const { review } = req.body.review;
  try {
    const saveReview = await Review.create({
      review: review,
      userId: req.user.id,
      owner: req.user.username,
    });
    res.status(200).json({
      message: "Review successfully saved!",
      recipe: saveReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save review.",
      error: error,
    });
    console.log(error);
  }
});

// get all reviews for a user
router.get("/", validateSession, async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },      
    });
    if (reviews.length > 0) {
      res.status(200).json({
        reviews: reviews,
      });
    } else {
      res.status(404).json({
        message: "No reviews found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});

// get all reviews for a user other than their own
router.get("/:username", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { owner: req.params.username },
    });
    if (reviews.length > 0) {
      res.status(200).json({
        reviews: reviews,
      });
    } else {
      res.status(404).json({
        message: "No reviews found.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, message: "Internal error" });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByOne(req.params.id);
        if (review !== null) {        
            // return the recipe
            res.status(200).json({
                review: review,
            });
        } else {
            // the recipe was not found
            res.status(404).json({
                message: 'Review not found.',
            });
        }
    } 
    catch (err) {
        res.status(500).json({ error: err, message: "Internal error" });
      }   
    
});

// update a review
router.put('/:id', validateSession, (req, res) => {
const { name, location, favorite } = req.body.review;
  try {
    const updateReview = await Review.update({
      review: review,
      where: { id: req.params.id, owner: req.user.username }
    });
    res.status(200).json({
      message: "Review successfully saved!",
      review: updateReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update review.",
      error: error,
    });
    console.log(error);
  }
});

//delete a review
router.delete('/:id', validateSession, (req, res) => {
    try {
        const deleteReview = await Review.destroy({
            where: { id: req.params.id, owner: req.user.username }
        })
        res.status(200).json({ message: 'Recipe Deleted', review: deleteReview })
    } catch(err) {
        res.status(500).json({ error: err, message: 'Error: Recipe not deleted' })
    }       
});

module.exports = router;
