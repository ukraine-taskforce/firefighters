import type { Feature, Geometry, GeoJsonProperties } from "geojson";

export type FirestationWithData = {
  id: number,
  name: string,
  lat: number,
  long: number,
  total: number,
  description: string,
};

export const mapToFeatures = (data: FirestationWithData[]): Feature<Geometry, GeoJsonProperties>[] => {
  const maxAmount = data.reduce((max, dataPoint) => Math.max(max, dataPoint.total), 0);
  return data.map((dataPoint) => {
    return {
        type: "Feature",
        properties: {
          amount: dataPoint.total,
	  name: dataPoint.name,
	  normalized_amount: dataPoint.total / maxAmount,
          description: dataPoint.description,
        },
        geometry: { type: "Point", coordinates: [dataPoint.long, dataPoint.lat] },
    };
  });
};


