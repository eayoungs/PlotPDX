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


var map = L.map('map').setView([45.52, -122.6819], 16);

L.esri.basemapLayer('Gray').addTo(map);

var searchControl = new L.esri.Geocoding.Controls.Geosearch({
  useMapBounds: 13
}).addTo(map);

searchControl.on('results', function(data){
  map.panTo(data.results[0].latlng)

});

vacantLots = L.esri.featureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/ArcGIS/rest/services/NonPark_vacant_BLInon_openspace/FeatureServer/0',{
  simplifyFactor: 0.4,
  precision: 5,
  style: function (feature) {
    if(feature.properties.isPublic == 1){
      return {color: '#c51b8a', weight: 0, fillOpacity: 0.6};
    }
    else {
      return {color: '#b2182b', weight: 0, fillOpacity: 0.6};
    }
  }
}).addTo(map);

newResPermits = L.esri.featureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/New%20Construction%20Residential%20Permits/FeatureServer/0');

var overlays = {
  "New Residential Construction Permits": newResPermits,
};

L.control.layers(overlays).addTo(map);

vacantLots.bindPopup(function(feature){
  return L.Util.template('<p><strong>Owner: </strong>{OWNER1}<br><strong>Address:</strong> {SITEADDR}<br><strong>General Use:</strong> {GEN_USE}</p> <p><a href="/new-plot" class="link-white btn btn-blue">I have an idea</a></p>', feature.properties);
});

// plotter.makePlot(testPlot)
