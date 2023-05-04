const fs = require("fs");
const path = require("path");
const { fileData } = require("../Utils/utils");

const getData = (req, res) => {
  try {
    const data = fileData();
    res.status(200).json({ records: data.length, data });
  } catch (err) {
    res.status(400).json({ records: 0, data: [], message: "Something went wrong!" });
  }
};

const deleteData = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const data = fileData();
    const newData = data.filter((dataObj) => dataObj.id !== id);
    fs.writeFileSync(path.join(process.cwd(), "db/db.json"), JSON.stringify(newData));
    res.status(201).json({ message: "Successfully deleted!", data: newData });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addData = async (req, res) => {
  const resData = req.body.newData;
  const { id, name, email, phone, gender, address } = resData;
  const { city, street } = address;

  // backend validation
  if (!name || !email || !phone || !gender || !city || !street) {
    res.status(400).json({ message: `Invalid parameters!` });
    return;
  }

  const data = fileData();
  let newData;

  if (resData.id) {
    newData = data.map((el) => {
      if (el.id === id) return resData;
      else return el;
    });
  } else {
    const UniqueId = data.length + Math.floor(Math.random() * 99999);
    newData = [{ ...resData, id: UniqueId }, ...data];
  }

  fs.writeFileSync(path.join(process.cwd(), "db/db.json"), JSON.stringify(newData));
  res.status(201).json({ message: `Successfully ${resData.id ? "Edited" : "Added"}!`, data: newData });
};

const getChartData = async (req, res) => {
  const data = fileData();
  const chartData = data.reduce((acc, cur) => {
    const city = cur.address.city;
    // if there is no city create it
    if (!acc[city]) {
      acc[city] = 0;
    }
    acc[city]++;
    return acc;
  }, {});

  let resChart = [];
  for (const key in chartData) {
    resChart.push({ city: key, population: chartData[key] });
  }
  res.status(200).json({ data: resChart });
};

module.exports = { getData, deleteData, addData, getChartData };
