var dataset

const svg = d3.select('svg')
  .attr('width', w)
  .attr('height', h)

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', d => d[0])
  .attr('cy', d => d[1])
  .attr('r', 5)
