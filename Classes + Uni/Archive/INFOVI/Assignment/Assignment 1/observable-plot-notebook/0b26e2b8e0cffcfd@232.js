function _1(md){return(
md`# Plot Scatterplot

Using [Plot.dot](https://observablehq.com/@observablehq/plot-dot).`
)}

function _data(FileAttachment){return(
FileAttachment("penguins.csv").csv({typed: true})
)}

function _3(Plot,data){return(
Plot.plot({
  inset: 8,
  grid: true,
  color: {
    legend: true,
  },
  marks: [
    Plot.dot(data, {x: "flipper_length_mm", y: "body_mass_g", stroke: "sex"})
  ]
})
)}

function _data2(FileAttachment){return(
FileAttachment("climate.csv").csv({typed: true})
)}

function _filteredData(data2){return(
data2.filter(d => d.avgtemp >= 68 && d.avgtemp <= 80)
)}

function _6(Plot,data2){return(
Plot.plot({
  color: {
    legend: true,
  },
  marks: [
    Plot.dot(data2, { 
      x: "sunshine", 
      y: "avgtemp", 
      stroke: "city", 
    }),
  ],
  y: {
    label: "Average Temperature (°F)"
  },
  x: {
    label: "Total Sunshine Hours"
  }
})
)}

function _7(Plot,data2){return(
Plot.plot({
  color: {
    legend: true,
  },
  marks: [
    Plot.dot(data2, { 
      x: "sunshine", 
      y: "avgtemp", 
      stroke: "city", 
    }),

    Plot.ruleY([68, 80], { 
      stroke: "black", 
      strokeWidth: 1, 
      strokeDasharray: "4 4" 
    }), 

    Plot.rectY(
      [ {y1: 68, y2: 80} ], 
      { 
        y1: "y1", 
        y2: "y2", 
        fill: "#d3d3d3", 
        opacity: 0.3    
      }
    ),
  ],
  y: {
    label: "Average Temperature (°F)"
  },
  x: {
    label: "Total Sunshine Hours"
  }
})
)}

function _8(Plot,data2){return(
Plot.plot({
  color: {
    legend: true,
  },
  
  marks: [
    Plot.lineY(data2, { 
      x: "monthnum", 
      y: "avgtemp", 
      stroke: "city",
    }),

    Plot.ruleY([68, 80], { 
      stroke: "black", 
      strokeWidth: 1, 
      strokeDasharray: "4 4" 
    }), 

    Plot.rectY(
      [ {y1: 68, y2: 80} ], 
      { 
        y1: "y1", 
        y2: "y2", 
        fill: "#d3d3d3", 
        opacity: 0.3    
      }
    ),
  ],
  y: {
    label: "Average Temperature (°F)",
    grid: true
  },
  x: {
    label: "Month",
    tickFormat: d => data2.find(m => m.monthnum === d)?.month
  }
})
)}

function _filteredData2(data2){return(
data2.map(d => ({
  ...d,
  sunshine: d.avgtemp >= 68 && d.avgtemp <= 80 ? d.sunshine : null
}))
)}

function _10(Plot,filteredData2,filteredData){return(
Plot.plot({
  color: {
    legend: true,
  },
  
  marks: [
    Plot.line(filteredData2, { 
      x: "monthnum", 
      y: "sunshine", 
      stroke: "city",
    }),

    Plot.ruleY([68, 80], { 
      stroke: "black", 
      strokeWidth: 1, 
      strokeDasharray: "4 4" 
    }), 
  ],
  y: {
    label: "Sunshine hours",
    grid: true
  },
  x: {
    label: "Month",
    tickFormat: d => filteredData.find(m => m.monthnum === d)?.month
  }
})
)}

function _filteredData3(data2){return(
data2.filter(d => d.avgtemp >= 68 && d.avgtemp <= 80)
)}

function _12(Plot,filteredData3,d3){return(
Plot.plot({
  color: {
    legend: true,
  },
  
  marks: [
    Plot.dot(filteredData3, { 
      x: "monthnum", 
      y: "sunshine",  
      r: "avgtemp",
      stroke: "city", 
      fill: "city",  
    })
  ],
  r: {
    domain: [d3.min(filteredData3, d => d.avgtemp), d3.max(filteredData3, d => d.avgtemp)],
    range: [5, 12] 
  },
  y: {
    label: "Sunshine Hours",
    grid: true,
    domain: [200, 320]
  },
  x: {
    label: "Month",
    tickFormat: d => filteredData3.find(m => m.monthnum === d)?.month 
  }
})
)}

function _13(Plot,filteredData3,d3){return(
Plot.plot({
  color: {
    legend: true,
    scheme: "Set2"
  },
  
  title: "Selected City Monthly Sunshine Hours within the 68 to 80°F Range",
  
  marginLeft: 50,
  marginRight: 50,
  marginTop: 50,
  marginBottom: 80, 
  
  marks: [
    Plot.dot(filteredData3, { 
      x: "monthnum", 
      y: "sunshine",  
      r: "avgtemp",
      stroke: "gray", 
      fill: "city",  
    }),
    Plot.text([{
      x: 6, 
      y: 180,
      text: "Bubble size represents higher temperatures within the range (68 to 80°F)."
    }], {
      x: "x",
      y: "y",
      text: "text",
      textAnchor: "middle" 
    })
  ],
  
  r: {
    domain: [d3.min(filteredData3, d => d.avgtemp), d3.max(filteredData3, d => d.avgtemp)],
    range: [4, 13] 
  },
  y: {
    label: "Sunshine Hours",
    grid: true,
    domain: [200, 320],
  },
  x: {
    label: "Month",
    tickFormat: d => filteredData3.find(m => m.monthnum === d)?.month,
    ticks: filteredData3.map(d => d.monthnum),
    inset: 20
  },
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["penguins.csv", {url: new URL("./files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["climate.csv", {url: new URL("./files/fb87369d2bdd43d771580b64d5fdc5591fe35e2644376afe4d2a4845edc4b5084b47c06c6ef9b9a13132700f4ab10ac42ef628c99d09ce31707437ebdf6ac539.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["Plot","data"], _3);
  main.variable(observer("data2")).define("data2", ["FileAttachment"], _data2);
  main.variable(observer("filteredData")).define("filteredData", ["data2"], _filteredData);
  main.variable(observer()).define(["Plot","data2"], _6);
  main.variable(observer()).define(["Plot","data2"], _7);
  main.variable(observer()).define(["Plot","data2"], _8);
  main.variable(observer("filteredData2")).define("filteredData2", ["data2"], _filteredData2);
  main.variable(observer()).define(["Plot","filteredData2","filteredData"], _10);
  main.variable(observer("filteredData3")).define("filteredData3", ["data2"], _filteredData3);
  main.variable(observer()).define(["Plot","filteredData3","d3"], _12);
  main.variable(observer()).define(["Plot","filteredData3","d3"], _13);
  return main;
}
