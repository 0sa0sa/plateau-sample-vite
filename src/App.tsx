// import Cesium, { Cartesian3 } from "cesium";
// import {
//   Viewer,
//   Entity,
//   PointGraphics,
//   EntityDescription,
//   Cesium3DTileset,
// } from "resium";
import Cesium from "cesium";
import { Cesium3DTileset, Viewer } from "resium";

function App() {
  let viewer: Cesium.Viewer; // This will be raw Cesium's Viewer object.
  const handleReady = (tileset: Cesium.Cesium3DTileset) => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };
  return (
    <Viewer
      full
      ref={e => {
        if (e?.cesiumElement) {
          viewer = e.cesiumElement;
        }
      }}
    >
      <Cesium3DTileset
        url="http://127.0.0.1:5174/13101_chiyoda-ku_2020_bldg_low_resolution/tileset.json" // ダウンロードした地図データのパス
        onReady={handleReady}
      />
    </Viewer>
  );
}

export default App;
