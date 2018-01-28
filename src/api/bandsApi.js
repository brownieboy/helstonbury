// import firebase, { extendedConfig as firebaseConfig } from "./firebase.js";
// import { extendedConfig as firebaseConfig } from "./firebase.js";
import { AsyncStorage } from "react-native";

const bandsDataKey = "hb:bandsData";

import bandsDataWithImagePaths from "../data/bands-data-with-image-paths.json";

// const images = [
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2F508px-ACDC_In_Tacoma_2009.jpg?alt=media&token=3fa46b14-5e83-4306-be6a-2bc36b199575",
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2FOne_Direction_2015.jpg?alt=media&token=b17465cc-5a03-40b6-8227-6ca715ce04d1",
//   "https://firebasestorage.googleapis.com/v0/b/helstonbury-cadbf.appspot.com/o/img%2Fbands%2Fcards%2Fcourtney.jpg?alt=media&token=a202e934-24e5-4da0-8a59-1949d34eb51c"
// ];

// import preload from "../helper-functions/preloadimages.js";
// preload(images);

class bandsApi {
  // So this is returning a function, which returns a Promise, I think...
  // I've addeda setTimeout on the value.json() to simulate a network delay,
  // see https://stackoverflow.com/questions/39495551/add-delay-to-javascript-method-that-returns-promise
  /*
  static getBandsData = () =>
    fetch("/data/bands-data-with-image-paths.json")
      .then(response => response.json())
      // .then(
      //   value =>
      //     new Promise(resolve => setTimeout(() => resolve(value.json()), 100))
      // )
      .catch(error => {
        console.log(`getBandsData() error=${error}`);
        return error;
      });
      */

  // Returns a promise
  static fetchBandsData = () =>
    new Promise(resolve =>
      setTimeout(() => resolve(bandsDataWithImagePaths, 500))
    );
}

export default bandsApi;
