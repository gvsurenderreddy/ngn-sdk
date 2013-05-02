global.NGN = {};
module.exports = function(ngn){
  NGN = ngn;

  var ns = {},
      p = require('path'),
      path = p.join(__dirname,'model');

  ns.Pattern = require('./Pattern');
  ns.string = require('./String');
  ns.model = {data:{}};

  // Return all the first level classes in the directory.
  require('fs').readdirSync(path).forEach(function(file){
    if (file !== 'data'){
      ns.model[p.basename(file,'.js')] = require(p.join(path,file));
    }
  });

  // Get the data directory
  path = p.join(__dirname,'model','data');
  require('fs').readdirSync(path).forEach(function(file){
    ns.model.data[p.basename(file,'.js')] = require(p.join(path,file));
  });

  return ns;
};