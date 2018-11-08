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
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

// Filter numbers, push to new array, return new array
function getNumbers (arr, newArr) {
  arr.forEach(item => {
    if (typeof item === 'number' && isNaN(item) === false) {
      newArr.push(item)
    }
  })
  return newArr
}

// Calculate the average pages of a genre
function calcAveragePages (arr) {
  let total = 0
  arr.forEach(number => {
    total += number
    return total
  })
  return Math.round(total / arr.length)
}

// Global var to store all the results in
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
      }
    })
    .then(() => {
      if (results.length === genres.length) {
        helper.exportArr('results', results)
      }
    })
    .catch(err => console.log(err))
})
