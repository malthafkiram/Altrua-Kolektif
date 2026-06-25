const { AuthController } = require("../controllers/authController");

const router = require("express").Router();

router.get("/register", AuthController.showRegisterForm);
router.post("/register", AuthController.processRegister);

router.get("/login", AuthController.showLoginForm);
router.post("/login", AuthController.processLogin);

router.get("/logout", AuthController.logout);

module.exports = router;
