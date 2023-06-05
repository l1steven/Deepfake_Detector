document.addEventListener('DOMContentLoaded', function() {
   //var changeButton = document.getElementById('changeicon');
   var count=0;
   var max=10;
   /*changeButton.addEventListener('click', function() {
      if(count%2==0)
      {
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeIcon"}, function(response) {
               if(response.method=="changeIcon")
               {
                  chrome.browserAction.setIcon({path:"/icons/alarm_icon.png"});
                  //alert("Deepfake detected! Refer to the extension for more information.");
               }
            });
         });
         if(count>10)
         {
            count=0;
         }
      }
      else
      {
         chrome.browserAction.setIcon({path:"/icons/icon.png"});
      }
      count=count+1;
   }, false);*/
   chrome.storage.local.get("url", function(data) {
      if(typeof data.url == "undefined") {
          // That's kind of bad
      } else {
          setScreenshotUrl(data.url);
      }
  });
  chrome.storage.local.get("acc", function(data) {
   if(typeof data.acc == "undefined") {
       // That's kind of bad
   } else {
      var temp = document.getElementById('accuracy')
      if (temp) temp.innerHTML = data.acc;
   }
});
   var toggleOn=document.getElementById("toggleon");
   toggleOn.addEventListener('click',function(){
      chrome.runtime.sendMessage({toggle:"start"},
        function (response) {
            
        });
   })
   var toggleOff=document.getElementById("toggleoff");
   toggleOff.addEventListener('click',function(){
      chrome.runtime.sendMessage({toggle:"stop"},
        function (response) {
            
        });
   })
   //if(url.includes("youtube")){
      /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         chrome.tabs.sendMessage(tabs[0].id, {method: "changeYoutube"}, function(response) {
            if(response.method=="changeYoutube")
            {
               fetch(response.title_url).then(function (response) {
                  return response.text();
               }).then(function(html)
                {;
                  document.getElementById('video_title').innerHTML=html;               
               }).catch(function (err) {
                  console.warn('Something went wrong.', err);
               });

               fetch(response.thumbnail_url).then(function (response) {
                  return response.text();
               }).then(function(html)
                {;
                  document.getElementById('thumbnail').src=html;              
               }).catch(function (err) {
                  console.warn('Something went wrong.', err);
               });
               //document.getElementById('thumbnail').src="https://i.ytimg.com/vi/tZXjySP0BtM/sddefault.jpg";           
              // document.getElementById('video_title').innerHTML=response.video_title;
            }
         });
      });*/
  //}
   // if(url.includes("youtube"))
   // {
   //    var thumbnail;
   //    var title;
   //    youtube.getInfo(url,function(err,info){
   //       if(err) throw err;
   //       thumbnail=info.thumbnail;
   //       title=info.title;
   //    });
   //    document.getElementById('thumbnail').src=thumbnail;
   //    document.getElementById('video_title').innerHTML=title;
   // }
}, false);



function setScreenshotUrl(url) {
   console.log(document.getElementById('thumbnail'))
   console.log(document.getElementById('video111'))
   console.log('BUFHRFURHFURHF')
   var thumbnail = document.getElementById('thumbnail')
   if(thumbnail) thumbnail.src = url;

   var video111 = document.getElementById('video111')
   if(video111) video111.src = url;

 }
