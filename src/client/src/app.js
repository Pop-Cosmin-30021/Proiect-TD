function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      rame: [],
      rameService: null,
      message: ''
    },
    created: function () {
      this.rameService = rame();

      this.rameService.get().then(response => (this.rame = response.data));
    },
    methods: {
      deleteRama: function(id) {
        console.log('HTTP DELETE spre backend, rama: '+id);
        this.rameService.remove(id).then(response => {
          this.rameService.get().then(response => (this.rame = response.data));
        });
      },
    }
  });

  //indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
