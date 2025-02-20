import React from "react";
import { GraphicWalker, IMutField, IChart } from "@kanaries/graphic-walker";

console.log("✅ YourEmbeddingApp Loaded!");


interface YourEmbeddingAppProps {
    data: any[];
    fields: IMutField[];
    chart: IChart[]; // ✅ 올바른 타입 설정
}

const YourEmbeddingApp: React.FC<YourEmbeddingAppProps> = ({ data, fields, chart }) => {
    return (
        <GraphicWalker
            data={data}
            fields={fields}
            chart={chart}
            i18nLang="en"
        />
    );
};

export default YourEmbeddingApp;
