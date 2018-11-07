'use strict'

const OBA = require('oba-api')
const helper = require('./helper')

require('dotenv').config()

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
})

const genres = [
  'western',
  'thriller',
  'detective',
  'sport',
  'science-fiction',
  'stripverhaal',
  'spionage',
  'humor',
  'homofiel-thema',
  'feministisch-verhaal'
]

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

function getData (genre, page) {
  return new Promise((resolve, reject) => {
    client.get('search', {
      q: genre,
      librarian: true,
      refine: true,
      facet: ['type(book)', `genre(${genre})`],
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
          // console.log(pages)
          if (pages !== undefined && pages.df215[0] !== undefined && pages.df215[0].$t !== undefined) {
            data.pageAmounts.push(
              parseInt(pages.df215[0].$t.replace('[', '').replace(']', ''))
            )
          }
        })
        // console.log(data)
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

// Filter numbers
function getNumbers (arr, newArr) {
  arr.forEach(item => {
    if (typeof item === 'number' && isNaN(item) === false) {
      newArr.push(item)
    }
  })
  return newArr
}

function calcAveragePages (arr) {
  let total = 0
  arr.forEach(number => {
    total += number
    return total
  })
  return Math.round(total / arr.length)
}

var results = []

genres.forEach(genre => {
  console.log(`Starting requests for genre: ${genre}`)
  getData(genre, 1)
    .then(async data => {
      let filteredPages = []

      for (let i = 1; i < data.meta.count + 1; i++) {
        await getData(genre, i)
          .then(data => {
            getNumbers(data.pageAmounts, filteredPages)
            return filteredPages
          })
          .then(filteredPages => {
            if (i === data.meta.count) {
              results.push({
                genre: genre,
                booksAmount: filteredPages.length,
                averagePages: calcAveragePages(filteredPages)
              })
              console.log(results)
            }
          })
          .catch(err => console.log(err))

        // Export all pages amounts
        // helper.exportArr(genres[index], filteredPages)
      }
    })
    .then(() => helper.exportArr('results', results))
    .catch(err => console.log(err))
})
