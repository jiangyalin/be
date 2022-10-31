//-------------------- 右键菜单演示 ------------------------//
chrome.contextMenus.create({
  title: '测试右键菜单',
  onclick: (e, a, b) => {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'icon.png',
      title: '这是标题',
      message: '您刚才点击了自定义右键菜单！'
    })
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自content-script的消息：')
  console.log(request, sender, sendResponse)
  sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request))
})

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response)
    })
  })
}

sendMessageToContentScript({cmd: 'test', value: '你好，我是popup！'}, function (response) {
  console.log('来自content的回复：' + response)
})
