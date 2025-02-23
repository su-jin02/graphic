import React from "react";
import YourEmbeddingApp from "./YourEmbeddingApp";
import { IMutField, IChart, IVisualConfigNew, DraggableFieldState, IVisualLayout  } from "@kanaries/graphic-walker"; 

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


const encodings: DraggableFieldState = {
    dimensions: [{ fid: "category", name: "category", semanticType: "nominal", analyticType: "dimension" }],
    measures: [{ fid: "value", name: "value", semanticType: "quantitative", analyticType: "measure" }],
    rows: [{ fid: "value", name: "value", semanticType: "quantitative", analyticType: "measure" }], // Y-Axis (value)
    columns: [{ fid: "category", name: "category", semanticType: "nominal", analyticType: "dimension" }], // X-Axis (category
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


const graphicWalkerSpec: IChart[] = [
    {
        visId: "bar_chart_1",
        name: "Custom Chart",
        encodings: encodings, 
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
