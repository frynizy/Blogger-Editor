/*
ThemeManager = {
  template: `<div>ThemeManager</div>`,
  init: function () {
    $(() => {
      $('#themeManagerModal .modal-body').html(this.template)
    })
  }
}

ThemeManager.init()
*/

var ThemeManager = {
  //name: "main-content",
  data: function () {
    return {
      ui: undefined,
    }
  },
  mounted() {
    /*
    if (localStorage.getItem('uploadImageDraft')) {
      try {
        this.uploadImageDraft = localStorage.getItem('uploadImageDraft');
      } catch(e) {
        localStorage.removeItem('uploadImageDraft');
      }
    }
    */
  },
  created: function () {
    //return
    $(() => {
      this.getUI().find('.close.icon:first').click(() => {
        //console.log(1)
        this.close()
      })
      
      //this.open()
    })   
  },
  methods: {
    // ---------------------
    // Methods of Modal
    // ---------------------
    
    getUI: function () {
      if (typeof(this.ui) === 'undefined') {
        //console.log('find ui')
        this.ui = this.ui = $('.ThemeManager.ui.modal')
      }
      return this.ui
    },
    open: function () {
      //console.log(this.data)
      this.getUI().modal('show')
    },
    close: function () {
      this.getUI().modal('hide')
    },
    persist() {
      //localStorage.uploadImageDraft = this.uploadImageDraft;
      //console.log('now pretend I did more stuff...');
    },
    // -------------------------
    // Other Methods
    // -------------------------
    /*
    loadThemeFile: function (templatePath, callback) {
      let name = 'simple'
      
      let templatePath, stylePath
      if (templatePath.startsWith('filesystem:http') === false) {
        templatePath = 'themes/' + templatePath + '/template.html'
        stylePath = 'themes/' + templatePath + '/style.css'
      }
      else {
        // filesystem:http://localhost:8383/temporary/home-icon_1.png
        let prefix = 'filesystem:' + location.protocol + '://' + location.host + '/temporary'
        templatePath = prefix + templatePath + '/template.html'
        stylePath = prefix + templatePath + '/style.css'
      }
      $(`<link href="${stylePath}" rel="stylesheet" type="text/css" />`)
              .appendTo('head')
      
      $.get(templatePath, (template) => {
        template = this.processTemplate(template)
        
        $('#template').html(template)

        FunctionHelper.triggerCallback(callback)
      })
    },
    */
    processTemplate: function (template) {
      //console.log(template)
      //let titleEditor = `<input type="text" name="postTitle" id="postTitle" />`
      let titleEditor = `<div class="summernotePostTitle-wrapper air-mode">
        <div id="summernotePostTitle"</div>
      </div>`
      template = template.replace('${postTitle}', titleEditor)
      
      let dataContainer = `<span class="summernotePostDate-wrapper">
        <span id="summernotePostDate" class="summernotePostDate"></span>
      </span>`
      template = template.replace('${postDate}', dataContainer)
      
      let labelEditor = `<span class="summernotePostLabels-wrapper air-mode">
        <span id="summernotePostLabels" class="summernotePostLabels"></span>
      </span>`
      template = template.replace('${postLabels}', labelEditor)

      //let postEditor = `<div id="summernotePostBody"><p>HelloAAAA</p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><p>Summernote</p></div>`
      let postEditor = `<div class="summernotePostBody-wrapper">
        <div id="summernotePostBody"></div>
      </div>`
      template = template.replace('${postBody}', postEditor)
      
      return template
    },
    loadTemplate: function (callback) {
      let path = '/template.html'
      FileSystemHelper.read(path, (template) => {
        if (template === undefined) {
          path = 'themes/simple/template.html'
          $.get(path, (template) => {
            template = this.processTemplate(template)
            $('#template').html(template)
            FunctionHelper.triggerCallback(callback, template)
          })
        }
        else {
          template = this.processTemplate(template)
          $('#template').html(template)
          FunctionHelper.triggerCallback(callback, template)
        }
      })
    },
    loadStyle: function (callback) {
      let path = '/style.css'
      //let stylePath = 'filesystem:' + location.protocol + '://' + location.host + '/temporary' + path
      let stylePath = FileSystemHelper.getFileSystemUrl(path)
      FileSystemHelper.isExists(path, (isExisted) => {
        if (isExisted === false) {
          stylePath = 'themes/simple/style.css'
        }
        
        $(`<link href="${stylePath}" rel="stylesheet" type="text/css" />`)
              .appendTo('head')
        
        FunctionHelper.triggerCallback(callback)
      })
    },
    setupPostData: function (callback) {
      
      PostManager.methods.getPost((post) => {
        console.log(post.id)
        let postDate = PostManager.methods.displayDate(post.updateUnix)
        console.log(postDate)
        // Setup title
        //let post = PostManager.methods.getPost()
        
        /*
        if (EditorManager.summerNoteInited === false) {
          $('#summernotePostTitle').html(post.title)
          $('#summernotePostLabels').html(post.labels)
          $('#summernotePostDate').html(postDate)
        }
        */
        EditorManager.methods.setupPostTitle(post.title)
        EditorManager.methods.setupPostLabels(post.labels)
        EditorManager.methods.setupPostDate(postDate)

        PostManager.methods.getPostBody((postBody) => {
          //console.log(postBody)
          /*
          if (EditorManager.summerNoteInited === false) {
            $('#summernotePostBody').html(postBody)
          }
          */
          EditorManager.methods.setupPostBody(postBody)
          FunctionHelper.triggerCallback(callback)
        })
      })
    },
    init: function (callback) {
      this.loadStyle(() => {
        this.loadTemplate(() => {
          this.setupPostData(callback)
        })
      })
    }
  }
}

window.ThemeManager = ThemeManager
export default ThemeManager