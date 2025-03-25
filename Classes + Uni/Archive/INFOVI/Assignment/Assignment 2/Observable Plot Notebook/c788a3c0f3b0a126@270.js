function _1(md){return(
md`# Assignment 2: Information Visualization
## Earnest Visualization
### Visualizing Real vs Nominal Figures`
)}

function _averageSalePriceHousesSold(FileAttachment){return(
FileAttachment("Average Sales Price of Houses Sold.csv").csv({typed: true})
)}

function _consumerPriceIndex(FileAttachment){return(
FileAttachment("Consumer Price Index for All Urban Consumers (All Items in U.S. City Average).csv").csv({typed: true})
)}

function _meanFamilyIncome(FileAttachment){return(
FileAttachment("Mean Family Income.csv").csv({typed: true})
)}

function _housingAffordabilityIndex(FileAttachment){return(
FileAttachment("Housing Affordability Index.csv").csv({typed: true})
)}

function _incomeBeforeTaxes25to34(FileAttachment){return(
FileAttachment("Income Before Taxes (Wages and Salaries) by Age (from Age 25 to 34).csv").csv({typed: true})
)}

function _medianHouseHoldIncome(FileAttachment){return(
FileAttachment("Median Household Income.csv").csv({typed: true})
)}

function _medianSalePriceHouses(FileAttachment){return(
FileAttachment("Median Sales Price of Houses Sold.csv").csv({typed: true})
)}

function _personalConsumption(FileAttachment){return(
FileAttachment("Personal Consumption Expenditures.csv").csv({typed: true})
)}

function _personalConsumptionExclFE(FileAttachment){return(
FileAttachment("Personal consumption expenditures excluding food and energy.csv").csv({typed: true})
)}

function _realMedianHouseholdIncome(FileAttachment){return(
FileAttachment("Real Median Household Income.csv").csv({typed: true})
)}

function _realPersonalConsumption(FileAttachment){return(
FileAttachment("Real Personal Consumption Expenditures.csv")
)}

function _realResidentialPropertyPrice(FileAttachment){return(
FileAttachment("Real Residential Property Prices.csv").csv({typed: true})
)}

function _14(Plot,meanFamilyIncome,medianHouseHoldIncome,realMedianHouseholdIncome){return(
Plot.plot({
  
  width: 800,
  height: 400,
  marginLeft: 60,

  color: {
    type: "categorical", 
    domain: ["Mean Family Income", "Median Household Income", "Real Median Household Income"],
    range: ["#32a897", "#3c689d", "#6f8cb7"],
    legend: true 
  },

  marks: [
    Plot.line(meanFamilyIncome.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MAFAINUSA646N",
      stroke: "#32a897",
      strokeWidth: 3,

    }),
    Plot.line(medianHouseHoldIncome.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MEHOINUSA646N",
      stroke: "#3c689d",
      strokeWidth: 3
    }),
    Plot.line(realMedianHouseholdIncome.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MEHOINUSA672N",
      stroke: "#6f8cb7",
      strokeWidth: 3
    }),
  ],
  
  x: {
    label: "Year",
    type: "time",
    domain: [new Date(1984, 0, 1), new Date()],
    grid: true,
    gridColor: "#d3d3d3"
  },
  y: {
    label: "Income (in USD)",
    domain: [0, 150000],
    grid: true,
    gridColor: "#d3d3d3"
  }
    
})
)}

function _15(Plot,realMedianHouseholdIncome,medianSalePriceHouses){return(
Plot.plot({
  
  width: 800,
  height: 400,
  marginLeft: 60,

  color: {
    type: "categorical", 
    domain: ["Median Sale Price Houses", "Real Median Household Income"],
    range: ["#32a897", "#6f8cb7",],
    legend: true 
  },

  marks: [
    Plot.line(realMedianHouseholdIncome.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MEHOINUSA672N",
      stroke: "#6f8cb7",
      strokeWidth: 3
    }),
    Plot.line(medianSalePriceHouses.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MSPUS",
      stroke: "#32a897",
      strokeWidth: 3
    }),
  ],
  
  x: {
    label: "Year",
    type: "time",
    domain: [new Date(1984, 0, 1), new Date()],
    grid: true,
    gridColor: "#d3d3d3"
  },
  y: {
    label: "Income (in USD)",
    domain: [0, 500000],
    grid: true,
    gridColor: "#d3d3d3"
  }
    
})
)}

