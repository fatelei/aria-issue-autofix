var neteaseUrlRegex = /^https?:\/\/(?:[^\.]+\.)?163\.com/;
var sinaUrlRegex = /^https?:\/\/(?:[^\.]+\.)?sina\.com\.cn/;

chrome.browserAction.onClicked.addListener(function (tab) {
  var title;

  if (neteaseUrlRegex.test(tab.url)) {
    title = '网易新闻';
  } else {
    title = '新浪新闻';
  }
  chrome.tabs.sendMessage(tab.id, {text: 'aria', title: title});
});
