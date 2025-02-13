const fs = require("fs");
const _ = require("lodash");
const csv = require("csvtojson");
const statesMapping = require("../json/statesMapping.json");

let obj = {};
let temp = {};
let csvData = [];

let hospitalizedCurrently = [];
let deaths = [];

let hospitalizedCurrentlyMin = 0;
let hospitalizedCurrentlyMax = 0;
let deathsMin = 0;
let deathsMax = 0;

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
            feature.properties[key] = parseFloat(c[key]) || c[key];
          });
        }
      });
    });

    // get an array for each metric
    obj.features.forEach(f => {
      if (f.properties) {
        hospitalizedCurrently.push(
          parseFloat(f.properties.hospitalizedCurrently)
        );
        deaths.push(parseFloat(f.properties.death));
      }
    });

    hospitalizedCurrentlyMin = _.min(hospitalizedCurrently);
    hospitalizedCurrentlyMax = _.max(hospitalizedCurrently);
    deathsMin = _.min(deaths);
    deathsMax = _.max(deaths);

    // normalize the data for the metrics
    obj.features.forEach(f => {
      if (f.properties) {
        f.properties["hospitalCurrentNormalized"] =
          (parseFloat(f.properties["hospitalizedCurrently"]) -
            hospitalizedCurrentlyMin) /
          (hospitalizedCurrentlyMax - hospitalizedCurrentlyMin);

        f.properties["deathsNormalized"] =
          (parseFloat(f.properties["death"]) - deathsMin) /
          (deathsMax - deathsMin);
      }
    });

    json = JSON.stringify(obj);
    fs.writeFile("../geojson/us-states-edit.geojson", json, "utf8", error => {
      if (error) {
        throw error;
      }
    });
  }
});
