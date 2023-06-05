from pytube import YouTube
import urllib.request
import pathlib
import json
def main():
   youtubeurl="https://youtu.be/ZkblR_hE3bc"

   yt=YouTube(youtubeurl)
   urllib.request.urlretrieve(yt.thumbnail_url, "thumbnail.jpg")
   f=open("title.txt","w")
   f.write(yt.title)
   d={"title":yt.title}
   data="data="+str(d)
   j=open("title.json","w")
   json.dump(data,j)
if __name__=="__main__":
   main()