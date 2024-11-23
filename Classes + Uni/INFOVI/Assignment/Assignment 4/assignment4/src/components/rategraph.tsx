"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DataPoint, RateGraphProps } from "@/types/types";

const RateGraph: React.FC<RateGraphProps> = ({ datasets }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  var delay = 300;

  useEffect(() => {
    if (!datasets || datasets.length === 0) return;

    // Define chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

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
      .range([margin.left, width - margin.right]);

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
      // Line generator for the dataset
      const lineGenerator = d3
        .line<DataPoint>()
        .x((d: any) => xScale(d.x))
        .y((d: any) => yScale(d.y))
        .curve(d3.curveLinear);

      // Draw the path
      const path = svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("d", lineGenerator(data)); // Generate the line with the full dataset

      const totalLength = path.node()?.getTotalLength() || 0;

      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(data.length * delay + datasetIndex * 100)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      // Animate points appearing
      data.forEach((point, index) => {
        console.log(point);
        setTimeout(() => {
          svg
            .append("circle")
            .attr("cx", xScale(point.x))
            .attr("cy", yScale(point.y))
            .attr("r", 4)
            .attr("fill", color)
            .on("mouseover", function (event) {
              tooltip.style("display", null);
              tooltipText.text(`Year: ${point.x}, Value: ${point.y}`);
            })
            .on("mousemove", function (event) {
              tooltip.attr(
                "transform",
                `translate(${
                  event.pageX -
                  chartRef.current?.getBoundingClientRect().left +
                  10
                }, ${
                  event.pageY -
                  chartRef.current?.getBoundingClientRect().top -
                  30
                })`
              );
            })
            .on("mouseout", function () {
              tooltip.style("display", "none");
            });
        }, datasetIndex * 100 + index * delay);
      });

      // Add Legend
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

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
    });
    return () => {
      // Cleanup the SVG
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [datasets]);

  return <div ref={chartRef}></div>;
};

export default RateGraph;
