'use strict'

const OBA = require('oba-api')
const fs = require('fs')

require('dotenv').config()

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
})

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

function getBookPagesAmount (genre, page) {
  return client.get('search', {
    q: genre,
    librarian: true,
    refine: true,
    facet: ['type(book)', `genre(${genre})`],
    page: page
  })
    .then(res => {
      // exportObj('test', res)
      let data = {
        meta: {
          count: Math.ceil((JSON.parse(res)).aquabrowser.meta.count / 20),
          page: (JSON.parse(res)).aquabrowser.meta.page,
          genre: genre
        },
        pageAmounts: []
      }
      let results = (JSON.parse(res)).aquabrowser.results.result
      results.forEach((item, index) => {
        let pages = results[index]['librarian-info'].record.marc.df215
        if (pages) {
          data.pageAmounts.push(
            parseInt(pages.df215[0].$t.replace(/(^\d+)(.+$)/i, '$1'))
          )
        }
      })
      // console.log(data)
      return data
    })
    .catch(err => console.log(err))
}

// getBookPageAmount('western', 1)

function getData () {
  let genres = [
    'western',
    'thriller',
    'detective'
  ]
  let allPages = []

  genres.forEach(async (item, i) => {
    let firstRequest = await getBookPagesAmount(genres[i], 1)
    console.log(`Line 69: ${JSON.stringify(firstRequest)}`)
    // firstRequest.meta.count.forEach(async (item, x) => {
    //   // let pages = getBookPagesAmount(genres[i], x + 1)
    // })
  })
}

getData()
/*
client.get('search', {
  q: 'b',
  // sort: 'title', // Soirt results on title (or something else)
  librarian: true,
  page: 1,
  // pagesize: 2, // Amount of results per page
  refine: true,
  facet: ['type(book)', 'genre(western)']
})
  .then(res => {
    // exportObj('test', res)
    // let data = []
    let pageAmounts = []
    // [
    //   {
    //     name: 'western',
    //     averagePageAmount: Number
    //   }
    // ]
    let results = (JSON.parse(res)).aquabrowser.results.result // All the results
    // let allGenres = (JSON.parse(res)).aquabrowser.facets.facet[2].value // Genres in current query
    // let genre = results[0].genres.genre[0]['search-term']
    // console.log(genre)
    // console.log(allGenres)
    // let pageCount = results[0]['librarian-info'].record.marc.df215.df215[0].$t // Get the amount of pages in a book
    // console.log(pageCount)

    results.forEach((item, index) => {
      pageAmounts.push(
        parseInt(results[index]['librarian-info'].record.marc.df215.df215[0].$t.split(' ')[0]) // Get all page lengths
      )
    })
    // console.log(genre)
    // console.log(pageAmounts)

    let total = 0
    pageAmounts.forEach((item, index) => { // Get the total pages in a genre
      total += pageAmounts[index]
    })
    total = Math.round(total / pageAmounts.length)
    console.log(total)
  }) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API
*/
function formatJson (obj) {
  return JSON.stringify(JSON.parse(obj), null, 4)
}

function exportObj (name, obj) {
  fs.writeFile(name + '-export.json', formatJson(obj), err => {
    if (err) throw err
    console.log(`${name}-export.json written`)
  })
}
