function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        rama: {}
      },
      created: function () {

      },
      methods: {
       add: function(){
            console.dir(this.rama);

            return axios.put('http://localhost:3000/rame', this.rama).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    run();
  });