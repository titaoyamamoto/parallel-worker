Array.prototype.syncForEach = async function(callback) {
    for (let index = 0; index < this.length; index++)
      await callback(this[index], index);
  };

  Array.prototype.intersection = function(arr) {
    return this.filter(function(e) {
      return arr.indexOf(e) > -1;
    });
  };