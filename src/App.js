"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const XLSX = __importStar(require("xlsx"));
const YourEmbeddingApp_1 = __importDefault(require("./YourEmbeddingApp"));
const config = {
    defaultAggregated: true,
    geoms: ["bar"],
    limit: 1000
};
const layout = {
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
const fields = [
    { fid: "Date", name: "Date", semanticType: "temporal", analyticType: "dimension" },
    { fid: "Category", name: "Category", semanticType: "nominal", analyticType: "dimension" },
    { fid: "Value", name: "Value", semanticType: "quantitative", analyticType: "measure" }
];
const encodings = {
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
    color: [], // Color (Category)
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
const graphicWalkerSpec = [
    {
        visId: "bar_chart_1",
        name: "Custom Chart",
        encodings: encodings,
        config: config,
        layout: layout
    }
];
const App = () => {
    const [data, setData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filePath = "/financial_statistics.csv";
                const response = yield fetch(filePath);
                const arrayBuffer = yield response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                if (!sheetName) {
                    console.error("❌ 엑셀 파일에 시트가 없습니다.");
                    setData([]);
                    return;
                }
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                if (!jsonData || jsonData.length === 0) {
                    console.error("❌ 엑셀 데이터를 변환했지만 비어 있습니다.");
                    setData([]);
                    return;
                }
                // 엑셀 날짜 변환: 엑셀 날짜는 1900년 1월 1일부터의 일수로 저장됨
                jsonData.forEach((row) => {
                    if (row.Date) {
                        const excelDate = row.Date;
                        const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
                        row.Date = jsDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식으로 변환
                    }
                });
                console.log("✅ 엑셀 데이터 로드됨:", jsonData);
                setData(jsonData);
            }
            catch (error) {
                console.error("❌ 데이터 불러오는 중 오류 발생:", error);
                setData([]);
            }
        });
        fetchData();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Graphic Walker Chart" }), data.length > 0 ? ((0, jsx_runtime_1.jsx)(YourEmbeddingApp_1.default, { data: data, fields: fields, chart: graphicWalkerSpec })) : ((0, jsx_runtime_1.jsx)("p", { children: "Loading data..." }))] }));
};
exports.default = App;
