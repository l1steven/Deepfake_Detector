
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if(request.action=='snip'){
         const video = document.querySelector("video");

         const canvas = document.createElement("canvas");
         // scale the canvas accordingly
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         // draw the video at that frame
         canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
         // convert it to a usable data URL
         const dataURL = canvas.toDataURL();
         chrome.storage.local.set({url: dataURL});
         sendResponse({url:dataURL});
      }
   }
);


//let title="aa";

// const url=window.location.href;
// chrome.runtime.onMessage.addListener(
//    (request, sender, sendResponse)=> {func1(request, sender, sendResponse)}
// );


// async function func1(request, sender, sendResponse) {
//    if(request.method=="changeYoutube")
//    {
//      // $.ajax({
//      //   type:"POST",
//      //   url: "/videoscript.py",
//      //   async:false,
//      //   data: {param:input}

//      // });
//      yt_url="https://youtu.be/E-ea4FW7uHQ";
//      url="https://deepfake.sites.tjhsst.edu/title?id=" +yt_url;
     
//      rsp = await fetch(url);
//      title = await rsp.text();

//     console.log("t2:"+ title)
//      //title=JSON.stringify(title)
//      sendResponse({method:"changeYoutube",video_title:title});
//    }
//     else if(request.method == "changeIcon"){
//         //document.body.innerText = "Foot";
//         alert("Deepfake detected! Refer to the extension for more information.");
//         sendResponse({method: "changeIcon"}); //same as innerText
//     }
// }

// async function func2(request, sender, sendResponse) {
//    if(request.method=="changeYoutube")
//    {
//      // $.ajax({
//      //   type:"POST",
//      //   url: "/videoscript.py",
//      //   async:false,
//      //   data: {param:input}

//      // });
//      yt_url="https://youtu.be/E-ea4FW7uHQ";
//      url="https://deepfake.sites.tjhsst.edu/title?id=" +yt_url;
     
//      fetch(url).then(function (response) {
//       // The API call was successful!
//       return response.text();
//    }).then(html=>
//     {
//       // This is the HTML from our response as a text string
//       title.push(html);
//       console.log("t1:"+title);

//       sendResponse({method:"changeYoutube",video_title:html});
//    }).catch(function (err) {
//       // There was an error
//       console.warn('Something went wrong.', err);
//    });
//    console.log("t2:"+ title)
//      //title=JSON.stringify(title)
//      sendResponse({method:"changeYoutube",video_title:title[0]});
//    }
//     else if(request.method == "changeIcon"){
//         //document.body.innerText = "Foot";
//         alert("Deepfake detected! Refer to the extension for more information.");
//         sendResponse({method: "changeIcon"}); //same as innerText
//     }
// }
/*chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if(request.name==='stream' && request.streamId){
         let track, canvas
            navigator.mediaDevices.getUserMedia({
            video: {
               mandatory: {
                     chromeMediaSource: 'desktop',
                     chromeMediaSourceId: message.streamId
               },
            }
         }).then((stream) => {
            track = stream.getVideoTracks()[0]
            const imageCapture = new ImageCapture(track)
            return imageCapture.grabFrame()
         }).then((bitmap) => {
            track.stop();
            canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            let context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            return canvas.toDataURL();
        }).then((url) => {
         chrome.runtime.sendMessage({name: 'download', url}, (response) => {
            if (response.success) {
                alert("Screenshot saved");
            } else {
                alert("Could not save screenshot")
            }
            canvas.remove()
            senderResponse({success: true})
        })
         }).catch((err) => {
            alert("Could not take screenshot")
            senderResponse({success: false, message: err})
         })
      return true;
      }*/
      /*if(request.method=="changeYoutube")
      {

        //yt_url="https://youtu.be/E-ea4FW7uHQ";
        yt_url=location.href;
             ti_url="https://deepfake.sites.tjhsst.edu/title?id=" +yt_url;
             th_url="https://deepfake.sites.tjhsst.edu/thumbnail?id=" +yt_url;
             var title="lol"
         //     fetch(url).then(function (response) {
         //      // The API call was successful!
         //      return response.json();
         //   }).then(html=>
         //    {
         //      // This is the HTML from our response as a text string
         //      console.log(html);
         //      title=html                  
         //   }).catch(function (err) {
         //      // There was an error
         //      console.warn('Something went wrong.', err);
         //   });

           //title=JSON.stringify(title)
        sendResponse({method:"changeYoutube",title_url:ti_url,thumbnail_url:th_url});
      }
       else if(request.method == "changeIcon"){
           //document.body.innerText = "Foot";
           alert("Deepfake detected! Refer to the extension for more information.");
           sendResponse({method: "changeIcon"}); //same as innerText
       }
      //  if(request.method=="changeYoutube")
      //  {
      //    $.ajax({
      //      type:"POST",
      //      url: "/videoscript.py",
      //      data: {param:input},
      //      success: callback
      //    });
      //    sendResponse({method:"changeYoutube"});*/
      //  }
  // }
//);