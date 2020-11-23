import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem,
  Thumbnail,
} from "native-base";
import * as Font from "expo-font";

import { addEntry, getJournalsAsync } from "../store/slices/journalSlice";
class Journal extends Component {
  state = {
    isReady: false,
  };

  UNSAFE_componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  };
  componentDidMount() {
    console.log("called componentDidMountcomponentDidMount did mount");
    this.props.getJournalsAsync();
  }
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    }
    console.log("journals", this.props.journals);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Journal</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem thumbnail>
              <Body>
                <Text>Date</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>ADD TODAY'S STORY</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { journals: state.journal.journals };
};

export default connect(mapStateToProps, { addEntry, getJournalsAsync })(
  Journal
);