function _16(Plot,medianHouseHoldIncome,medianSalePriceHouses){return(
Plot.plot({
  
  width: 800,
  height: 400,
  marginLeft: 60,

  color: {
    type: "categorical", 
    domain: ["Median Sale Price Houses", "Median Household Income"],
    range: ["#32a897", "#6f8cb7",],
    legend: true 
  },

  marks: [
    Plot.line(medianHouseHoldIncome.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MEHOINUSA646N",
      stroke: "#6f8cb7",
      strokeWidth: 3,
      normalize: {
          from: new Date(1983, 7, 1),
          to: new Date()
        }
    }),
    Plot.line(medianSalePriceHouses.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MSPUS",
      stroke: "#32a897",
      strokeWidth: 3,
      normalize: {
          from: new Date(1983, 7, 1),
          to: new Date()
        }
    }),
  ],
  
  x: {
    label: "Year",
    type: "time",
    domain: [new Date(1983, 0, 1), new Date()],
    grid: true,
    gridColor: "#d3d3d3"
  },
  y: {
    label: "Income (in USD)",
    domain: [0, 500000],
    grid: true,
    gridColor: "#d3d3d3"
  }
    
})
)}

function _MHSADJ(FileAttachment){return(
FileAttachment("Median Household Income Inflation Adjusted Ref2000@2.csv").csv({typed: true})
)}

function _MPHSADJ(FileAttachment){return(
FileAttachment("Median Prices of Houses Sold Adjusted Ref2000pt2.csv").csv({typed: true})
)}

function _19(Plot,MPHSADJ,MHSADJ){return(
Plot.plot({
  title: "Real Median Home Sale Price vs Real Median Household Income: US (January 1st 2000 as reference year)",
  width: 800,
  height: 400,
  marginLeft: 60,

  color: {
    type: "categorical", 
    domain: ["Median Sale Price Houses", "Median Household Income"],
    range: ["#32a897", "#6f8cb7",],
    legend: true 
  },

  marks: [

    Plot.rectX(
      [
        {x1: new Date(2001, 2, 1), x2: new Date(2001, 10, 1)},
        {x1: new Date(2007, 11, 1), x2: new Date(2009, 6, 1)},
        {x1: new Date(2020, 2, 1), x2: new Date(2020, 5, 1)},
      ],
      {
        x1: "x1", 
        x2: "x2", 
        fill: "gray",
        opacity: 0.3
      }
    ),
    
    Plot.line(MPHSADJ.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "VAL",
      stroke: "#6f8cb7",
      strokeWidth: 3,
      normalize: {
          from: new Date(1983, 7, 1),
          to: new Date()
        }
    }),
    Plot.line(MHSADJ.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "VAL",
      stroke: "#32a897",
      strokeWidth: 3,
      normalize: {
          from: new Date(1983, 7, 1),
          to: new Date()
        }
    }),
  ],
  
  x: {
    label: "Year",
    type: "time",
    domain: [new Date(1983, 0, 1), new Date()],
    grid: true,
    gridColor: "#d3d3d3"
  },
  y: {
    label: "Income (in USD)",
    domain: [0, 500000],
    grid: true,
    gridColor: "#d3d3d3"
  }
    
})
)}

