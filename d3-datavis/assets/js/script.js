const dataset = [
  {
    'genre': 'western',
    'booksAmount': 62,
    'averagePages': 139
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

// const dataset = [
//   [256, 60], [480, 270], [250, 150], [100, 99], [330, 285],
//   [410, 36], [475, 132], [25, 180], [85, 63], [220, 240]
// ]

// const width = 500
const height = 600
const width = 800
const margin = ({
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
})

var x = d3.scaleLinear()
  // Add the correct values to the xAxis
  .domain(d3.extent(dataset, d => d.booksAmount)).nice()
  // Put the xAxis in the right place using margin
  .range([margin.left, width - margin.right])

var y = d3.scaleLinear()
  // Add the correct values to the yAxis
  .domain(d3.extent(dataset, d => d.averagePages)).nice()
  // Put the yAxis in the right place using margin
  .range([height - margin.bottom, margin.top])

function xAxis (g) {
  g
    .attr('transform', `translate(0,${height - 30})`)

    // Create bottom (xAxis) scale
    .call(d3.axisBottom(x))
    // .call(g => g.select('.domain').remove())
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
    // .attr('r', 5)
    .attr('r', d => Math.sqrt(d.averagePages))
}

function addText (g) {
  g
    // Style group
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    // .attr('fill', 'red')
    .selectAll('text')
    .data(dataset)
    .enter().append('text')
    .text(d => `${d.genre}, ${d.booksAmount} boeken, ${d.averagePages} pagina's gemiddeld`)
    // Text location
    .attr('x', d => x(d.booksAmount))
    .attr('y', d => y(d.averagePages))
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
