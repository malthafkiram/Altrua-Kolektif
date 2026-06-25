const isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();

  return res.redirect("/login");
};

const isCompany = (req, res, next) => {
  if (req.session.user && req.session.user.role === "company") {
    return next();
  }

  const isDonate = (req, res, next) => {
    if (req.session.user && req.session.user.role === "donate") {
      return next();
    }
    res.redirect(
      "/?error=" +
        encodeURIComponent(
          "Akses Ditolak: Hanya akun Donatur (Donate) yang dapat menyalurkan donasi.",
        ),
    );
  };

  res.redirect(
    "/?error=" +
      encodeURIComponent(
        "Akses Ditolak: Hanya akun Penyelenggara (Company) yang dapat mengelola kampanye.",
      ),
  );
};

const isDonate = (req, res, next) => {
  if (req.session.user && req.session.user.role === "donate") {
    return next();
  }
  res.redirect(
    "/?error=" +
      encodeURIComponent(
        "Akses Ditolak: Hanya akun Donatur (Donate) yang dapat menyalurkan donasi.",
      ),
  );
};

module.exports = { isLoggedIn, isCompany, isDonate };
