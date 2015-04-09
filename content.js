var tabindex = 0;

var fixControlElements = function (controlEles) {
  var ele = null;
  var length;
  var i = 0;

  length = controlEles.length;
  for (i = 0; i < length; i++) {
    ele = controlEles[i];
    var rightAttributes = [
      'placeholder',
      'aria-label',
      'aria-labelledby',
      'title'
    ];

    var checkAttr = rightAttributes.reduce(function (prev, cur) {
      return ele.getAttribute(prev) || ele.getAttribute(cur);
    });

    if (!checkAttr) {
      // Check parent and silbling.

      if (!ele.previousElementsSibling && !ele.nextElementSibling) {
        if (ele.parentElement.tagName !== 'LABEL') {
          // Correct it. using simple method.
          console.log(ele.outerHTML + ': is invalid');
          ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
        }
      } else {
        if (ele.previousElementsSibling && ele.previousElementSibling.tagName !== 'LABEL') {
          if (ele.nextElementSibling && ele.nextElementSibling.tagName !== 'LABEL') {
            if (ele.parentElement.tagName !== 'LABEL') {
              // Correct it. using simple method.
              console.log(ele.outerHTML + ': is invalid');
              ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
            }
          } else {
            if (ele.parentElement.tagName !== 'LABEL') {
              // Correct it. using simple method.
              console.log(ele.outerHTML + ': is invalid');
              ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
            }
          }
        } else if (ele.nextElementSibling && ele.nextElementSibling.tagName !== 'LABEL') {
          if (ele.parentElement.tagName !== 'LABEL') {
            // Correct it. using simple method.
            console.log(ele.outerHTML + ': is invalid');
            ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
          }
        }
      }
    }

    var curTabindex = ele.getAttribute('tabindex');

    if (curTabindex && curTabindex >= 0) {
      ele.setAttribute('tabindex', tabindex--);
    }
  }
};


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.text && msg.text == 'aria') {
    var i = 0;
    var ele = null;
    var length;

    // Check input elements.
    var inputEles = document.getElementsByTagName('input');
    fixControlElements(inputEles);

    // Check select elements.
    var selectEles = document.getElementsByTagName('select');
    fixControlElements(selectEles); 
    
    // length = inputEles.length;
    // for (i = 0; i < length; i++) {
    //   ele = inputEles[i];
    //   var rightAttributes = [
    //     'placeholder',
    //     'aria-label',
    //     'aria-labelledby',
    //     'title'
    //   ];

    //   var checkAttr = rightAttributes.reduce(function (prev, cur) {
    //     return ele.getAttribute(prev) || ele.getAttribute(cur);
    //   });

    //   if (!checkAttr) {
    //     // Check parent and silbling.

    //     if (!ele.previousElementsSibling && !ele.nextElementSibling) {
    //       if (ele.parentElement.tagName !== 'LABEL') {
    //         // Correct it. using simple method.
    //         console.log(ele.outerHTML + ': is invalid');
    //         ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
    //       }
    //     } else {
    //       if (ele.previousElementsSibling && ele.previousElementSibling.tagName !== 'LABEL') {
    //         if (ele.nextElementSibling && ele.nextElementSibling.tagName !== 'LABEL') {
    //           if (ele.parentElement.tagName !== 'LABEL') {
    //             // Correct it. using simple method.
    //             console.log(ele.outerHTML + ': is invalid');
    //             ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
    //           }
    //         } else {
    //           if (ele.parentElement.tagName !== 'LABEL') {
    //             // Correct it. using simple method.
    //             console.log(ele.outerHTML + ': is invalid');
    //             ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
    //           }
    //         }
    //       } else if (ele.nextElementSibling && ele.nextElementSibling.tagName !== 'LABEL') {
    //         if (ele.parentElement.tagName !== 'LABEL') {
    //           // Correct it. using simple method.
    //           console.log(ele.outerHTML + ': is invalid');
    //           ele.setAttribute('title', ele.getAttribute('id') || ele.getAttribute('name') || ele.getAttribute('value'));
    //         }
    //       }
    //     }
    //   }

    //   var curTabindex = ele.getAttribute('tabindex');

    //   if (curTabindex && curTabindex >= 0) {
    //     ele.setAttribute('tabindex', tabindex--);
    //   }
    // }

    // Check images.
    var imgEles = document.getElementsByTagName('img');
    length = imgEles.length;
    for (i = 0; i < length; i++) {
      ele = imgEles[i];
      if (!ele.getAttribute('alt')) {
        var roleValue = ele.getAttribute('role');
        if (!roleValue || roleValue !== 'presentation') {
          ele.setAttribute('role', 'presentation');
        }
      }

      var curTabindex = ele.getAttribute('tabindex');

      if (curTabindex && curTabindex >= 0) {
        ele.setAttribute('tabindex', tabindex--);
      }
    }

    // Check media tag, video
    var videoEles = document.getElementsByTagName('video');
    length = videoEles.length;

    for (i = 0; i < length; i++) {
      ele = videoEles[i];
      if (ele.previousElementSibling && ele.previousElementSibling.tagName !== 'LABEL') {
        if (ele.nextElementSibling && ele.nextElementSibling.tagName !== 'LABEL') {
          var lable = document.createElement('label');
          label.setAttribute('id', ele.getAttribute('id'));
          ele.parentElement.insertBefore(label, ele);
        }
      }

      var curTabindex = ele.getAttribute('tabindex');

      if (curTabindex && curTabindex >= 0) {
        ele.setAttribute('tabindex', tabindex--);
      }
    }

    // Check title tag.
    var titleEles = document.getElementsByTagName('title');
    if (titleEles.length === 0) {
      var head = document.getElementsByTagName('head')[0];
      var title = document.createElement('title');
      title.text = msg.title;
      head.appendChild(title);
    }

    // Check a tag.
    var linkEles = document.getElementsByTagName('a');
    length = linkEles.length;
    for (i = 0; i < linkEles.length; i++) {
      ele = linkEles[i];
      if (!ele.getAttribute('alt')) {
        ele.setAttribute('alt', ele.getAttribute('href') || "");
      }

      var curTabindex = ele.getAttribute('tabindex');

      if (curTabindex && curTabindex >= 0) {
        ele.setAttribute('tabindex', tabindex--);
      }
    }
  }
});
