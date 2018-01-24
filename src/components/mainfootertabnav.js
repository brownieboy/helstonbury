import React, { Component } from "react";
import { Button, FooterTab, Icon, Text } from "native-base";

class MainFooterTabNav extends Component {
  render() {
    const { activeTabNo, navigate } = this.props;
    console.log("activeTabNo=" + activeTabNo);
    return (
      <FooterTab>
        <Button active={activeTabNo === 0} onPress={() => navigate("Home")}>
          <Icon name="home" />
        </Button>
        <Button
          active={activeTabNo === 1}
          onPress={() => navigate("BandsList")}
        >
          <Icon name="guitar" />
        </Button>
        <Button active={activeTabNo === 2}>
          <Text>Stages</Text>
        </Button>
      </FooterTab>
    );
  }
}
export default MainFooterTabNav;

/*
  render() {
    const { activeTabNo, tabHomePressCallback = null, tabBandsPressCallback = null, tabStagesPressCallback = null } = this.props;
    console.log("activeTabNo=" + activeTabNo);
    return (
      <FooterTab>
        <Button active={activeTabNo === 0} onPress={ tabHomePressCallback } >
          <Text>Home</Text>
        </Button>
        <Button active={activeTabNo === 1} onPress={ tabBandsPressCallback }>
          <Text>Bands</Text>
        </Button>
        <Button active={activeTabNo === 2} onPress={ tabStagesPressCallback }>
          <Text>Stages</Text>
        </Button>
      </FooterTab>
    );
  }
}

*/
