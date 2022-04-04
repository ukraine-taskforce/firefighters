import { Map } from '../../others/components/map/Map';
import { MapProvider } from "react-map-gl";
import Box from "@mui/material/Box";

export function Home() {
  return (<>
            <h1>Let's help firefighters!!!</h1>
            <MapProvider>
              <Box sx={{height: "100vh", maxHeight: "100vh", overflowY: "hidden" }} >
                <Map />
              </Box>
            </MapProvider>
          </>);
}
