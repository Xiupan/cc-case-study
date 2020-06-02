import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import {
  useSelector
  // useDispatch
} from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

let layers = [
  {
    index: 0,
    key: "number-of-dead",
    visibility: "none",
    label: "Number of Deaths"
  },
  {
    index: 1,
    key: "hospitalized",
    visibility: "none",
    label: "Number of Hospitalized"
  }
];

let map;
let popup = new mapboxgl.Popup();

export const MapComponent = () => {
  // const dispatch = useDispatch();
  const mapData = useSelector(state => state.map);
  const [mapState, setMapState] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(layers[0].label);
  const mapContainer = useRef(null);

  const getLayers = mapArg => {
    layers.forEach(layer => {
      layer["visibility"] = mapArg.getLayoutProperty(
        layer["key"],
        "visibility"
      );
    });
    return layers;
  };

  const nextLayer = mapArg => {
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      if (layer["visibility"] === "visible") {
        layer["visibility"] = "none";
        mapArg.setLayoutProperty(layer.key, "visibility", "none");
        if (i + 1 > layers.length - 1) {
          layers[0]["visibility"] = "visible";
          mapArg.setLayoutProperty(layers[0].key, "visibility", "visible");
          setSelectedLayer(layers[0].label);
          popup.remove();
          break;
        } else {
          layers[i + 1]["visibility"] = "visible";
          mapArg.setLayoutProperty(layers[i + 1].key, "visibility", "visible");
          setSelectedLayer(layers[i + 1].label);
          popup.remove();
          break;
        }
      }
    }
  };

  const numberOfDeadPopup = mapArg => {
    mapArg.on("click", "number-of-dead", e => {
      popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`Deaths: ${e.features[0].properties.death}`)
        .addTo(mapArg);
    });

    mapArg.on("mouseenter", "number-of-dead", e => {
      mapArg.getCanvas().style.cursor = "pointer";
    });

    mapArg.on("mouseleave", "number-of-dead", e => {
      mapArg.getCanvas().style.cursor = "";
    });
  };

  const hospitalizedPopup = mapArg => {
    mapArg.on("click", "hospitalized", e => {
      popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          e.features[0].properties.hospitalizedCurrently
            ? `Currently Hospitalized: ${e.features[0].properties.hospitalizedCurrently}`
            : `Currently Hospitalized: No data`
        )
        .addTo(mapArg);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    mapArg.on("mouseenter", "hospitalized", e => {
      mapArg.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    mapArg.on("mouseleave", "hospitalized", function() {
      mapArg.getCanvas().style.cursor = "";
    });
  };

  useEffect(() => {
    const initializeMap = ({ setMapState, mapContainer }) => {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/xiupan/ckau8akp02sxa1itd90uq0dqj/draft",
        center: [mapData.lng, mapData.lat],
        zoom: mapData.zoom
      });

      map.on("load", () => {
        // set first layer visible by default on map load
        map.setLayoutProperty("number-of-dead", "visibility", "visible");
        map.setLayoutProperty("hospitalized", "visibility", "none");

        getLayers(map);
        setMapState(map);
        map.resize();
      });

      numberOfDeadPopup(map);
      hospitalizedPopup(map);
    };

    if (!mapState) initializeMap({ setMapState, mapContainer });
  }, [mapState, mapData]);

  return (
    <div>
      <Grid
        container
        spacing={6}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs>
          <Typography
            variant="h5"
            gutterBottom
            style={{ align: "center", margin: "5px" }}
          >
            {selectedLayer}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="h5"
            gutterBottom
            style={{ align: "center", margin: "5px" }}
          >
            COVID-19 Data (May 28, 2020)
          </Typography>
        </Grid>
        <Grid item xs>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "5px" }}
            onClick={() => {
              nextLayer(map);
            }}
          >
            Next Map Layer
          </Button>
        </Grid>
      </Grid>
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </div>
  );
};
