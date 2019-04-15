let config = {
  data: function () {
    return {
      name: 'OutlineNavigator',
      ui: undefined,
      templateElement: null,
      opened: false
    }
  },
  mounted: function () {
    
  },
  computed: {
    
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
        this.ui = $(this.$refs.modal)
        this.templateElement = $('#template')
      }
      return this.ui
    },
    open: function () {
      this.opened = true
      //this.getUI().modal('show')
      //this.getUI().sidebar('toggle')
      this.getUI().addClass('visible')
      this.templateElement.addClass('sidebar')
      console.log('open')
    },
    close: function () {
      this.opened = false
      //this.getUI().modal('hide')
      //this.getUI().sidebar('toggle')
      this.getUI().removeClass('visible')
      this.templateElement.removeClass('sidebar')
      console.log('close')
    },
    toggle: function () {
      if (this.opened) {
        this.close()
      }
      else {
        this.open()
      }
    }
  }
}

export default config