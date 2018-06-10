import { StyleSheet } from "react-native";
import { email, text, web, phonecall } from "react-native-communications";

export const touchStyles = StyleSheet.create({
  text: {
    color: "blue"
  }
});

export const markdownStyles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  boldItalic: {
    fontWeight: "bold",
    fontStyle: "italic"
  },
  strikethrough: {
    textDecorationLine: "line-through"
  }
});

/*

 eg: Your str is 'Mention [@michel:5455345]' where 5455345 is ID of this user and @michel the value to display on interface. Your pattern for ID & username extraction : /\[(@[^:]+):([^\]]+)\]/i Your renderText method :
renderText(matchingString, matches) {
  // matches => ["[@michel:5455345]", "@michel", "5455345"]
  let pattern = /\[(@[^:]+):([^\]]+)\]/i;
  let match = matchingString.match(pattern);
  return `^^${match[1]}^^`;
}
 */

// const renderUnorderedListItem = (matchingString, matches) => {
//   console.log("renderUnorderedListItem");

//   const pattern = /\* (.+)\n/;
//   const match = matchingString.match(pattern);
//   return `lll${match[0].replace(/\*(.*)\*/, "$1")}lll`;
// };

// const boldItalicPattern = /(\*_|^\*)(?=\S)([\s\S]*?\S)\*(?![_**])/gm;
const boldPattern = /(\*|^\*)(?=\S)([\s\S]*?\S)\*(?![**])/gm;
const italicPattern = /(_|^_)(?=\S)([\s\S]*?\S)_(?![_*])/gm;
const strikethroughPattern = /(-|^-)(?=\S)([\s\S]*?\S)-(?![-*])/gm;
// const bulletsPattern = /^\* .*/gm;

// const renderBoldItalicText = (matchingString, matches) => {
//   const match = matchingString.match(boldItalicPattern);
//   return `${match[0].replace(/\*_(.*)_\*/, "$1")}`;
// };

const renderBoldText = (matchingString, matches) => {
  const match = matchingString.match(boldPattern);
  return `${match[0].replace(/\*(.*)\*/, "$1")}`;
};

const renderItalicText = (matchingString, matches) => {
  const match = matchingString.match(italicPattern);
  return `${match[0].replace(/_(.*)_/, "$1")}`;
};

const renderStrikethroughText = (matchingString, matches) => {
  const match = matchingString.match(strikethroughPattern);
  return `${match[0].replace(/-(.*)-/, "$1")}`;
};

// onPress={() => email([email1], null, null, "Helstonbury", "")}

export const parsedTextArray = [
  {
    style: touchStyles.text,
    type: "url",
    onPress: url => web(url)
  },
  {
    style: touchStyles.text,
    type: "email",
    onPress: emailAddress =>
      email(
        [decodeURI(emailAddress)],
        null,
        null,
        emailAddress.indexOf("brownieboy") >= 0 ? "Mobile App Development" : "",
        ""
      )
  },
  // {
  //   // Bold and italics (matching underscores inside asterisks)
  //   // This must go before the separate bold and italic entries
  //   pattern: boldItalicPattern,
  //   style: markdownStyles.boldItalic,
  //   renderText: renderBoldItalicText
  // },
  {
    // Bold (matching asterisks)
    pattern: boldPattern,
    style: markdownStyles.bold,
    renderText: renderBoldText
  },
  {
    // Italic (matching underscores)
    pattern: italicPattern,
    style: markdownStyles.italic,
    renderText: renderItalicText
  },
  {
    // strikethrough (matching dashes)
    pattern: strikethroughPattern,
    style: markdownStyles.strikethrough,
    renderText: renderStrikethroughText
  }
];

/*
pattern: /\{(.+)\}/,
style: fontWeight: 'bold',


          parse={
            [
              {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
              {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
              {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
              {pattern: /Bob|David/,              style: styles.name, onPress: this.handleNamePress},
              {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username, onPress: this.handleNamePress, renderText: this.renderText},
              {pattern: /42/,                     style: styles.magicNumber},
              {pattern: /#(\w+)/,                 style: styles.hashTag},

*/
