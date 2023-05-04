const express = require("express");
const router = express.Router();
const { getData, deleteData, addData, getChartData } = require("../controllers/Api");

router.post("/delete", deleteData);
router.post("/add", addData);
router.get("/chart", getChartData);
router.get("/", getData);

module.exports = router;
