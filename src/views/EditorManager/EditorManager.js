import dayjs from 'dayjs'

var EditorManager = {
  //name: "main-content",
  data: function () {
    return {
      ui: undefined,
      uploadImageDraft: '',
      disableUploadImageDraft: true,
      postSummerNote: null,
      titleSummerNote: null,
      labelsSUmmerNote: null,
      dateContainer: null,
      summerNoteInited: false
    }
  },
  mounted() {
    if (localStorage.getItem('uploadImageDraft')) {
      try {
        this.uploadImageDraft = localStorage.getItem('uploadImageDraft');
      } catch(e) {
        localStorage.removeItem('uploadImageDraft');
      }
    }
  },
  created: function () {
    //return
    //$(() => {
      
      this.summerNoteInited = false
      $v.EditorManager = this
      //return
      //this.open()
    //})   
  },
  methods: {
    getUI: function () {
      if (typeof(this.ui) === 'undefined') {
        //console.log('find ui')
        this.ui = this.ui = $('.EditorManager.ui.modal')
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
    validateUploadImageDrarfUrl: function () {
      this.disableUploadImageDraft = !this.uploadImageDraft.startsWith('https://www.blogger.com/blogger.g?blogID=')
      //console.log(this.disableUploadImageDraft)
    },
    persist() {
      localStorage.uploadImageDraft = this.uploadImageDraft;
      //console.log('now pretend I did more stuff...');
    },
    getPostSummerNoteToolbarConfig: function () {
      let toolbar = [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', [/*'fullscreen',*/ 'codeview', 'help']],
          ['mybutton', ['copyHTML']]
        ]
        
      return toolbar
    },
    getPostSummerNote: function () {
      if (this.postSummerNote === undefined
              || this.postSummerNote === null
              || this.postSummerNote.length === 0) {
        this.postSummerNote = $('#summernotePostBody')
      }
      return this.postSummerNote
    },
    getTitleSummerNote: function () {
      if (this.titleSummerNote === undefined
              || this.titleSummerNote === null
              || this.titleSummerNote.length === 0) {
        this.titleSummerNote = $('#summernotePostTitle')
      }
      return this.titleSummerNote
    },
    getLabelsSummerNote: function () {
      if (this.labelsSummerNote === undefined
              || this.labelsSummerNote === null
              || this.labelsSummerNote.length === 0) {
        this.labelsSummerNote = $('#summernotePostLabels')
      }
      return this.labelsSummerNote
    },
    getDateContainer: function () {
      if (this.dateContainer === undefined
              || this.dateContainer === null
              || this.dateContainer.length === 0) {
        this.dateContainer = $('#summernotePostDate')
      }
      return this.dateContainer
    },
    copyCode: function (context) {
      var ui = $.summernote.ui;

      // create button
      var button = ui.button({
        contents: '<i class="code icon"></i> Code',
        tooltip: 'Copy Code',
        click: () => {
          // invoke insertText method with 'hello' on editor module.
          //context.invoke('editor.insertText', 'hello');
          let code = this.getPostSummerNote().summernote('code');
          //console.log(code)

          CopyPasteHelper.copyPlainText(code)
        }
      });

      return button.render();   // return button as jquery object
    },
    getAssetDirPath: function (callback) {
      $v.PostManager.getEditingPostId((id) => {
        let path = `/${id}/assets/`
        FunctionHelper.triggerCallback(callback, path)
      })
    },
    onImageUpload: function (files) {
      // upload image to server and create imgNode...
      //$summernote.summernote('insertNode', imgNode);
      //console.log(files[0])
      this.getAssetDirPath((path) => {
        FileSystemHelper.copy(path, files, (urlList) => {
          //console.log(urlList)
          urlList.forEach(imgUrl => {
            //let imgUrl = urlList[0]
            let name = FileSystemHelper.getFileName(imgUrl)
            let imgNode = $(`<a href="${imgUrl}">
          <img src="${imgUrl}" alt="${name}" title="${name}" />
        </a>`)[0]
            this.getPostSummerNote().summernote('insertNode', imgNode);
          })
        })
      })
    },
    onDrop: function (files) {
      //console.log(files.length)
      
      this.getAssetDirPath((path) => {
        let loop = (i) => {
          if (i < files.length) {
            let file = files[i];
            let type = file.type
            let name = file.name
            //console.log(imageFile)

            FileSystemHelper.copy(path, file, (url) => {
              let node
              if (type.startsWith('image')) {
                node = $(`<a href="${url}">
              <img src="${url}" alt="${name}" title="${name}" />
            </a>`)[0]
              } else {
                node = $(`<a href="${url}">${name}</a>`)[0]
              }
              this.getPostSummerNote().summernote('insertNode', node);

              i++
              loop(i)
            })
          }
        }

        loop(0)
      })
    },
    onPaste: function (e) {
      //console.log('Called event paste');
      //console.log(e)
      var orgEvent = e.originalEvent;
      //console.log(orgEvent.clipboardData.items.length)
      
      this.getAssetDirPath((path) => {
        for (var i = 0; i < orgEvent.clipboardData.items.length; i++) {
          //console.log([orgEvent.clipboardData.items[i].kind
          //  , orgEvent.clipboardData.items[i].type])
          if (orgEvent.clipboardData.items[i].kind === "file"
                  && orgEvent.clipboardData.items[i].type.startsWith('image/')) {
            var imageFile = orgEvent.clipboardData.items[i].getAsFile();
            //imageFile.name = 'test.png'
            //console.log(imageFile.name)
            let filename = dayjs(new Date()).format('YYYY-MMDD-hhmmss') + '.png'
            console.log(path)
            console.log(filename)
            FileSystemHelper.copy(path, imageFile, filename, (imgUrl) => {
              let imgNode = $(`<img src="${imgUrl}" />`)[0]
              this.getPostSummerNote().summernote('insertNode', imgNode);
            })
            e.preventDefault();
            break;
          }
        }
      })
    },
    getPostSummerNoteConfig: function () {
      let config = {
        focus: true, // set focus to editable area after initializing summernote
        disableResizeEditor: true,
        placeholder: 'Post Body',
        toolbar: this.getPostSummerNoteToolbarConfig(),
        buttons: {
          copyHTML: () => {
            this.copyCode()
          }
        },
        //disableDragAndDrop: false,
        callbacks: {
          onImageUpload: (files) => {
            this.onImageUpload(files)
          },
          onDrop: (files) => {
            this.onDrop(files)
          },
          onPaste: (e) => {
            this.onPaste(e)
          },
          onChange: (contents) => {
            //console.log('post body onchange')
            DelayExecHelper.exec('postBody', 5, () => {
              $v.PostManager.updateEditingPostBody(contents)
            })
            //console.log('postBody:', contents);
          }
        }
      }
      return config
    },
    getSimpleSummerNoteConfig: function (fieldName, placeholder) {
      let config = {
        airMode: true,
        placeholder: placeholder,
        shortcuts: false,
        disableDragAndDrop: true,
        popover: {
          air: []
        },
        callbacks: {
          onChange: (contents) => {
            DelayExecHelper.exec(fieldName, 3, () => {
              $v.PostManager.updateEditingPost(fieldName, contents)
            })
            //console.log(fieldName + ':', contents)
          }
        }
      }
      return config
    },
    init: function (callback) {
      this.initSummerNote()
      this.setupPostData(callback)
    },
    initSummerNote: function () {
      if (this.summerNoteInited !== true) {
        this.getPostSummerNote().summernote(this.getPostSummerNoteConfig());

        this.getTitleSummerNote().summernote(this.getSimpleSummerNoteConfig('title', 'Post Title'));
        this.getLabelsSummerNote().summernote(this.getSimpleSummerNoteConfig('labels', 'Labels'));

        this.summerNoteInited = true
      }
    },
    setupPostData: function (callback) {
      
      $v.PostManager.getPost((post) => {
        //console.log(post.id)
        let postDate = $v.PostManager.displayDate(post.updateUnix)
        //console.log(postDate)
        // Setup title
        //let post = PostManager.methods.getPost()
        
        /*
        if (EditorManager.summerNoteInited === false) {
          $('#summernotePostTitle').html(post.title)
          $('#summernotePostLabels').html(post.labels)
          $('#summernotePostDate').html(postDate)
        }
        */
        this.setupPostTitle(post.title)
        this.setupPostLabels(post.labels)
        this.setupPostDate(postDate)

        $v.PostManager.getPostBody((postBody) => {
          //console.log(postBody)
          /*
          if (EditorManager.summerNoteInited === false) {
            $('#summernotePostBody').html(postBody)
          }
          */
          this.setupPostBody(postBody)
          FunctionHelper.triggerCallback(callback)
        })
      })
    },
    setupPostBody: function (value) {
      let summerNote = this.getPostSummerNote()
      if (this.summerNoteInited === false) {
        summerNote.html(value)
      }
      else {
        summerNote.summernote('code', value);
      }
    },
    setupPostTitle: function (value) {
      let summerNote = this.getTitleSummerNote()
      //console.log([this.summerNoteInited, value])
      if (this.summerNoteInited === undefined 
              || this.summerNoteInited === false) {
        summerNote.html(value)
      }
      else {
        summerNote.summernote('code', value);
      }
    },
    setupPostLabels: function (value) {
      let summerNote = this.getLabelsSummerNote()
      if (this.summerNoteInited === undefined 
              || this.summerNoteInited === false) {
        summerNote.html(value)
      }
      else {
        summerNote.summernote('code', value);
      }
    },
    setupPostDate: function (value) {
      this.getDateContainer().text(value)
    },
  }
}

//window.EditorManager = EditorManager
export default EditorManager