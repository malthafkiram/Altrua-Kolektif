const { Router } = require("express");
const { AuthController } = require("../controllers/authController");
const CampaignController = require("../controllers/campaignController");
const HomeController = require("../controllers/homeController");
const auth = require("./auth");
const campaign = require("./campaign");

const router = require("express").Router();

router.get("/", HomeController.home);
router.use(auth);
router.use(campaign);

module.exports = router;
