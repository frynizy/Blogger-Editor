import Vue from 'vue'

//require('./vendor/garlic/garlic.min.js')
require('./vendor/dayjs/dayjs.min.js')

//require('./vendor/popper/popper.min.js')
//require('./vendor/bootstrap/js/bootstrap.js')

require('./helpers/FunctionHelper.js')
require('./helpers/CopyPasteHelper.js')
require('./helpers/FileSystemHelper.js')
require('./helpers/TemplateHelper.js')
require('./helpers/FileSystemHelper.js')
require('./helpers/WebSQLDatabaseHelper.js')
require('./helpers/DelayExecHelper.js')


import PostManagerComponent from './views/PostManager/PostManager.vue'
new Vue({
  el: "#PostManager",
  render: h => h(PostManagerComponent),
})

import EditorManagerComponent from './views/EditorManager/EditorManager.vue'
new Vue({
  el: "#EditorManager",
  render: h => h(EditorManagerComponent),
})

import ThemeManagerComponent from './views/ThemeManager/ThemeManager.vue'
new Vue({
  el: "#ThemeManager",
  render: h => h(ThemeManagerComponent),
})

//import VueHelper from './helpers/VueHelper.js'
//let VueHelper = require('./helpers/VueHelper.js')
//require('./helpers/VueHelper.js')
//VueHelper.render('#NavBar', require('./views/NavBar/NavBar.vue'))
import NavBarComponent from './views/NavBar/NavBar.vue'
//import NavBar from './views/NavBar/NavBar.vue'
new Vue({
  el: "#NavBar",
  render: h => h(NavBarComponent),
})

//require('./views/PostsManager/PostsManager.js')
require('./views/ThemeManager/ThemeManager.js')
//require('./views/EditorManager/EditorManager.js')
//require('./views/EditorManager/SummerNotePostTitleHelper.js')
//require('./views/EditorManager/SummerNotePostBodyHelper.js')

//require('./vendor/semantic-ui-niwsf/semantic.niwsf.js')
