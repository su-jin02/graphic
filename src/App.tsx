import React from "react";
import YourEmbeddingApp from "./YourEmbeddingApp";
import { IMutField, IChart, IVisualConfigNew, DraggableFieldState, IVisualLayout  } from "@kanaries/graphic-walker"; // ✅ 추가됨

console.log("✅ App.tsx Loaded!");


console.log("YourEmbeddingApp Loaded:", YourEmbeddingApp);

const data = [
    { category: "A", value: 10 },
    { category: "B", value: 20 },
    { category: "C", value: 15 },
];

const config: IVisualConfigNew = {
    defaultAggregated: true,
    geoms: ["bar"],
    limit: 1000
};

const layout: IVisualLayout = {
    showTableSummary: false, // 테이블 요약 표시 여부
    format: {
        numberFormat: ".2f",
        timeFormat: "%Y-%m-%d",
        normalizedNumberFormat: ".2%"
    },
    primaryColor: "#3498db", // 기본 색상
    colorPalette: "default", // 색상 팔레트
    scale: {}, // 기본 스케일 설정
    resolve: {
        x: true,
        y: true,
        color: true,
        opacity: true,
        shape: true,
        size: true
    },
    size: {
        mode: "fixed",
        width: 800,
        height: 600
    },
    useSvg: false,
    geojson: undefined, // 지도 데이터 없음
    geoKey: undefined,
    geoUrl: undefined,
    geoMapTileUrl: undefined,
    interactiveScale: true,
    stack: "zero",
    showActions: true,
    zeroScale: false,
    background: "#ffffff",
    scaleIncludeUnmatchedChoropleth: false,
    showAllGeoshapeInChoropleth: false
};


// ✅ fields를 IMutField[]로 변경
const fields: IMutField[] = [
    {
        fid: "category",
        name: "category",
        semanticType: "nominal",
        analyticType: "dimension",
    },
    {
        fid: "value",
        name: "value",
        semanticType: "quantitative",
        analyticType: "measure",
    }
];

// ✅ encodings 타입 수정 (DraggableFieldState 적용)
const encodings: DraggableFieldState = {
    dimensions: [{ fid: "category", name: "category", semanticType: "nominal", analyticType: "dimension" }],
    measures: [{ fid: "value", name: "value", semanticType: "quantitative", analyticType: "measure" }],
    rows: [],
    columns: [],
    color: [],
    size: [],
    shape: [],
    opacity: [],
    details: [],
    theta: [],
    radius: [],
    longitude: [],
    latitude: [],
	geoId : [],
	filters : [],
	text : []
};

// ✅ chart를 IChart[]로 변경
const graphicWalkerSpec: IChart[] = [
    {
        visId: "bar_chart_1",
        name: "Custom Chart",
        encodings: encodings, // ✅ 수정된 encodings 적용
        config: config,
        layout: layout 
    }
];

const App: React.FC = () => {
    return (
        <div>
            <h1>Graphic Walker Chart</h1>
            <YourEmbeddingApp data={data} fields={fields} chart={graphicWalkerSpec} />
        </div>
    );
};

export default App;
