import React, { useState, useEffect } from "react";
import YourEmbeddingApp from "./YourEmbeddingApp";
import { IMutField, IChart, IVisualConfigNew, DraggableFieldState, IVisualLayout } from "@kanaries/graphic-walker";

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
    { fid: "Date", name: "Date", semanticType: "temporal", analyticType: "dimension" },
    { fid: "Category", name: "Category", semanticType: "nominal", analyticType: "dimension" },
    { fid: "Value", name: "Value", semanticType: "quantitative", analyticType: "measure" }
];


const encodings: DraggableFieldState = {
    dimensions: [
        { fid: "Date", name: "Date", semanticType: "temporal", analyticType: "dimension" },
        { fid: "Category", name: "Category", semanticType: "nominal", analyticType: "dimension" }
    ],
    measures: [{ fid: "Value", name: "Value", semanticType: "quantitative", analyticType: "measure" }],
    rows: [
        { fid: "Value", name: "Value", semanticType: "quantitative", analyticType: "measure", aggName: "sum" }
    ], // Y-Axis (sum of Value)
    columns: [
        { fid: "Date", name: "Date", semanticType: "temporal", analyticType: "dimension" }
    ], // X-Axis (Date)
    color: [
    ], // Color (Category)
    size: [],
    shape: [],
    opacity: [],
    details: [],
    theta: [],
    radius: [],
    longitude: [],
    latitude: [],
    geoId: [],
    filters: [],
    text: []
};


const graphicWalkerSpec: IChart[] = [
    {
        visId: "chart",
        name: "Custom Chart",
        encodings: encodings,
        config: config,
        layout: layout
    }
];

const App: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filePath = "/financial_statistics.json";
                const response = await fetch(filePath);

                // ✅ JSON 데이터 로딩 (엑셀 처리 부분 제거)
                const jsonData = await response.json(); // JSON 파싱

                if (!Array.isArray(jsonData) || jsonData.length === 0) {
                    console.error("❌ JSON 데이터가 비어 있거나 올바르지 않습니다.");
                    setData([]);
                    return;
                }

                // ✅ JSON 날짜 필드 변환 (엑셀 변환 코드 제거)
                const processedData = jsonData.map((row: any) => {
                    if (row.Date) {
                        return {
                            ...row,
                            Date: new Date(row.Date).toISOString().split("T")[0] // "YYYY-MM-DD" 형식 변환
                        };
                    }
                    return row;
                });

                console.log("✅ JSON 데이터 로드됨:", processedData);
                setData(processedData);
            } catch (error) {
                console.error("❌ 데이터 불러오는 중 오류 발생:", error);
                setData([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Graphic Walker Chart</h1>
            {data.length > 0 ? (
                <YourEmbeddingApp data={data} fields={fields} chart={graphicWalkerSpec} />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default App;
