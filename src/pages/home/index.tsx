import { Map } from "../../others/components/map/Map";
import { CollapsibleTable } from "../../others/components/CollapsibleList";
import { Sidebar } from "../../others/components/Sidebar";
import { Main } from "../../others/components/Main";
import { MapProvider } from "react-map-gl";
import { fakeData } from "../../others/fixtures/fakeDonations";
import Box from "@mui/material/Box";

export function Home() {
  const sortedData = fakeData.sort((a, b) => b.total - a.total);
  const tableData = sortedData.map((data) => {
    return {
      name: data.name,
      value: data.total,
      description: data.description,
      coordinates: { latitude: data.lat, longitude: data.long },
    };
  });
  const table = (
    <CollapsibleTable
      rows={tableData}
      renderRowData={(row) => { return row; } }
    />
  );

  return (<>
            <h1>Feuer löschen, Menschen retten - mit Deiner Hilfe</h1>
	    <h3>Es brennt in der Ukraine. Immer wieder richten die russischen Angriffe Zerstörung und Leid an
	    Die Menschen in der Ukraine benötigen unsere Unterstützung. Mit dem gesammelten Geld wollen wir die ukrainische Feuerwehr unterstützen, die unter Einsatz ihres Lebens Brände löscht, Menschen aus Trümmern rettet und die</h3>
	    <h3>Die Spenden werden genutzt, um die Feuerwehr in der Ukraine zu unterstützen und 
	    Wie viele Spenden eingenommen wurden und wie viel Ausgaben 
	    </h3>
            <MapProvider>
              <Box sx={{ height: "calc(100vh - 200px)", maxHeight: "100vh", overflowY: "hidden" }}>
                <Main aside={<Sidebar className="requests-sidebar">{table}</Sidebar>}>
                  <Map />
                </Main>
              </Box>
            </MapProvider>
          </>);
}
