// import Cesium, { Cartesian3 } from "cesium";
// import {
//   Viewer,
//   Entity,
//   PointGraphics,
//   EntityDescription,
//   Cesium3DTileset,
// } from "resium";
import Cesium, {
  Cartesian3,
  createWorldTerrain,
  IonResource,
  JulianDate,
} from "cesium";
import {
  CameraFlyTo,
  Cesium3DTileset,
  Clock,
  Entity,
  EntityDescription,
  GeoJsonDataSource,
  PointGraphics,
  Viewer,
} from "resium";

function App() {
  const protocol = "http://";
  const host = "127.0.0.1";
  const port = ":5173";
  const targetUrl = protocol + host + port;
  let viewer: Cesium.Viewer; // This will be raw Cesium's Viewer object.
  const handleReady = (tileset: Cesium.Cesium3DTileset) => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };

  const baseballStadium = [-104.99404, 39.75621];
  const baseballStadiumCartesian3 = Cartesian3.fromDegrees(
    baseballStadium[0],
    baseballStadium[1],
    100
  );
  const tokyoTower = [139.745438, 35.658581];
  const tokyoTowerCartesian3 = Cartesian3.fromDegrees(
    tokyoTower[0],
    tokyoTower[1],
    100
  );
  const position1 = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
  const position2 = Cartesian3.fromDegrees(-64.0707383, 40.7117244, 100);
  const position3 = Cartesian3.fromDegrees(-54.0707383, 40.7117244, 100);
  const pointGraphics = { pixelSize: 10 };

  const style = { color: "black" };

  const terrainProvider = createWorldTerrain();

  const data = {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "This is where the Rockies play!",
      ComponentType: "GeoJsonDataSource  desu",
    },
    geometry: {
      type: "Point",
      coordinates: baseballStadium,
    },
  };

  const tokyoTowerInfo = {
    type: "Feature",
    properties: {
      name: "Tokyo tower",
      説明: "赤いタワーです",
    },
    geometry: {
      type: "Point",
      coordinates: tokyoTower,
    },
  };

  return (
    <Viewer
      full
      // terrainProvider={terrainProvider}
      ref={e => {
        if (e?.cesiumElement) {
          viewer = e.cesiumElement;
        }
      }}
    >
      <Clock currentTime={JulianDate.fromIso8601("2021-09-27T15:08:10.78")} />
      {/* CameraFlyTo は後半のものが優先される. */}
      {/* <CameraFlyTo destination={baseballStadiumCartesian3} /> */}
      <CameraFlyTo destination={tokyoTowerCartesian3} />

      <Entity
        position={position1}
        point={pointGraphics}
        name="Osaka"
        description="Hello, Osaka."
      />
      <Entity position={position2} name="Tokyo" description="Hello, Tokyo.">
        <PointGraphics pixelSize={10} />
      </Entity>

      {/* If you want to render rich description, EntityDescription component is the best. It enables using JSX in the description of entities! */}
      <Entity position={position3} name="Tokyo">
        <PointGraphics pixelSize={10} />
        <EntityDescription>
          <h1 {...{ style }}>Hello, world.</h1>
          <p>JSX is available here!</p>
        </EntityDescription>
      </Entity>

      {/* 吹き出し的な表示をしているコンポーネント. 本当は自分のデータを入れられるみたい */}
      {/* <GeoJsonDataSource data={"your_geo_json.geojson"} /> */}
      {/* <KmlDataSource data={"your_geo_json.kml"} /> */}
      <GeoJsonDataSource data={data} />
      <GeoJsonDataSource data={tokyoTowerInfo} />

      {/* 3D版データを表示できるらしい. ここでplateauを使っても良い */}
      <Cesium3DTileset
        url={IonResource.fromAssetId(5714)}
        onReady={handleReady}
      />

      <Cesium3DTileset
        url={`./13101_chiyoda-ku_2020_bldg_low_resolution/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      />
      <Cesium3DTileset
        url={`./13102_chuo-ku_2020_bldg_low_resolution/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      />
      <Cesium3DTileset
        url={`./13108_koto-ku_2020_bldg_low_resolution/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      />
      <Cesium3DTileset
        url={`./13103_minato-ku_2020_bldg_low_resolution/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      />

      {/* <Cesium3DTileset
        url={`./13102_chuo-ku_2020_bldg_notexture/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      /> */}
      {/* <Cesium3DTileset
        url={`./13102_chuo-ku_2020_bldg_texture/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      /> */}
      {/* <Cesium3DTileset
        url={`./13102_chuo-ku_2020_bldg_texture/tileset.json`} // ダウンロードした地図データのパス
        onReady={handleReady}
      /> */}
    </Viewer>
  );
}

export default App;
