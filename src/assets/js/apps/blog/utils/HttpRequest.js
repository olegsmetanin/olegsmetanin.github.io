import { Request } from 'superagent';
import request from 'superagent';

Request.prototype.jsonp = function () {

  var sel;

  this.jsonpCallbackName = 'superagentCallback' + new Date().valueOf() + parseInt(Math.random() * 1000);

  window[this.jsonpCallbackName] = function(data){
    delete window[this.jsonpCallbackName];
        sel.parentNode.removeChild(sel);
    this.callback.apply(this, [null, data]);
  }.bind(this);

  this.end = function (fn) {
    this.callback = fn;

    sel = document.createElement('script');
    var sep = this.url.indexOf('?') === -1 ? '?' : '&';
    sel.src =  this.url + sep +'callback=' + this.jsonpCallbackName;
    document.getElementsByTagName('head')[0].appendChild(sel);
  };

  return this;
};

Request.prototype.exec = function() {
  let req = this;

  return new Promise((resolve, reject) => {
    req.end((error, res) => {
      if (error) {
        return reject(error);
      }
      resolve(res);
    });
  });
};

export default request;
