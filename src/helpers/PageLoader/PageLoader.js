var config = {
  data: function () {
    return {
      name: 'PageLoader',
      ui: undefined,
    }
  },
  mounted: function () {
    
  },
  created: function () {
    $v[this.name] = this
  },
  methods: {
    // ---------------------
    // Methods of Modal
    // ---------------------
    
    getUI: function () {
      if (typeof(this.ui) === 'undefined') {
        //console.log('find ui')
        //this.ui = $(this.$refs.modal)
        this.ui = $('.page-loader.modal')
      }
      return this.ui
    },
    open: function () {
      this.getUI().modal({
        closable: false
      }).modal('show')
    },
    close: function () {
      this.getUI().modal('hide')
    }
  }
}

export default config