import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function formatMetric(metric) {
  let words = metric.split("_");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

export default function Graph({ data, metric, width = 960, height = 600 }) {
  const svgRef = useRef();

  useEffect(() => {
    // Clear existing graph
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Margins
    const margin = { top: 60, right: 60, bottom: 60, left: 90 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.patch))
      .range([0, chartWidth]);

    const yExtent = d3.extent(data, (d) => d.value);
    const padding = (yExtent[1] - yExtent[0]) * 0.05;

    const y = d3
      .scaleLinear()
      .domain(
        metric === "rank"
          ? [yExtent[1] + padding, yExtent[0] - padding]
          : [yExtent[0] - padding, yExtent[1] + padding]
      )
      .nice()
      .range([chartHeight, 0]);

    // Draw Line
    const line = d3
      .line()
      .x((d) => x(d.patch))
      .y((d) => y(d.value));

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px");

    // Draw Circles
    chartGroup
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.patch))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(100).attr("r", 8);
        tooltip
          .style("visibility", "visible")
          .text(`Value: ${d.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(100).attr("r", 5);
        tooltip.style("visibility", "hidden");
      });

    // Draw x-axis
    const xAxis = d3.axisBottom(x).tickSize(-chartHeight).tickPadding(10);

    chartGroup
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "14px");

    // Draw y-axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(6)
      .tickSize(-chartWidth)
      .tickPadding(10)
      .tickFormat(metric.includes("rate") ? (d) => `${d}%` : null);;

    chartGroup.append("g").call(yAxis).style("font-size", "14px");

    // Draw Labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 20)
      .attr("y", height)
      .text("Patch ->");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 0)
      .attr("x", 0)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(formatMetric(metric) + " ->");

    svg.selectAll(".tick line").attr("stroke", "#ddd");
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
}
