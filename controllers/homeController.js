const { Campaign } = require("../models");
const { Op } = require("sequelize");

class HomeController {
  static async home(req, res) {
    try {
      const { search } = req.query;
      let options = {
        where: {},
      };

      if (search) {
        options.where.title = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const campaigns = await Campaign.findAll(options);

      const userSession = req.session.user;

      const { notification } = req.query;

      res.render("lending", {
        campaigns,
        user: userSession,
        search,
        notification,
      });
    } catch (error) {
      res.redirect(
        `/?notification=${encodeURIComponent("Gagal memuat data sistem.")}`,
      );
    }
  }
}

module.exports = HomeController;
