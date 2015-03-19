import { Flummox, Actions, Store } from 'flummox';
import LRU from 'lru-cache';
import lunr from 'lunr';

class AppStore extends Store { 

  constructor(flux) {
    super();

    let appActionIds = flux.getActionIds('appActions');
    this.register(appActionIds.getSiteMap, this.handleGetSiteMap);
    this.register(appActionIds.getSearchIndex, this.handleGetSearchIndex);
    this.register(appActionIds.getResource, this.handleGetResource);
    this.register(appActionIds.getInstagrams, this.handleGetInstagrams);

    this._siteMap = {};
    this._ResourcesLRU = LRU(20);
    this._ExperimentsSortedArray = [];
    this._searchIndex = {};

    this._InstagramLRU = LRU(20);

    this.state = {};

  }

  handleGetSiteMap(siteMap) {
    this._siteMap = siteMap;
    let arr = [];
    for (var key of Object.keys(siteMap)) {
      let obj = siteMap[key];
      obj.link = key;
      if (obj.type === 'experiment') {
        arr.push(obj);
      }

    }
    arr.sort((a,b) => (a.date < b.date));
    this._ExperimentsSortedArray = arr;
    this.emit('change');
  }

  getSiteMap() {
    return this._siteMap;
  }

  handleGetSearchIndex(searchIndex) {
    this._searchIndex = lunr.Index.load(searchIndex);
    this.emit('change');
  }

  search(term) {
    return this._searchIndex.search(term);
  }

  handleGetResource(resourceDef) {
    this._ResourcesLRU.set(resourceDef.link, resourceDef);
    this.emit('change');
  }

  getResource(postLink) {
    var res;
    if (this._ResourcesLRU.has(postLink)) {
      res = this._ResourcesLRU.get(postLink);
      res.store_miss = false;
    } else {
      res = {postLink: postLink, store_miss: true}
    }
    return res;
  }

  getExperiments() {
    return this._ExperimentsSortedArray;
  }

  getLastExperiments(lastIndex, count) {
    return this._ExperimentsSortedArray.slice(lastIndex, lastIndex+count);
  }

  getExperimentTags() {
    let res = [];
    this._ExperimentsSortedArray.map((taglist,i) => {
      taglist.tags.map((tag, j) => {
        if (res.indexOf(tag) === -1) {
          res.push(tag);
        }
      })
    })
    return res;
  }
  
  getSearchItems(query) {
    var res = this._searchIndex.search(query);
    return res.map(el => this._siteMap[el.ref]);
  }


  getInstagrams(userid) {
    var res;
    if (this._InstagramLRU.has(userid)) {
      res = this._InstagramLRU.get(userid);
      res.store_miss = false;
    } else {
      res = {items:[], store_miss: true}
    }
    return res;
  }

  handleGetInstagrams(instagrams) {
    this._InstagramLRU.set(instagrams.userid, instagrams);
    this.emit('change');
  }


}

export default AppStore;