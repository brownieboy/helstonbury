import { Linking, Platform } from "react-native";

const openFacebookLink = facebookId => {
  const FANPAGE_URL_FOR_APP = `fb://profile/${facebookId}`;
  const FANPAGE_URL_FOR_BROWSER = `https://fb.com/${facebookId}`;

  // console.log("openFacebookLink Platform.OS=" + Platform.OS);

  Linking.canOpenURL(FANPAGE_URL_FOR_APP)
    .then(appSupported => {
      if (appSupported && Platform.OS === "ios") {
        console.log(`Can handle native url: ${FANPAGE_URL_FOR_APP}`);
        return Linking.openURL(FANPAGE_URL_FOR_APP);
      } else {
        console.log(
          `Can't handle native url ${FANPAGE_URL_FOR_APP} defaulting to web URL ${FANPAGE_URL_FOR_BROWSER}`
        );
        return Linking.canOpenURL(FANPAGE_URL_FOR_BROWSER).then(
          webSupported => {
            if (webSupported) {
              console.log(`Can handle web url: ${FANPAGE_URL_FOR_BROWSER}`);
              return Linking.openURL(FANPAGE_URL_FOR_BROWSER);
            }
            return null;
          }
        );
      }
    })
    .catch(err => console.error("An error occurred", err));
};

export default openFacebookLink;

/*

Linking.openURL(FANPAGE_URL_FOR_APP)
  .then(response => {
    console.log("FANPAGE_URL_FOR_APP response = " + response);
  })
  .catch(err => {
    console.error("MB error occurred opening Facebook link", err);
  });
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                alert('Cannot open!')
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
 */

// return (
// Linking.openURL(FANPAGE_URL_FOR_APP)
// .then(response => {
//   console.log("FANPAGE_URL_FOR_APP response = " + response);
//   return response.json;
// })
// .catch(
// Supposed to work for Android, but doesn't for me.
//   Linking.openURL(
//     `fb://facewebmodal/f?href=https://www.facebook.com/genesis`
//   )
// )
// .catch(response => {
//   console.log(
//     "Response from fb.com open was" +
//       response +
//       ".  Attempting web link..."
//   );
//   return Linking.openURL(FANPAGE_URL_FOR_BROWSER);
// })
// .catch(err => {
//   console.error("MB error occurred opening Facebook link", err);
// })
// );

// "fb://facewebmodal/f?href=" + url
//
/*
return fetch(url)
.then(function(response){
  return response.json();
})
.then(function(json){
  return {
    city: json.name,
    temperature: kelvinToF(json.main.temp),
    description: _.capitalize(json.weather[0].description)
  }
})
.catch(function(error) {
console.log('There has been a problem with your fetch operation: ' + error.message);
 // ADD THIS THROW error
  throw error;
});
 */
