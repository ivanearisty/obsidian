import * as d3 from "d3";
import { Dataset } from "@/types/types";

export async function loadRatesData(): Promise<Dataset[]> {
  const data = await d3.csv("/rates.csv", d3.autoType); 
  console.log(data); 

  return [
    {
      label: "Total Population",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Total Population"] })), 
      color: "#50514F", 
    },
    {
      label: "Male",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Male"] })),
      color: "#CF8E80", 
    },
    {
      label: "Female",
      data: data.map((d: any) => ({ x: d["Year"], y: d["Female"] })), 
      color: "#CBD4C2", 
    },
  ];
}
