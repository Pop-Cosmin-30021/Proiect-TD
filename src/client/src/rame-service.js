function rame() {
  get = function () {
    return axios.get('http://localhost:3000/rame');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/rame/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
