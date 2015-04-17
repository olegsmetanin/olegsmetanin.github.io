import { Store } from 'flummox';
import lru from 'lru-cache';
import lunr from 'lunr';

export default class AppStore extends Store {

  constructor(flux) {
    super();

    let appActionIds = flux.getActionIds('appActions');
    this.register(appActionIds.getSiteMap, this.handleGetSiteMap);
    this.register(appActionIds.getSearchIndex, this.handleGetSearchIndex);
    this.register(appActionIds.getResource, this.handleGetResource);
    this.register(appActionIds.getInstagrams, this.handleGetInstagrams);
    this.register(appActionIds.getPins, this.handleGetPins);

    this._siteMap = {};
    this._resourcesLRU = lru(20);
    this._experimentsSortedArray = [];
    this._searchIndex = {};

    this._instagramLRU = lru(20);
    this._pinsLRU = lru(20);

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
    arr.sort((a, b) => (a.date < b.date));
    this._experimentsSortedArray = arr;
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
    this._resourcesLRU.set(resourceDef.link, resourceDef);
    this.emit('change');
  }

  getResource(postLink) {
    var res;
    if (this._resourcesLRU.has(postLink)) {
      res = this._resourcesLRU.get(postLink);
      res.STORE_MISS = false;
    } else {
      res = {postLink: postLink, STORE_MISS: true};
    }
    return res;
  }

  getExperiments() {
    return this._experimentsSortedArray;
  }

  getLastExperiments(lastIndex, count) {
    return this._experimentsSortedArray.slice(lastIndex, lastIndex+count);
  }

  getExperimentTags() {
    let res = [];
    this._experimentsSortedArray.map((taglist) => {
      taglist.tags.map((tag) => {
        if (res.indexOf(tag) === -1) {
          res.push(tag);
        }
      });
    });
    return res;
  }

  getSearchItems(query) {
    var res = this._searchIndex.search(query);
    return res.map(el => this._siteMap[el.ref]);
  }

  getInstagrams(userid) {
    var res;
    if (this._instagramLRU.has(userid)) {
      res = this._instagramLRU.get(userid);
      res.STORE_MISS = false;
    } else {
      res = {items: [], STORE_MISS: true};
    }
    return res;
  }

  handleGetInstagrams(instagrams) {
    this._instagramLRU.set(instagrams.userid, instagrams);
    this.emit('change');
  }

  getPins(username) {
    var res,
      lru = this._pinsLRU;
    if (lru.has(username)) {
      res = lru.get(username);
      res.STORE_MISS = false;
    } else {
      res = {STORE_MISS: true};
    }
    return res;
  }

  handleGetPins(pinsData) {
    let username = pinsData.username;
    this._pinsLRU.set(username, pinsData);
    this.emit('change');
  }

}
