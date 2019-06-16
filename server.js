'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const leboncoin = require('.');
// App
const app = express();


app.get('/help/categories', (req, res) => {
  var fs = require('fs');
  fs.readFile('const/categories.json', 'utf8', function(err, contents) {
      res.send(contents);
  });
});
app.get('/help/subcategories', (req, res) => {
  var fs = require('fs');
  fs.readFile('const/subcategories.json', 'utf8', function(err, contents) {
      res.send(contents);
  });
});
app.get('/help/regions', (req, res) => {
  var fs = require('fs');
  fs.readFile('const/regions.json', 'utf8', function(err, contents) {
      res.send(contents);
  });
});
app.get('/help/departements', (req, res) => {
  var fs = require('fs');
  fs.readFile('const/departements.json', 'utf8', function(err, contents) {
      res.send(contents);
  });
});
app.get('/ad', (req, res) => {
  let url = req.query.url;
  if (!url) {
      return res.status(400).send(
      'Please provide an URL. Example: /ad?url=https://leboncoin.fr/xxx/01231231.htm/');
  }
  var item = new leboncoin.Item({"link": url});
  item.getDetails().then(function (data) {
      res.send(data.json);
  }).catch(function (err) {
     console.log(err);
     res.send(JSON.stringify({"error": err}));
  });
});
app.get('/listing', (req, res) => {
    var search = new leboncoin.Search();
    let page = 1;
    let category = 'ventes_immobilieres';
    let region = 'martinique';
    let filter = leboncoin.FILTERS.ALL;
    if (req.query.page) {
        try {
            page = parseInt(request.query.page);
        } catch (err) {
            console.log("no shit !");
        }
    }
    if (req.query.category) {
        category = req.query.category;
    }
    if (req.query.region) {
        region = req.query.region;
    }
    if (req.query.filter) {
        if (req.query.filter == "particulier") {
          filters = leboncoin.FILTERS.PARTICULIER;
        } else if (req.query.filter == "professionnels") {
            filters = leboncoin.FILTERS.PROFESSIONNELS;
        }
    }
    search.setPage(page)
      .setFilter(filter)
      .setCategory(category)
      .setRegion(region);
  search.run().then(function (data) {
        res.send(data.json);
  }).catch(function (err) {
     console.log(err);
     res.send(JSON.stringify({"error": err}));
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
