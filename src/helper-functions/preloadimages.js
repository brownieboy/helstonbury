import { ImageCache } from "react-native-img-cache";
import FetchBlob from "react-native-fetch-blob";

function preloadImage(url) {
  return new Promise(function(resolve, reject) {
    // Create instance of ImageCache
    const instance = ImageCache.get();
    let finished = false;

    // Create interval to check if download has finished
    const downloadEndedIntervalId = setInterval(() => {
      if (instance.cache[url].downloading) {
        // Wait 50 ms after the download has finished to ensure that callback could be triggered
        setTimeout(() => {
          if (!finished) {
            // Promise not yet resolved => download seems to be failed
            finished = true;
            clearInterval(downloadEndedIntervalId);

            reject(new Error("DownloadFailed"));
          }
        }, 50);
      }
    }, 100);

    // Callback of download
    const callback = localUrl => {
      if (!finished) {
        finished = true;
        clearInterval(downloadEndedIntervalId);

        // Get stats of file (file exists, even if download failed, in case of a succesfull resolved request)
        FetchBlob.fs.stat(localUrl).then(stat => {
          // Check if downloaded file is larger then 0 bytes
          if (stat && stat.size > 0) {
            // console.log("preloaded " + localUrl);
            resolve(localUrl);
          } else {
            // File downloaded, but without content
            reject(new Error("DownloadFailed"));
          }
        });
      }
    };

    // Execute download of image
    instance.on(
      {
        uri: url
      },
      callback,
      true
    );
  });
}

const preloadImages = imageUrlsArray => {
  for (const imageUrl of imageUrlsArray) {
    preloadImage(imageUrl);
  }
};

export default preloadImages;