function _20(Plot,meanFamilyIncome,MPHSADJ,personalConsumptionExclFE){return(
Plot.plot({
  title: "Home Prices vs Household Income",
  width: 800,
  height: 400,
  marginLeft: 60,

  color: {
    type: "categorical", 
    domain: ["Sale Price Houses", "Household Income"],
    range: ["#32a897", "#6f8cb7",],
    legend: true 
  },

  marks: [
    Plot.line(meanFamilyIncome.filter(d => new Date(d.DATE) >= new Date(1984, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "MAFAINUSA646N",
      stroke: "#32a897",
      strokeWidth: 3,

    }),
    Plot.line(MPHSADJ.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x: d => new Date(d.DATE),
      y: "VAL",
      stroke: "#6f8cb7",
      strokeWidth: 3,
    }),
    Plot.rectY(personalConsumptionExclFE.filter(d => new Date(d.DATE) >= new Date(1983, 0, 1)), {
      x1: d => new Date(d.DATE),
      x2: d => Math.min(new Date(d.DATE).setMonth(new Date(d.DATE).getMonth() + 1), new Date()),
      y2: d => d.DPCCRC1M027SBEA * 20,
      fill: "orange", 
      opacity: 0.3
    })
  ],
  
  x: {
    label: "Year",
    type: "time",
    domain: [new Date(1983, 0, 1), new Date()],
    grid: true,
    gridColor: "#d3d3d3"
  },
  y: {
    label: "Income (in USD)",
    domain: [0, 500000],
    grid: true,
    gridColor: "#d3d3d3"
  }
    
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Real Personal Consumption Expenditures.csv", {url: new URL("./files/6f3613ce47e54287667531b36c313ef4e30c13deb1ed7ccb4035c3c68779200d627e0c8e7a3fe685b4bcc490f2ca9e7f45af3709d4be56c9bb51f19a73ea41ee.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Income Before Taxes (Wages and Salaries) by Age (from Age 25 to 34).csv", {url: new URL("./files/cab00676f8c4776fdc12c60e9451afe5fc8ba9e1cc28d3c9f312ec9d8c69a424391ac7839c1fa286033f3cfc873dc8977519a42e30a93b6dbb68097ecd93b1d2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Personal Consumption Expenditures.csv", {url: new URL("./files/58e99043e68a3e675d141d8950974b9d61d9867aacb8ff9d1274260e02397d3f162c1fec5b555452be37ec7dc9476942b207c6122426dad8b8f8892bb06d59d3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Consumer Price Index for All Urban Consumers (All Items in U.S. City Average).csv", {url: new URL("./files/583e73104c599876592eb210d2e31dd22fdc8820d87550912385ffbd1e53d20889c18fe74d381b883816f7db7f79713715f7f98ac2c441b7ec414c571d24f1b9.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Personal consumption expenditures excluding food and energy.csv", {url: new URL("./files/57a7dccdd4f5b244e11e9e6452567cefe35ea2a67b5395a8473cd2bcfa941e44bbef2518bf3dae3311f436efb5b5702b81ce85951754378021e5b0d006146c61.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Housing Affordability Index.csv", {url: new URL("./files/a219c87578c86a0a0def9a0b75a074ddc7cd6c08c70b14aadf19a8971035df0eaab5629a10cac07e1c9462faf7023ad4d03c684ce984b4cd9db0bff60ba2b2c3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Real Median Household Income.csv", {url: new URL("./files/aa597ecc640dec7f6ee40834d098d8eb51deae04048065ed6cca3c89fe9550e9554c1e26900454f60e9e8f7a23a54dfb2e3d6296e2dbbb4f66180c5ec9bcdacf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Real Residential Property Prices.csv", {url: new URL("./files/b8a0ba12d938a5dd9b528454bf586ed5ff567630d4e19050a6bc027422ca53e6b839cf3bfe2a356e8a41ad94cdb63e118cd332ab60d6dddcd35cd3e176628819.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Median Sales Price of Houses Sold.csv", {url: new URL("./files/fa8945da5251c995a03d6620bdacb13bc42a69ab9708d2a0c86d4194f6e0d0ec578f032ad4e380a6c1c4ccec650f1095fd910734130e19017848c2f31199c2ff.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Median Household Income.csv", {url: new URL("./files/6ac2e8ab443238da4ad01fe24864d7e3910e13aa5941440b527bf85cda6adada884c38ba8ea9ba29512b5aa8d7d4ec943c70ad67ea4f1b9e0566e36b238c77f1.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Mean Family Income.csv", {url: new URL("./files/482a4804682a6a619e89cee41faf53366cf2a86fe9b3671e6cbdc9f9dec482f15940baf587f092ba277ebddd0ef7f2c7b3c328efc8fb668da9c9f81ff6c55741.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Average Sales Price of Houses Sold.csv", {url: new URL("./files/1e79cc89e66f4d6fbcc7bd16abac3197ba5a739f0318f3b7bef97064d47679ae7917382396877ef23106bb411077c2a5f122dc309d899ec690f206e263faf367.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Median Household Income Inflation Adjusted Ref2000@2.csv", {url: new URL("./files/e76db18434c59a6bb36e6ed63a4b399241248d1a7fef454e31b74ca7056d1b582dbe5b9b8ef7ed5c0ed99de34dba0484522a5fd6e6ea4c3f8109d62f2cce704a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Median Prices of Houses Sold Adjusted Ref2000pt2.csv", {url: new URL("./files/7699150107fb56a7d44d17a749ebfc95fd2fe083ddbc9b919494ebb4f5986ee73eb4b98e13a6e7ce0107989d02c55f371cd6616303a44c1eb9796ab04aebc4d7.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("averageSalePriceHousesSold")).define("averageSalePriceHousesSold", ["FileAttachment"], _averageSalePriceHousesSold);
  main.variable(observer("consumerPriceIndex")).define("consumerPriceIndex", ["FileAttachment"], _consumerPriceIndex);
  main.variable(observer("meanFamilyIncome")).define("meanFamilyIncome", ["FileAttachment"], _meanFamilyIncome);
  main.variable(observer("housingAffordabilityIndex")).define("housingAffordabilityIndex", ["FileAttachment"], _housingAffordabilityIndex);
  main.variable(observer("incomeBeforeTaxes25to34")).define("incomeBeforeTaxes25to34", ["FileAttachment"], _incomeBeforeTaxes25to34);
  main.variable(observer("medianHouseHoldIncome")).define("medianHouseHoldIncome", ["FileAttachment"], _medianHouseHoldIncome);
  main.variable(observer("medianSalePriceHouses")).define("medianSalePriceHouses", ["FileAttachment"], _medianSalePriceHouses);
  main.variable(observer("personalConsumption")).define("personalConsumption", ["FileAttachment"], _personalConsumption);
  main.variable(observer("personalConsumptionExclFE")).define("personalConsumptionExclFE", ["FileAttachment"], _personalConsumptionExclFE);
  main.variable(observer("realMedianHouseholdIncome")).define("realMedianHouseholdIncome", ["FileAttachment"], _realMedianHouseholdIncome);
  main.variable(observer("realPersonalConsumption")).define("realPersonalConsumption", ["FileAttachment"], _realPersonalConsumption);
  main.variable(observer("realResidentialPropertyPrice")).define("realResidentialPropertyPrice", ["FileAttachment"], _realResidentialPropertyPrice);
  main.variable(observer()).define(["Plot","meanFamilyIncome","medianHouseHoldIncome","realMedianHouseholdIncome"], _14);
  main.variable(observer()).define(["Plot","realMedianHouseholdIncome","medianSalePriceHouses"], _15);
  main.variable(observer()).define(["Plot","medianHouseHoldIncome","medianSalePriceHouses"], _16);
  main.variable(observer("MHSADJ")).define("MHSADJ", ["FileAttachment"], _MHSADJ);
  main.variable(observer("MPHSADJ")).define("MPHSADJ", ["FileAttachment"], _MPHSADJ);
  main.variable(observer()).define(["Plot","MPHSADJ","MHSADJ"], _19);
  main.variable(observer()).define(["Plot","meanFamilyIncome","MPHSADJ","personalConsumptionExclFE"], _20);
  return main;
}
