import React from "react";
import { GraphicWalker, IMutField, IChart } from "@kanaries/graphic-walker";

interface YourEmbeddingAppProps {
    data?: any[];  
    fields?: IMutField[]; 
    chart?: IChart[]; 
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
