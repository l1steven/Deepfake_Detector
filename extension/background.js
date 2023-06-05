/*chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.desktopCapture.chooseDesktopMedia([
        //"screen",
       // "window",
        "tab"
    ], tab, (streamId) => {
        //check whether the user canceled the request or not
        if (streamId && streamId.length) {
            setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, {name: "stream", streamId}, (response) => console.log(response))
            }, 200)
        }
    })
})
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if (message.name === 'download' && message.url) {
        chrome.downloads.download({
            filename: 'screenshot.png',
            url: message.url
        }, (downloadId) => {
            senderResponse({success: true})
        })

        return true;
    }
})*/
var convertToBase64 = function(url, imagetype, callback){

    var img = document.createElement('IMG'),
        canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        data = '';

    // Set the crossOrigin property of the image element to 'Anonymous',
    // allowing us to load images from other domains so long as that domain 
    // has cross-origin headers properly set

    img.crossOrigin = 'Anonymous'

    // Because image loading is asynchronous, we define an event listening function that will be called when the image has been loaded
    img.onLoad = function(){
        // When the image is loaded, this function is called with the image object as its context or 'this' value
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        data = canvas.toDataURL(imagetype);
        callback(data);
    };

    // We set the source of the image tag to start loading its data. We define 
    // the event listener first, so that if the image has already been loaded 
    // on the page or is cached the event listener will still fire

    img.src = url;
};

// Here we define the function that will send the request to the server. 
// It will accept the image name, and the base64 data as arguments

var sendBase64ToServer = function(name, base64){
    var httpPost = new XMLHttpRequest(),
        path = "https://deepfake.sites.tjhsst.edu/uploadimage/",
        data = JSON.stringify({image: base64});
    httpPost.onreadystatechange = function(err) {
            if (httpPost.readyState == 4 && httpPost.status == 200){
                console.log(httpPost.responseText);
            } else {
                console.log(err);
            }
        };
    // Set the content type of the request to json since that's what's being sent
    httpPost.setHeader('Content-Type', 'application/json');
    httpPost.open("POST", path, true);
    httpPost.send(data);
};

// This wrapper function will accept the name of the image, the url, and the 
// image type and perform the request

var uploadImage = function(src, name, type){
    convertToBase64(src, type, function(data){
        sendBase64ToServer(name, data);
    });
};

var count=0;
var downloader;
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if(message.toggle=="start" && count==0){
        chrome.browserAction.setIcon({path:"/icons/alarm_icon.png"});
        count=count+1;
        downloader=setInterval(() => {

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: "snip"}, function(response) {
                    var views = chrome.extension.getViews({
                        type: "popup"
                    });
                    for (var i = 0; i < views.length; i++) {
                        views[i].document.getElementById('thumbnail').src = response.url;
                    }
                var xhr=new XMLHttpRequest();
                //xhr.setHeader('Content-Type', 'application/json');
                xhr.open('POST',"http://7745-35-201-181-121.ngrok.io/uploadimage",true);
                xhr.send(JSON.stringify(response.url));
                xhr.onreadystatechange=function(err){
                    if (xhr.readyState == 4 && xhr.status == 200){
                        // var views = chrome.extension.getViews({
                        //     type: "popup"
                        // });
                        for (var i = 0; i < views.length; i++) {
                            views[i].document.getElementById('thumbnail').src = response.url;
                            //document.getElementById('video111').src = response.url;
                            var video111 = document.getElementById('video111')
                            if(video111) video111.src = response.url;
                            //print(xhr.responseText)
                            var s='Probability of deepfake: ' +xhr.responseText
                            views[i].document.getElementById('accuracy').innerHTML=s;
                            chrome.storage.local.set({acc: s});
                            if(parseFloat(xhr.responseText) > 0.5){//change to 0.5 for demo
                                chrome.tabs.create({'url': chrome.extension.getURL('detection.html')});
                            }
                        }
                    }
                }
                });  
            });




            /*chrome.tabs.captureVisibleTab((screenshotUrl) => {
                const viewTabUrl = chrome.extension.getURL('popup.html?id=' + id++)
                let targetId = null;
            chrome.tabs.onUpdated.addListener(function listener(tabId,     changedProps) {
            if (tabId != targetId || changedProps.status != "complete")
                    return;
            chrome.tabs.onUpdated.removeListener(listener);
            const views = chrome.extension.getViews();
                for (let i = 0; i < views.length; i++) {
                    let view = views[i];
                    if (view.location.href == viewTabUrl) {
                    view.setScreenshotUrl(screenshotUrl);
                    break;
                    }
                }
                });
                chrome.downloads.download({
                    url: screenshotUrl,
                    filename: 'screenshot.png'
                   
                });

                var xhr=new XMLHttpRequest();
                //xhr.setHeader('Content-Type', 'application/json');
                xhr.open('POST',"https://deepfake.sites.tjhsst.edu/uploadimage",true);
                xhr.send(JSON.stringify(screenshotUrl));*/

                  
                
            
            //});
        },5000);

    }
    else if(message.toggle=="stop" && count>0)
    {
        chrome.browserAction.setIcon({path:"/icons/icon.png"});
        clearInterval(downloader);
        count=0;
    }
    return true
});

let id = 100;

//chrome.browserAction.onClicked.addListener(() => {
// setInterval(() => {

//     chrome.tabs.captureVisibleTab((screenshotUrl) => {
//         const viewTabUrl = chrome.extension.getURL('popup.html?id=' + id++)
//         let targetId = null;
//     chrome.tabs.onUpdated.addListener(function listener(tabId,     changedProps) {
//     if (tabId != targetId || changedProps.status != "complete")
//             return;
//     chrome.tabs.onUpdated.removeListener(listener);
//     const views = chrome.extension.getViews();
//         for (let i = 0; i < views.length; i++) {
//             let view = views[i];
//             if (view.location.href == viewTabUrl) {
//             view.setScreenshotUrl(screenshotUrl);
//             break;
//             }
//         }
//         });
//         chrome.downloads.download({
//             url: screenshotUrl,
//             filename: 'screenshot.png'
           
//         })
//     /*chrome.tabs.create({url: viewTabUrl}, (tab) => {
//         targetId = tab.id;
//         });*/
//     });
// },10000);
