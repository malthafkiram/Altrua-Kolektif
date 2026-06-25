const { Campaign, User, Milestone, UserDonation } = require("../models/index");
const Formatter = require("../helpers/formater");

class CampaignController {
  static async showCampaignDetail(req, res) {
    try {
      const { id } = req.params;
      const campaign = await Campaign.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Milestone,
          },
          {
            model: UserDonation,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
        order: [
          [Milestone, "stepNumber", "ASC"],
          [UserDonation, "createdAt", "DESC"],
        ],
      });

      if (!campaign) {
        throw new Error(
          "Ledger data kampanye tersebut tidak ditemukan atau sudah dihapus.",
        );
      }

      const totalDonors = await UserDonation.totalDonationCount(id);

      const userSession = req.session.user;

      res.render("campaign-detail", {
        campaign,
        user: userSession,
        toRupiah: Formatter.toRupiah,
        totalDonors,
      });
    } catch (error) {
      console.log(error);
      res.redirect(`/?notification=${encodeURIComponent(error.message)}`);
    }
  }

  static showDonationForm(req, res) {
    const { id } = req.params;
    const { error } = req.query;
    res.render("donation-add", {
      campaignId: id,
      user: req.session.user,
      error,
    });
  }

  static async processDonation(req, res) {
    try {
      const { id } = req.params;
      const { amount, comment } = req.body;

      if (amount < 10000)
        throw new Error("Minimal nominal kontribusi donasi adalah Rp 10.000!");

      await UserDonation.create({
        amount,
        comment,
        campaignId: id,
        userId: req.session.user.id,
      });

      const campaign = await Campaign.findByPk(id);
      await campaign.update({
        currentFunds: campaign.currentFunds + Number(amount),
      });

      res.redirect(`/campaigns/${id}`);
    } catch (error) {
      res.redirect(
        `/campaigns/${req.params.id}/donate?error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  static showMilestoneForm(req, res) {
    const { id } = req.params;
    const { error } = req.query;
    res.render("milestone-add", {
      campaignId: id,
      user: req.session.user,
      error,
    });
  }

  static async processMilestone(req, res) {
    try {
      const { id } = req.params;
      const { stepNumber, targetAmount, description } = req.body;

      await Milestone.create({
        stepNumber,
        targetAmount,
        description,
        campaignId: id,
        isVerified: false,
      });

      res.redirect(`/campaigns/${id}`);
    } catch (error) {
      res.redirect(
        `/campaigns/${req.params.id}/milestones/add?error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  static showAddform(req, res) {
    const { error } = req.query;
    res.render("campaign-add", { user: req.session.user, error });
  }

  static async processAdd(req, res) {
    try {
      const { title, description, targetFunds, category } = req.body;

      if (!req.file) {
        throw new Error("File bukti foto lapangan wajib diunggah!");
      }

      await Campaign.create({
        title,
        description,
        targetFunds,
        category,
        image: req.file.filename,
        userId: req.session.user.id,
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
      res.redirect(`/campaigns/add?error=${encodeURIComponent(msg)}`);
    }
  }

  static async showEditForm(req, res) {
    try {
      const { id } = req.params;
      const { error } = req.query;
      const campaign = await Campaign.findByPk(id);

      if (!campaign) throw new Error("Data kampanye tidak ditemukan.");

      res.render("campaign-edit", { campaign, user: req.session.user, error });
    } catch (error) {
      res.redirect(`/?error=${encodeURIComponent(error.message)}`);
    }
  }

  static async processEdit(req, res) {
    try {
      const { id } = req.params;
      const { title, description, targetFunds, category } = req.body;
      const campaign = await Campaign.findByPk(id);

      if (!campaign) throw new Error("Data kampanye tidak ditemukan.");

      let updatedData = { title, description, targetFunds, category };

      if (req.file) {
        updatedData.image = req.file.filename;
      }

      await campaign.update(updatedData);
      res.redirect(`/campaigns/${id}`);
    } catch (error) {
      let msg = error.message;
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        msg = error.errors.map((el) => el.message).join(", ");
      }
      res.redirect(
        `/campaigns/${req.params.id}/edit?error=${encodeURIComponent(msg)}`,
      );
    }
  }

  static async processDelete(req, res) {
    try {
      const { id } = req.params;
      const campaign = await Campaign.findByPk(id);

      if (!campaign) {
        throw new Error("Data tidak ditemukan atau sudah dihapus.");
      }

      await campaign.destroy();
      res.redirect("/");
    } catch (error) {
      res.redirect(`/?error=${encodeURIComponent(error.message)}`);
    }
  }
}

module.exports = CampaignController;
