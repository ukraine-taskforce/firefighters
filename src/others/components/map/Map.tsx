import { useTranslation } from "react-i18next";
import MapComponent, { Popup, MapRef, MapLayerMouseEvent, Layer, Source } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Geometry, FeatureCollection, GeoJsonProperties } from "geojson";

import { Box, Typography } from "@mui/material";
import { useCallback, useState, useRef } from "react";
import { INITIAL_CENTER_VIEW } from '../../constants';
import { layerStyle } from './CircleLayerStyle';

interface PopupInfo {
  latitude: number;
  longitude: number;
  data: {
    id: string;
    description: string;
    city: string;
    totalItems: number;
  };
}

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
//ttps://api.maptiler.com/maps/8ecc366c-2d3e-45cf-b34d-dfc07d5ef395/style.json?key=8XnO8TF3UjHDY1RKP9jm";
//process.env.REACT_APP_MAPLIBRE_MAP_STYLE || "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export const Map = () => {
  const { t } = useTranslation();
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [cursor, setCursor] = useState<"auto" | "pointer">("auto");

  const closePopup = useCallback(() => {
    setCursor("auto");
    setPopupInfo(null);
  }, []);

  const handleMouseMove = useCallback(
    (event: MapLayerMouseEvent) => {
      if (mapRef?.current) {
        const features = mapRef.current.queryRenderedFeatures(event.point, {
          layers: ['circles'],
        });

        if (features && features.length > 0) {
          // We'd like to give preference to a more granular information, thus 'state-fills' is less desirable.
          const preferredLayerIndex = features[0].layer.id === 'state-fills' && features.length === 2 ? 1 : 0;
          const requestData = features[preferredLayerIndex].properties;
          if (!requestData) return;
          const popupId = `city:${requestData.city}`;
          if (popupInfo && popupInfo.data.id === popupId) return;

          setCursor("pointer");

          setPopupInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            data: {
              id: popupId,
              city: requestData.city,
              description: requestData.description,
              totalItems: requestData.amount,
            },
          });
        }
      }
    },
    [mapRef, popupInfo]
  );

  const data: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [],
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <MapComponent
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={INITIAL_CENTER_VIEW}
        mapStyle={MAP_STYLE}
        style={{ borderRadius: "24px" }}
        interactiveLayerIds={['circles']}
        cursor={cursor}
        onMouseMove={handleMouseMove}
        onMouseLeave={closePopup}
      >
        <Source id="circles-source" type="geojson" data={data}>
          <Layer {...layerStyle} />
        </Source>

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            closeOnClick={false}
            style={{
              color: "#000000",
            }}
          >
            <div>
              {popupInfo.data ? (
                <>
                  <Typography variant="h6" component="div">
                    {popupInfo.data.city}: {popupInfo.data.totalItems} {t("requests")}
                  </Typography>
                  <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                    {popupInfo.data.description}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" component="div">
                  Information unavailable
                </Typography>
              )}
            </div>
          </Popup>
        )}
      </MapComponent>
    </Box>
  );
};
