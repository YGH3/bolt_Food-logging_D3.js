import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { FoodEntry } from '../types';

interface BubbleChartProps {
  data: FoodEntry[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;

    svg.attr('width', width).attr('height', height);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(['sweet', 'salty', 'sour', 'bitter', 'umami'])
      .range(['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7']);

    const sizeScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.weight) || 0])
      .range([10, 50]);

    const gravityScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0.01, 0.1]);

    const simulation = d3.forceSimulation(data)
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(d => gravityScale(d.elasticity)))
      .force('collide', d3.forceCollide<FoodEntry>(d => sizeScale(d.weight) + 2));

    const bubbles = svg.selectAll('.bubble')
      .data(data)
      .join('circle')
      .attr('class', 'bubble')
      .attr('r', d => sizeScale(d.weight))
      .attr('fill', d => colorScale(d.taste))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    const labels = svg.selectAll('.label')
      .data(data)
      .join('text')
      .attr('class', 'label')
      .text(d => d.name)
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('fill', '#333');

    simulation.on('tick', () => {
      bubbles
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      labels
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

  }, [data]);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
};

export default BubbleChart;