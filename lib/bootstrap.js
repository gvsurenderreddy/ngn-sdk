global.NGN = {};
module.exports = function(ngn){
  NGN = ngn;

  var ns = {},
      p = require('path'),
      path = p.join(__dirname,'model');

  ns.Pattern = require('./Pattern');
  ns.string = require('./String');
  ns.model = {data:{}};

  // Create the model namespace immediately so child classes can inherit from model.
  NGN.model = {Model:require(p.join(__dirname,'model','Model.js'))};

  // Return all the first level classes in the directory.
  require('fs').readdirSync(path).forEach(function(file){
    if (file !== 'data' && p.extname(file) == '.js'){
      NGN.model[p.basename(file,'.js')] =
      ns.model[p.basename(file,'.js')] = require(p.join(path,file));
    }
  });

  // Get the data directory
  path = p.join(__dirname,'model','data');
  require('fs').readdirSync(path).forEach(function(file){
    ns.model.data[p.basename(file,'.js')] = require(p.join(path,file));
  });

//  ns.model.Model = NGN.model.Model;
//  delete NGN.model.Model;

  return ns;
};