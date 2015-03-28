function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');

  acetate.metadata('**/*', {
    data: {
      plots: 'data/plots.json'
    }
  });

  acetate.src = 'src';
  acetate.dest = 'www';
}

module.exports = config;