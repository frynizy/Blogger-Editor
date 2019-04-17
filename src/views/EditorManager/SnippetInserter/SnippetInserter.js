let config = {
  data: function () {
    return {
      name: 'SnippetInserter',
      ui: undefined,
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
      }
      return this.ui
    },
    open: function () {
      this.getUI().modal('show')
    },
    close: function () {
      this.getUI().modal('hide')
    }
  }
}

export default config