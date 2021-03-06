var config = {
  data: function () {
    return {
      name: 'WindowAlert',
      ui: undefined,
      onClose: null,
      message: ''
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
        this.ui = $(this.$refs.modal)
      }
      return this.ui
    },
    open: function (message, onClose) {
      if (message === undefined) {
        return
      }
      
      if (typeof(message) === 'function') {
        onClose = message
        message = ''
      }
      
      if (typeof(onClose) === 'function') {
        this.onClose = onClose
      }
      this.message = message
      
      this.getUI().modal({
        closable: false
      }).modal('show')
      this.getUI().find('.ok.button').focus()
    },
    close: function () {
      this.getUI().modal('hide')
      FunctionHelper.triggerCallback(this.onClose)
      this.onClose = null
    }
  }
}

export default config