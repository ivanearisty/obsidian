"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DataPoint, RateGraphProps } from "@/types/types";

const RateGraph: React.FC<RateGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

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
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) ?? 1])
      .range([height - margin.bottom, margin.top]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Create the path generator
    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveLinear); // Adjust curve type as needed

    // Draw the path
    const path = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#CBD4C2") // Secondary color
      .attr("stroke-width", 2)
      .attr("d", lineGenerator(data)); // Generate the line with the full dataset

    // Animate the line
    const totalLength = path.node()?.getTotalLength() || 0;

    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(data.length * 200) // 200ms per point
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Animate points appearing
    data.forEach((point, index) => {
      setTimeout(() => {
        svg
          .append("circle")
          .attr("cx", xScale(point.x))
          .attr("cy", yScale(point.y))
          .attr("r", 6)
          .attr("fill", "#CF8E80") // Accent color
          .attr("opacity", 0)
          .transition()
          .duration(200)
          .attr("opacity", 1);
      }, index * 400);
    });

    return () => {
      // Cleanup the SVG
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default RateGraph;
