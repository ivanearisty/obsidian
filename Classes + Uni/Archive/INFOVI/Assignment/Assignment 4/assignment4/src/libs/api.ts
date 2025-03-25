import * as d3 from "d3";
import { Dataset } from "@/types/types";
import theme from "@/types/themes";

export async function loadRatesData(): Promise<Dataset[]> {
  const data = await d3.csv("/rates.csv", d3.autoType); 
  console.log(data); 

  return [
    {
      label: "Total Population",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Total Population"] })), 
      color: "#d4c2d4", 
    },
    {
      label: "Male",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Male"] })),
      color: "#cbd4c2", 
    },
    {
      label: "Female",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Female"] })), 
      color: "#c2c2d4", 
    },
  ];
}
