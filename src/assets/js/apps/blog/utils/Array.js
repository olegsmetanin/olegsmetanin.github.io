/*eslint-disable no-extend-native */
  Array.prototype.flatMap = function(lambda) {
      return Array.prototype.concat.apply([], this.map(lambda));
  };
/*eslint-enable no-extend-native */
