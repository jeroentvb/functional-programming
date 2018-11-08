function formatJson (obj) {
  return JSON.stringify(JSON.parse(obj), null, 4)
}

function exportObj (name, obj) {
  let fs = require('fs')
  fs.writeFile(name + '-export.json', formatJson(obj), err => {
    if (err) throw err
    console.log(`${name}-export.json written`)
  })
}

function exportArr (name, arr) {
  let fs = require('fs')
  let obj = JSON.stringify(arr, null, 4)
  fs.writeFile(name + '-export.json', obj, err => {
    if (err) throw err
    console.log(`${name}-export.json written`)
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

module.exports = {
  formatJson,
  exportObj,
  exportArr,
  getNumbers,
  calcAveragePages
}
