function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');

  acetate.src = 'src';
  acetate.dest = 'www';
}

module.exports = config;