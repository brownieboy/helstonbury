import firebase, { extendedConfig as firebaseConfig } from "./firebase.js";
import { AsyncStorage } from "react-native";

const storageRef = firebase.storage().ref();
const bandsDataKey = "hb:bandsData";

// const images = [
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2F508px-ACDC_In_Tacoma_2009.jpg?alt=media&token=3fa46b14-5e83-4306-be6a-2bc36b199575",
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2FOne_Direction_2015.jpg?alt=media&token=b17465cc-5a03-40b6-8227-6ca715ce04d1",
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2Fcourtney.jpg?alt=media&token=a202e934-24e5-4da0-8a59-1949d34eb51c"
// ];

import preload from "../helper-functions/preloadimages.js";
// preload(images);

class bandsApi {
  // So this is returning a function, which returns a Promise, I think...
  // I've addeda setTimeout on the value.json() to simulate a network delay,
  // see https://stackoverflow.com/questions/39495551/add-delay-to-javascript-method-that-returns-promise
  // static getBandsData = () =>
  // fetch("/data/peopleData.json")
  //   // .then(response => response.json())
  //   .then(
  //     value =>
  //       new Promise(resolve => setTimeout(() => resolve(value.json()), 500))
  //   )
  //   .catch(error => {
  //     console.log(`getAllPeople() error=${error}`);
  //     return error;
  //   });

  // static cacheImages(images) {
  //   return dispatch => {
  //     return forEachIndexed((image, index) => {
  //       const observer = () => {
  //         dispatch(updateCacheProgress(index));
  //         ImageCache.get().dispose({ uri: image.url }, observer);
  //       };
  //       ImageCache.get().on({ uri: image.url }, observer, true);
  //     }, images);
  //   };
  // }

  static addFirebaseImages = (bandsData, imagePath, imageType) => {
    // const band = bandsData[0];
    // console.log(`acdc path=${firebaseConfig.thumbsPath}/${band.thumb}`);
    const promises = bandsData.map(band => {
      if (band[imageType]) {
        return storageRef
          .child(`${imagePath}/${band[imageType]}`)
          .getDownloadURL()
          .then(url => {
            band[`${imageType}FullUrl`] = url;
            return band;
          })
          .catch(error => console.log("storageRef..then error" + error));
      }
      return band;
    });

    return Promise.all(promises).then(results => {
      console.log(results);
      console.log(
        "promises.all results=" + JSON.stringify(results[0], null, 4)
      );
      console.log("promises.all results");
      return results;
    });
  };

  static doPreloadImages = bandsData => {
    let newUrlsArray;
    // var merged = [].concat.apply([], arrays);

    const arrayOfImageUrls = bandsData.map(bandsDataItem => {
      newUrlsArray = [];
      if (bandsDataItem.thumbFullUrl) {
        newUrlsArray.push(bandsDataItem.thumbFullUrl);
      }

      if (bandsDataItem.cardFullUrl) {
        newUrlsArray.push(bandsDataItem.cardFullUrl);
      }
      return newUrlsArray;
    });

    const arrayOfImageUrlsMerged = [].concat.apply([], arrayOfImageUrls);
    preload(arrayOfImageUrlsMerged);
    console.log("arrayOfImageUrlsMerged=" + JSON.stringify(arrayOfImageUrlsMerged, null, 4));
  };

  static getBandsDataOnline = () =>
    new Promise(resolve => {
      const itemsRef = firebase.database().ref("bandsList");
      itemsRef.on("value", snapshot => {
        const items = snapshot.val();
        // console.log("fb items = " + JSON.stringify(items));
        // console.log("fb items = " + items);

        // Static, so no 'this'
        return (
          bandsApi
            // First get the band thumbnails
            .addFirebaseImages(items, firebaseConfig.thumbsPath, "thumb")
            // then get the band image cards
            .then(newItems =>
              bandsApi.addFirebaseImages(
                newItems,
                firebaseConfig.cardsPhotoPath,
                "card"
              )
            )
            .then(newItems2 => {
              // console.log("newItems2=" + JSON.stringify(newItems2, null, 4));
              bandsApi.setBandsDataToAsyncStorage(newItems2); // No need to wait for this.
              bandsApi.doPreloadImages(newItems2);
              return resolve(newItems2);
            })
        );
      });
    });

  static clearAsyncStorage = () => {
    // Don't need to bother with callback
    AsyncStorage.removeItem(bandsDataKey, () =>
      console.log("clearAsyncStorage finished")
    );
  };

  static setBandsDataToAsyncStorage = async bandsData => {
    console.log("called setBandsDataToAsyncStorage()");
    try {
      await AsyncStorage.setItem(
        bandsDataKey,
        JSON.stringify(bandsData)
      );
    } catch (error) {
      // Error saving data
      console.log("setBandsDataToAsyncStorage() error saving data " + error);
    }
  };

  static getBandsDataFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(bandsDataKey);
      if (value !== null) {
        // We have data!!
        console.log("local data present is " + value.substring(1, 20));
        return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log("getBandsDataFromAsyncStorage()..error=" + error);
      return null;
    }
  };

  static getBandsData = async (forceRefreshFromServer = false) => {
    if (forceRefreshFromServer) {
      // Easy one.  No need to check l
      return bandsApi.getBandsDataOnline();
    }
    const localStorageData = await bandsApi.getBandsDataFromAsyncStorage();
    if (!localStorageData) {
      console.log("error in localStorageData, going to server");
      return bandsApi.getBandsDataOnline();
    }
    console.log(
      "localStorageData returns is " + localStorageData.substring(1, 20)
    );
    return JSON.parse(localStorageData);
  };
}

export default bandsApi;
