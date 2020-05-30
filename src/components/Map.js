import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import {
  useSelector
  // useDispatch
} from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  // height: "90vh",
  position: "absolute"
};

export const MapComponent = () => {
  // const dispatch = useDispatch();
  const mapData = useSelector(state => state.map);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapData.styles[0].url,
        center: [mapData.lng, mapData.lat],
        zoom: mapData.zoom
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, mapData]);

  return (
    <React.Fragment style={{ height: "100vh" }}>
      <Typography variant="h3" gutterBottom style={{ align: "center" }}>
        {mapData.styles[0].name}
      </Typography>
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </React.Fragment>
  );
};
