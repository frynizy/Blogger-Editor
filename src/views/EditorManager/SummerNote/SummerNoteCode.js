import SummerNoteHelper from './SummerNoteHelper.js'

let SummerNoteCode = {
  insertMore: function (context) {
    let contents = SemanticUIHelper.wrapNIWSF(`<i class="ellipsis horizontal icon"></i> More`)
    let tooltip = 'Insert More'
    let click = () => {
      this.insertMoreClick()
    }
    return SummerNoteHelper.buildButton(contents, tooltip, click)
  },
  insertMoreClick: function () {
    let postBody = $v.EditorManager.FieldPostBody
    postBody.getElement().find('a[name="more"]').remove()
    //postBody.insert('<a name="more"></a><!--more-->')
    //postBody.insert('<hr />')
    //postBody.insert('<!--more-->')
    //postBody.insert('<a name="more"></a>')
    
    //postBody.insert('<p><a name="more"></a><!--more--></p>')
    //postBody.insert('<hr />')
    //postBody.insert('<h2>[H2 Title]</h2>')
    postBody.insert('<p><a name="more"></a><!--more--></p><hr /><h2>[H2 Title]</h2>')
  },
  CopyCode: function (context) {
    let contents = SemanticUIHelper.wrapNIWSF(`<i class="code icon"></i>Copy Code`)
    let tooltip = 'Copy Code'
    let click = () => {
      this.CopyCodeClick()
    }
    return SummerNoteHelper.buildButton(contents, tooltip, click)
  },
  CopyCodeClick: function () {
    let postBody = $v.EditorManager.FieldPostBody.getElement()
    postBody = this.CleanCodeClick(postBody)

    // 請把有http的部分全部換掉
    postBody = BloggerImageHelper.filterPostBody(postBody.clone())

    //let code = this.getPostSummerNote().summernote('code');
    let code = postBody.html()

    //console.log(code)

    code = code.replace(`<p><a name="more"></a><!--more--></p>`, '<!--more-->')
    code = code.replace(`<a name="more"></a><!--more--></p>`, '</p><!--more-->')
    code = code.replace(`<p><a name="more"><br></a></p>`, '<!--more-->')
    code = code.replace(`<a name="more"></a>`, '')
    code = code.replace(`<p><!--more--></p>`, '<!--more-->')
    code = code.replace(`<!--more--><hr></p>`, '</p><!--more--><hr />')
    
    //code = code.replace(`<br /></p>`, '</p>')
    //code = code.replace(`<br /></`, '</')
    
    CopyPasteHelper.copyPlainText(code)
  },
  CleanCode: function (context) {
    let contents = SemanticUIHelper.wrapNIWSF(`<i class="eraser icon"></i>Clean`)
    let tooltip = 'Clean Code'
    let click = () => {
      this.CleanCodeClick()
    }
    return SummerNoteHelper.buildButton(contents, tooltip, click)
  },
  skipTagList: ['hr', 'td', 'tr', 'th', 'caption', 'code', 'table'],
  CleanCodeClick: function (postBody) {
    //let code = this.getPostSummerNote().summernote('code');
    if (postBody === undefined) {
      postBody = $v.EditorManager.FieldPostBody.getElement()
    }
    
    let children = postBody.children()

    // Clean empty ndoes
    children.each((i, child) => {
      //console.log(child.innerHTML.trim())
      let $child = $(child)
      let tagName = child.tagName.toLowerCase()
      if (this.skipTagList.indexOf(tagName) > -1) {
        return
      }
      
      let html = child.innerHTML.trim().toLowerCase()
      if (html === '' || html === '<br>') {
        $child.remove()
        return
      }

      let subchild = $child.children()
      //console.log([subchild.length, subchild.eq(0)[0], subchild.eq(0).attr('tagName'), subchild.eq(0).prop('tagName')])
      //return
      //console.log([subchild.length, subchild.eq(0).prop('tagName').toLowerCase()])
      /*
      let l = 0
      let firstTagName = subchild.eq(l).prop('tagName')
      while (firstTagName !== undefined 
              && firstTagName.toLowerCase() === 'br') {
        subchild.eq(l).remove()
        l++
        if (l === subchild.length) {
          break
        }
        firstTagName = subchild.eq(l).prop('tagName')
      }
      */

      /*
      l = subchild.length - 1
      let lastTagName = subchild.eq(l).prop('tagName')
      while (lastTagName !== undefined 
              && lastTagName.toLowerCase() === 'br') {
        subchild.eq(l).remove()
        l--
        if (l === 0) {
          break
        }
        lastTagName = subchild.eq(l).prop('tagName')
      }
      */

      //html = child.innerHTML.trim().toLowerCase()
      //console.log(html)
      while (html.startsWith('<br>')) {
        $child.find('br:first').remove()
        html = child.innerHTML.trim().toLowerCase()
      }
      while (html.endsWith('<br>')) {
        $child.find('br:last').remove()
        html = child.innerHTML.trim().toLowerCase()
      }
      
      subchild = $child.contents()
      if (subchild.length === 0) {
        $(child).remove()
      }
    })  // children.each((i, child) => {
    
    postBody.find(`[style*="font-family:"],[style*="font-size:"],[style*="text-indent:"],[style*="background-color:"]`).each((i, ele) => {
      ele = $(ele)
      ele.css('font-family', '')
      ele.css('font-size', '')
      ele.css('text-indent', '')
      let backgroundColor = ele.css('background-color').toLowerCase()
      if (backgroundColor === 'transparent' || backgroundColor === 'rgba(0, 0, 0, 0)') {
        ele.css('background-color', '')
      }
      let style = ele.attr('style')
      if (style !== undefined && (style.trim() === '' || style === ';')) {
        ele.removeAttr('style')
      }
    })
    
    postBody.find(`[align="left"]`).each((i, ele) => {
      ele = $(ele)
      if (ele.attr('align') === 'left') {
        ele.removeAttr('align')
      }
    })
    
    postBody.find(`a[href*=".googleusercontent.com/"]`).each((i, ele) => {
      let link = ele.href
      link = link.slice(link.indexOf('//'))
      link = link.replace('/s1600-h/', '/s1600/')
      ele.href = link
    })
    
    postBody.find(`img[src*=".googleusercontent.com/"]`).each((i, ele) => {
      let link = ele.src
      link = link.slice(link.indexOf('//'))
      link = link.replace('/s1600-h/', '/s1600/')
      ele.src = link
    })
    
    postBody.find(`[style=""]`).removeAttr('style')
    
    postBody.find(`.note-editor-comment`).removeAttr('title').removeClass('note-editor-comment')
    
    postBody.find('span').each((i, span) => {
      let outerHTML = span.outerHTML
      if (outerHTML.startsWith('<span>')) {
        //outerHTML = outerHTML.slice('<span>'.length, (outerHTML - '</span>'.length))
        //span.replaceWith()
        span.outerHTML = span.innerHTML
      }
    })
    
    postBody.children('p').each((i, p) => {
      if (p.innerHTML === '') {
        $(p).remove()
      }
      else {
        $(p).children('p').each((i, p2) => {
          if (p2.innerHTML.trim() !== '') {
            $(p2).replaceWith(p2.innerHTML)
          }
          else {
            $(p2).remove()
          }
        })
      }
    })
    
    return postBody
  },
  SaveSnippet: function (context) {
    let contents = SemanticUIHelper.wrapNIWSF(`<i class="cut icon"></i>Snippet`)
    let tooltip = 'Save Snippet'
    let click = () => {
      this.SaveSnippetClick()
    }
    return SummerNoteHelper.buildButton(contents, tooltip, click)
  },
  SaveSnippetClick: function () {
    // 先看有沒有選取
    let FieldPostBody = $v.EditorManager.FieldPostBody
    if (FieldPostBody.hasSelectedRange() === false) {
      $v.SnippetInserter.open()
      return
    }
    
    //console.log('#TODO SaveSnippetClick')
    let nodeText = FieldPostBody.getSelectedNodeAndRemove()
    //console.log(node)
    let SnippetInserter = $v.EditorManager.SnippetInserter
    SnippetInserter.saveSnippet(nodeText, () => {
      SnippetInserter.loadSnippet()
    })
  }
}

export default SummerNoteCode