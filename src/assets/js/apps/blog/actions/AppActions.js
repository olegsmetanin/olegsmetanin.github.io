/*jshint -W018, -W040, -W064, -W083, -W086 */

import { Flummox, Actions, Store } from 'flummox';
import httpRequest from './../utils/HttpRequest.js';
import { PromiseUtils } from  './../utils/Promise.js';


class AppActions extends Actions {

  async getSiteMap() { 
      return await httpRequest
      .get(`/sitemap.json`)
      .exec()
      .then(val => val.body);
  }

  async getSearchIndex() { 
      return await httpRequest
      .get(`/searchindex.json`)
      .exec()
      .then(val => val.body);
  }

  async getResource(postDef) { 
      return await httpRequest
      .get(postDef.src)
      .exec()
      .then(val => {
        let res = postDef;
        res.text = val.text;
        return res;
      });
  }

  async getInstagrams(insta) { 
      return await httpRequest
      .get(`https://api.instagram.com/v1/users/${insta.userid}/media/recent/?client_id=${insta.clientid}`)
      .jsonp()
      .exec()
      .then(val => {
        return {userid: insta.userid, data: val.data}
      });
  }

}

export default AppActions;