function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        rama: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/rame/'+this.id).then(
            (response) => {
                this.rama = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.rama);

            return axios.post('http://localhost:3000/rame', this.rama).then(
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
  