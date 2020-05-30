import { buildReducer } from "../../utils/buildReducer";
import produce from "immer";
import * as actions from "../actions";

const initialState = {
  lat: 38.0,
  lng: -97.0,
  zoom: 3.75,
  availableStyles: [
    {
      index: 0,
      url: "mapbox://styles/xiupan/ckau8akp02sxa1itd90uq0dqj/draft",
      name: "Number of Deaths"
    },
    {
      index: 1,
      url: "mapbox://styles/xiupan/ckatvrt2331411ipf1kvl6kpa/draft",
      name: "Number of Hospitalized"
    }
  ],
  selectedStyle: {
    index: 0,
    url: "mapbox://styles/xiupan/ckau8akp02sxa1itd90uq0dqj/draft",
    name: "Number of Deaths"
  }
};

const setMapLat = produce((draft, action) => {
  draft.lat = action.payload.lat;
  return draft;
});

const setMapLng = produce((draft, action) => {
  draft.lng = action.payload.lng;
  return draft;
});

const setMapZoom = produce((draft, action) => {
  draft.zoom = action.payload.zoom;
  return draft;
});

const setSelectedStyle = produce((draft, action) => {
  draft.selectedStyle = action.payload.selectedStyle;
  return draft;
});

const handlers = {
  [actions.SET_MAP_LAT]: setMapLat,
  [actions.SET_MAP_LNG]: setMapLng,
  [actions.SET_MAP_ZOOM]: setMapZoom,
  [actions.SET_SELECTED_STYLE]: setSelectedStyle
};

export default buildReducer(initialState, handlers);
