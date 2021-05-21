function run() {
    new Vue({
      el: '#details',
      data: {
        id: 'default',
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

      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  