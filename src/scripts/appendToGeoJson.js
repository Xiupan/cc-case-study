const fs = require("fs");
const _ = require("lodash");
const csv = require("csvtojson");
const statesMapping = require("../json/statesMapping.json");

let obj = {};
let temp = {};
let csvData = [];

fs.readFile("../geojson/us-states.geojson", "utf8", async (err, data) => {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);

    csvData = await csv().fromFile("../csv/us-states-covid19.csv");

    csvData.forEach(c => {
      let stateName = statesMapping[c.state];

      obj.features.forEach(feature => {
        if (feature.properties.NAME === stateName) {
          Object.keys(c).forEach(key => {
            feature.properties[key] = c[key];
          });
        }
      });
    });

    json = JSON.stringify(obj);
    fs.writeFile("../geojson/us-states-edit.geojson", json, "utf8", error => {
      if (error) {
        throw error;
      }
    });
  }
});
