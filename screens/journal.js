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
    this.props.getJournalsAsync(this.props.auth.id);
  }
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    }
    const { journals } = this.props.journal;
    const items = [];
    for (const [key, value] of Object.entries(journals)) {
      const { content, rating } = value;
      const date = key.replace(/_/g, "-");
      const item = (
        <ListItem thumbnail>
          <Body>
            <Text>{date}</Text>
            <Text note numberOfLines={1}>
              content : {content} rating : {rating}
            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      );
      items.push(item);
    }
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
          <List>{items.map((item) => item)}</List>
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
  const { auth, journal } = state;
  return { auth, journal };
};

export default connect(mapStateToProps, { addEntry, getJournalsAsync })(
  Journal
);
