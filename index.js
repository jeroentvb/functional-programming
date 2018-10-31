const OBA = require('oba-api')
const fs = require('fs')

require('dotenv').config()

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'Arendsoog',
  // sort: 'title',
  librarian: true,
  // pagesize: 2,
  refine: true,
  facet: 'type(book)'
})
  .then(res => {
    exportObj('test', res)
    var array = []
    var data = (JSON.parse(res)).aquabrowser.results.result
    // console.log(data)
    // aquabrowser.results.result[0].titles.title.$t

    data.forEach(function (item, index) {
      console.log(data[index].titles.title.$t)
      array.push(data[index].titles.title.$t)
    })
    
    console.log(array)

  }) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API


  function formatJson(obj) {
    return JSON.stringify(JSON.parse(obj), null, 4)
  }

  function exportObj(name, obj) {
    fs.writeFile(name + '-export.json', formatJson(obj), err => {
      if (err) throw err
      console.log(`${name}-export.json written`)
    })
  }
