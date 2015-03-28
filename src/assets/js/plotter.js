function plotter ( client ) {
  var index = 'plot-pdx'
  var type = 'testplot'

  this.hello = (param) => {
    client.ping({
      requestTimeout: 30000,
      hello: param
    }, function (error) {
      if (error) {
        console.error('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
  }

  this.makePlot = (obj) => {

    let uid = this.generateUUID()

    client.create({
      index: index,
      type: type,
      id: uid,
      body: obj
    }, function (error, response) {
      if ( error ) {
        console.error(error)
      } else {
        console.log(response)
      }
    });
    return uid
  }

this.getPlot = (uid) => {
  client.get({
    index: index,
    type: type,
    id: uid
  })
}

  this.getAllPlots = () => {
    console.log('get em all!')
    client.search({
      index: index,
      type: type
    }).then(function (response) {
      var plots = response.hits.hits
      return plots
    }, function (error) {
      console.trace(error.message);
      return error
    })
  }

  this.voteYes = (uid) => {
    client.update({
      index: index,
      type: type,
      id: uid,
      body: {
        doc: {
          properties: {
            yes: 4
          }
        }
      }
    }).then(function (response) {
      console.log(response)
    }, function (error) {
      console.trace(error.message);
      return error
    })
  }

  this.voteNo = () => {
    client.update({
      index: index,
      type: type,
      id: uid,
      body: {
        doc: {
          properties: {
            no: 4
          }
        }
      }
    }).then(function (response) {
      console.log(response)
    }, function (error) {
      console.trace(error.message);
      return error
    })
  }

  this.votePlot = (uid, support) => {
    console.log('i vote ' + support + ' on ' + uid)
    let plot = this.getPlot(uid)
    // console.log(plot)
    if (support) {
      this.voteYes(uid)
    } else {
      this.voteNo(uid)
    }
  }

  this.generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16)
    })
    return uuid;
  }
}

export default plotter;