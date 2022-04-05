import { LayerProps } from "react-map-gl";

export const layerStyle: LayerProps = {
  id: "circles",
  type: "circle",
  minzoom: 2,
  paint: {
    "circle-radius": [
      // Doc on interpolation https://maplibre.org/maplibre-gl-js-docs/style-spec/expressions/#interpolate
      "interpolate",
      ["linear"],
      ["zoom"],
      7,
      ["interpolate", ["linear"], ["get", "normalized_amount"], 0, 1, 1, 12],
      16,
      ["interpolate", ["linear"], ["get", "normalized_amount"], 0, 5, 1, 300],
    ],
    "circle-color": "rgb(24,178,43)",
    "circle-stroke-color": "black",
    "circle-stroke-width": 1,
    "circle-opacity": 1,
  },
};
