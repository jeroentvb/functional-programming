'use strict'

const OBA = require('oba-api')
const helper = require('./helper')
require('dotenv').config()

// Setup authentication to api server
const client = new OBA({
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
})

const genres = [
  // 'western',
  //'thriller'
  //'detective'
  // 'sport',
  //'science-fiction'
    //'stripverhaal'
  // 'spionage',
    // 'humor',
  //'feministisch-verhaal',
  'school'
  //'sprookjes'
    // 'dieren'
  // 'avonturenroman'
  // 'bijbels-verhaal'
]

function getData (genre, page) {
  return new Promise((resolve, reject) => {
    client.get('search', {
      q: 'format:book',
      librarian: true,
      refine: true,
      facet: `genre(${genre})`,
      page: page
    })
      .then(res => {
        console.log(`Got a response for page ${page} of genre ${genre}`)
        let data = {
          meta: {
            count: Math.ceil((JSON.parse(res)).aquabrowser.meta.count / 20), // Divide results by 20 to get to amount of pages
            page: (JSON.parse(res)).aquabrowser.meta.page,
            genre: genre
          },
          pageAmounts: []
        }
        let results = (JSON.parse(res)).aquabrowser.results.result
        results.forEach((item, index) => {
          let pages = results[index]['librarian-info'].record.marc.df215
          if (pages !== undefined && pages.df215[0] !== undefined && pages.df215[0].$t !== undefined) {
            data.pageAmounts.push(
              parseInt(pages.df215[0].$t.replace('[', '').replace(']', ''))
            )
          }
        })
        // Don't spam the OBA server with request. Wait 1 second for every genre in the genres array before resolving the response and moving on to the next one
        setTimeout(() => resolve(data), genres.length * 1000)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

async function getAllData (genre, data, results) {
  var filteredPages = []

  for (let i = 1; i < data.meta.count + 1; i++) {
    await getData(genre, i)
      .then(data => helper.getNumbers(data.pageAmounts, filteredPages))
      .then(filteredPages => {
        // If the last page was received, push the data in a new array
        if (i === data.meta.count) {
          results.push({
            genre: genre,
            booksAmount: filteredPages.length,
            averagePages: helper.calcAveragePages(filteredPages)
          })
          console.log(results)
          // In case something goes wrong, write the results after every completed genre
          helper.exportArr('results', results)
          return results
        }
      })
      .catch(err => console.log(err))
  }
}

(function () {
  let results = []

  genres.forEach(genre => {
    console.log(`Starting requests for genre: ${genre}`)
    // Get the first page to know how many requests have to be sent
    getData(genre, 1)
      .then(data => getAllData(genre, data, results))
      .catch(err => console.log(err))
  })
})()
