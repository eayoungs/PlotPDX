import Plotter from './plotter.js';

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'http://52.0.223.139:9200',
  log: 'trace',
  keepAlive: false
});

var plotter = new Plotter(client)

plotter.hello('plotter')

var testPlot = {
  "type": "Point",
  "coordinates": [
    -122.79621,
    45.57422
  ],
  "properties": {
    "cool": "plot",
    "yes": 3,
    "no": 4
  }
}

// plotter.makePlot(testPlot)
