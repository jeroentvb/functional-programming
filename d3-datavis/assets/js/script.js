const dataset = [
  {
    'genre': 'western',
    'booksAmount': 268,
    'averagePages': 150
  },
  {
    'genre': 'spionage',
    'booksAmount': 64,
    'averagePages': 309
  },
  {
    'genre': 'homofiel-thema',
    'booksAmount': 86,
    'averagePages': 224
  },
  {
    'genre': 'humor',
    'booksAmount': 496,
    'averagePages': 258
  },
  {
    'genre': 'sport',
    'booksAmount': 830,
    'averagePages': 117
  },
  {
    'genre': 'detective',
    'booksAmount': 1989,
    'averagePages': 266
  },
  {
    'genre': 'science-fiction',
    'booksAmount': 4607,
    'averagePages': 302
  },
  {
    'genre': 'stripverhaal',
    'booksAmount': 6858,
    'averagePages': 87
  },
  {
    'genre': 'thriller',
    'booksAmount': 8857,
    'averagePages': 358
  }
]
dataset.x = 'Aantal boeken in een genre'
dataset.y = `Gemiddeld aantal pagina's per boek per genre`

const colors = ['#FF6633',
  '#FFB399',
  '#FF33FF',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF'
]

dataset.forEach((datapoint, index) => {
  datapoint.color = colors[index]
})

// const width = 500
const height = 600
const width = Math.round(d3.select('body').node().getBoundingClientRect().width) - 50
const margin = ({
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
})

var x = d3.scaleLinear()
  // Add the correct values to the xAxis
  // .domain(d3.extent(dataset, d => d.booksAmount)).nice()
  .domain([d3.min(dataset, d => d.booksAmount), d3.max(dataset, d => d.booksAmount + 2000)]).nice()
  // Put the xAxis in the right place using margin
  .range([margin.left, width - margin.right])

var y = d3.scaleLinear()
  // Add the correct values to the yAxis
  .domain([50, d3.max(dataset, d => d.averagePages)]).nice()
  // Put the yAxis in the right place using margin
  .range([height - margin.bottom, margin.top])

function xAxis (g) {
  g
    .attr('transform', `translate(0,${height - 30})`)

    // Create bottom (xAxis) scale
    .call(d3.axisBottom(x).ticks(width / 50))
    // .call(g => g.select('.domain').remove())
    // Draw vertical lines
    .call(g => g.selectAll('.tick line').clone()
      .attr('y2', -height)
      .attr('stroke-opacity', 0.1))

    .call(g => g.append('text')
      // Margin for xAxis label
      .attr('x', width - margin.right)
      // Push label up from xAxis
      .attr('y', -4)
      // Styles
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      // Add the text to the label
      .text(dataset.x))
}

function yAxis (g) {
  g
    .attr('transform', `translate(${margin.left},0)`)

    // Create left (yAxis) scale
    .call(d3.axisLeft(y))
    // .call(g => g.select('.domain').remove())
    // Draw horizontal lines
    .call(g => g.selectAll('.tick line').clone()
      .attr('x2', width)
      .attr('stroke-opacity', 0.1))

    .call(g => g.select('.tick:last-of-type text').clone()
      // Left margin for label
      .attr('x', 4)
      // Label position
      .attr('text-anchor', 'start')
      // Styleing
      .attr('font-weight', 'bold')
      // Add text to label
      .text(dataset.y))
}

function dataPoints (g) {
  g
    // Style group
    .attr('fill', '#4286f4')
    // Create circles
    .selectAll('circle')
    .data(dataset)
    .enter().append('circle')
    // Position circles
    .attr('cx', d => x(d.booksAmount))
    .attr('cy', d => y(d.averagePages))
    .attr('r', 10)
    .attr('fill', d => d.color)
}

function addText (g) {
  g
    // Style group
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    // .attr('fill', 'red')
    .selectAll('text')
    .data(dataset)
    .enter().append('text')
    .text(d => `Genre: ${d.genre}, ${d.booksAmount} boeken, ${d.averagePages} pagina's gemiddeld`)
    // Text location
    .attr('x', d => x(d.booksAmount + 200))
    .attr('y', d => y(d.averagePages - 2.5))
}

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height)

svg.append('g')
  .call(xAxis)

svg.append('g')
  .call(yAxis)

// Create the circles
svg.append('g')
  .call(dataPoints)

// Spawn text
svg.append('g')
  .call(addText)
