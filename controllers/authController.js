const { where } = require("sequelize");
const { User, Profile } = require("../models/index");
const bcryptjs = require("bcryptjs");
class AuthController {
  static showRegisterForm(req, res) {
    const { error } = req.query;
    res.render("register", { error });
  }

  static async processRegister(req, res) {
    try {
      const {
        username,
        email,
        password,
        role,
        fullName,
        phoneNumber,
        address,
      } = req.body;

      if (!role) throw new Error("Platform Role wajib dipilih!");

      let newUser = await User.create({ username, email, password, role });

      await Profile.create({
        fullName,
        phoneNumber,
        address,
        userId: newUser.id,
      });

      res.redirect("/");
    } catch (error) {
      let msg = error.message;
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        msg = error.errors.map((el) => el.message).join(", ");
      }
      res.redirect(`/register?error=${encodeURIComponent(msg)}`);
    }
  }

  static showLoginForm(req, res) {
    const { error } = req.query;
    res.render("login", { error });
  }

  static async processLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw new Error("email tidak boleh kosong");
      }
      if (!password) {
        throw new Error("password tidak boleh kosong");
      }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("email atau password anda salah");
      }

      let isValidatePassword = await bcryptjs.compare(password, user.password);

      if (!isValidatePassword) {
        throw new Error("email atau password anda salah");
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      res.redirect("/");
    } catch (error) {
      let msg = error.message;
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        msg = error.errors.map((el) => el.message).join(", ");
      }
      console.log(msg);
      res.redirect(`/login?error=${encodeURIComponent(msg)}`);
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
}

module.exports = { AuthController };
