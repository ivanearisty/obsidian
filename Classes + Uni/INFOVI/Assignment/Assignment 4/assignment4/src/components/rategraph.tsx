"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DataPoint, RateGraphProps } from "@/types/types";

const RateGraph: React.FC<RateGraphProps> = ({ datasets }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const delay = 300;

  useEffect(() => {
    if (!datasets || datasets.length === 0) return;

    // Define chart dimensions with larger right margin
    const width = 700; // Adjust width if needed
    const height = 400;
    const margin = { top: 20, right: 150, bottom: 30, left: 40 }; // Increased right margin

    // Create the SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(datasets[0].data, (d) => d.x) as [number, number])
      .range([margin.left, width - margin.right]); // Adjusted for larger right margin

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          datasets.flatMap((dataset) => dataset.data),
          (d) => d.y
        ) ?? 1,
      ])
      .range([height - margin.bottom, margin.top]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.format("d")));

    const tooltip = svg.append("g").style("display", "none");

    tooltip
      .append("rect")
      .attr("width", 120)
      .attr("height", 50)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("opacity", 0.8);

    const tooltipText = tooltip
      .append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("font-size", "12px")
      .attr("fill", "black");

    // Create the path generator
    datasets.forEach(({ label, data, color }, datasetIndex) => {
      const lineGenerator = d3
        .line<DataPoint>()
        .x((d: any) => xScale(d.x))
        .y((d: any) => yScale(d.y))
        .curve(d3.curveLinear);

      const path = svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("d", lineGenerator(data));

      const totalLength = path.node()?.getTotalLength() || 0;

      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(data.length * delay + datasetIndex * 100)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      data.forEach((point, index) => {
        svg
          .append("circle")
          .attr("cx", xScale(point.x))
          .attr("cy", yScale(point.y))
          .attr("r", 4)
          .attr("fill", color)
          .on("mouseover", function () {
            tooltip.style("display", null);
            tooltipText.text(`Year: ${point.x}, Value: ${point.y}`);
          })
          .on("mousemove", function (event) {
            const [mouseX, mouseY] = d3.pointer(event, svg.node());
            tooltip.attr("transform", `translate(${mouseX + 10}, ${mouseY - 30})`);
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
          });
      });
    });

    // Add Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`); // Adjust legend position

    datasets.forEach(({ label, color }, index) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${index * 20})`);

      legendRow
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color)
        .attr("rx", 2);

      legendRow
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .style("font-size", "12px")
        .text(label);
    });

    return () => {
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [datasets]);

  return <div ref={chartRef}></div>;
};

export default RateGraph;