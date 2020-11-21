import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
  Header,
  Title,
  Left,
  Icon,
  Body,
  Right,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Text,
  Textarea,
  Footer,
  FooterTab,
  Button,
} from "native-base";
import * as Font from "expo-font";

export default class Journal extends Component {
  state = {
    selected2: undefined,
    rating: 0,
  };
  onValueChange(value) {
    this.setState({
      rating: value,
    });
  }
  UNSAFE_componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  };
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
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
            <Title>21 November 2020</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Text>How Was Your Mood Today ?</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: 250 }}
                placeholder="Select A Mood ?"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Very Sad" value="1" />
                <Picker.Item label="Sad" value="2" />
                <Picker.Item label="Good" value="3" />
                <Picker.Item label="Very Good" value="4" />
                <Picker.Item label="Awesome" value="5" />
              </Picker>
            </Item>
            <Textarea rowSpan={9} bordered placeholder="Textarea" />
          </Form>
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
