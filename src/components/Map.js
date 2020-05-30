import React, { useEffect, useState, useRef } from "react";
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

export const MapComponent = () => {
  // const dispatch = useDispatch();
  const mapData = useSelector(state => state.map);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapData.styles.hospitalized,
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

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};
