import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { FoodEntry } from '../types';

interface ElasticityPieChartProps {
  data: FoodEntry[];
}

const ElasticityPieChart: React.FC<ElasticityPieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const elasticityGroups = d3.group(data, d => Math.floor(d.elasticity / 20));
    const pieData = Array.from(elasticityGroups, ([key, value]) => ({ key, value: value.length }));

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(['0', '1', '2', '3', '4'])
      .range(['#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD', '#F0E68C']);

    const arcs = g.selectAll('.arc')
      .data(pie(pieData))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', d => colorScale(d.data.key));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d as any)})`)
      .attr('dy', '.35em')
      .text(d => `${d.data.key * 20}-${(d.data.key * 20) + 19}`);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ElasticityPieChart;