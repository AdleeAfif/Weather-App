const { Router } = require("express");
const { renderSearchPage, renderForecastPage } = require("../controllers");

const router = Router();

router.route("/").get(renderSearchPage);
router.route("/forecast").get(renderForecastPage);

module.exports = { router };
