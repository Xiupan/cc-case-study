import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  // height: "90vh",
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
    <div style={{ height: "100vh" }}>
      <Typography variant="h3" gutterBottom style={{ align: "center" }}>
        {selectedMapStyle.name}
      </Typography>
      <button
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
      </button>
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </div>
  );
};
