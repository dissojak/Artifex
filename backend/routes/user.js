const express = require("express");
const UC = require("../controller/UserController");
const { check } = require("express-validator");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/signup",
  [
    check("username").isLength({ min: 2, max: 14 }),
    check("email").normalizeEmail().isEmail(),
    check("pw").isLength({ min: 3 }),
  ],
  UC.registerUser
);
router.post("/login", UC.authUser);
router.post("/logout", UC.logoutUser);

router.get("/getUser", MW.protect, UC.getUserProfile);
router.put(
  "/settings",
  (req, res, next) => {
    // Check if email field exists in the request body
    if (req.body.email) {
      // If email field exists, apply email validation middleware
      check("email").normalizeEmail().isEmail();
    }
    if (req.body.username) {
      check("username").isLength({ min: 2, max: 14 });
    }
    next();
  },
  MW.protect,
  UC.updateUserProfile
);

router.patch(
  "/update-profile-image",
  check("imageUrl").isURL().withMessage("ImageArtwork must be a valid URL"),
  MW.protect,
  UC.update_ProfileImage
);

/*
This route is designed to retrieve information about clients.
It is protected by authentication middleware (MW.protect),
which ensures that only authenticated users can access this 
endpoint.The authentication process verifies the presence of a 
valid JWT token in the request headers( that should be sent in 
frontend request ). If the token is missing or invalid, the 
middleware will return a 401 Unauthorized error, blocking access
by protection and canceling the Function (getClients).Once 
authenticated, the request is forwarded to the UserController's
getClients method, which handles the logic to fetch and return 
the clients data.
*/

router.get("/getClients", MW.protect, UC.getClients);
router.get("/getPanier", MW.protect, UC.getPanier);
router.post("/addArtworkToPanier",MW.protect, UC.addArtworkToPanier);

module.exports = router;
