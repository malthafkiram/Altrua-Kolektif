const CampaignController = require("../controllers/campaignController");
const router = require("express").Router();
const { isLoggedIn, isCompany, isDonate } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get(
  "/campaigns/add",
  isLoggedIn,
  isCompany,
  CampaignController.showAddform,
);
router.post(
  "/campaigns/add",
  isLoggedIn,
  isCompany,
  upload.single("image"),
  CampaignController.processAdd,
);

router.get("/campaigns/:id", CampaignController.showCampaignDetail);

router.get(
  "/campaigns/:id/edit",
  isLoggedIn,
  isCompany,
  CampaignController.showEditForm,
);
router.post(
  "/campaigns/:id/edit",
  isLoggedIn,
  isCompany,
  upload.single("image"),
  CampaignController.processEdit,
);

router.get(
  "/campaigns/:id/delete",
  isLoggedIn,
  isCompany,
  CampaignController.processDelete,
);

router.get(
  "/campaigns/:id/donate",
  isLoggedIn,
  isDonate,
  CampaignController.showDonationForm,
);
router.post(
  "/campaigns/:id/donate",
  isLoggedIn,
  isDonate,
  CampaignController.processDonation,
);

router.get(
  "/campaigns/:id/milestones/add",
  isLoggedIn,
  isCompany,
  CampaignController.showMilestoneForm,
);
router.post(
  "/campaigns/:id/milestones/add",
  isLoggedIn,
  isCompany,
  CampaignController.processMilestone,
);

module.exports = router;
