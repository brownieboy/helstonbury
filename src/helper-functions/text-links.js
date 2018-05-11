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

const renderBoldText = (matchingString, matches) => {
  const pattern = /\*(.+)\*/;
  const match = matchingString.match(pattern);
  console.log("matches:");
  console.log(matches);
  return `^^${match[0]}^^`;
};

export const parsedTextArray = [
  {
    style: touchStyles.text,
    type: "url",
    onPress: url => web(url)
  },
  {
    style: touchStyles.text,
    type: "email",
    onPress: emailAddress => email(emailAddress)
  },
  {
    pattern: /\*(.+)\*/,
    style: markdownStyles.bold,
    renderText: renderBoldText
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
