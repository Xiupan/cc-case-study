import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

export const MapComponent = () => {
  const dispatch = useDispatch();
  const mapData = useSelector(state => state.map);
  const selectedMapStyle = useSelector(state => state.map.selectedStyle);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: selectedMapStyle.url,
        center: [mapData.lng, mapData.lat],
        zoom: mapData.zoom
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, mapData, selectedMapStyle]);

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
            {selectedMapStyle.name}
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
              dispatch({
                type: "REQUEST_NEXT_MAP",
                payload: {
                  currentIndex: selectedMapStyle.index,
                  availableStyles: mapData.availableStyles
                }
              });
              setMap(null);
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
