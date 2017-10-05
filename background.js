/*
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
    
	sendServiceRequest(response.data);
  });
});

function sendServiceRequest(selectedText) {
  //var serviceCall = 'http://www.google.com/search?q=' + selectedText;
	
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    bkg.console.log(selectedText);
	bkg.console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	//alert(serviceCall);
  	//chrome.tabs.create({url: serviceCall});
	

}
*/