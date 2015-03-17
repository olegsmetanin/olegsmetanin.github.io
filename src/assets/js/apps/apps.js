'use strict';
/*global __non_webpack_require__:true*/

import blog from './blog/index.jsx';

window['require'] = function(parentRequire) {
    return function(module) {
        switch(module) {
        case "blog": return blog;
        }
        return parentRequire(module);
    };
}(typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : function() {
    throw new Error("Module '" + module + "' not found")
});
