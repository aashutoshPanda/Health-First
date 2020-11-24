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
import { addEntryAsync } from "../store/slices/journalSlice";
import { connect } from "react-redux";

const dateFormatOption = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};
const today = new Date().toLocaleDateString("en-US", dateFormatOption);
class AddToJournal extends Component {
  state = {
    rating: "1",
    textFilled: "",
  };

  UNSAFE_componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  };
  onSelectionChange(value) {
    this.setState({
      rating: value,
    });
  }
  handleAddEntry() {
    const { id } = this.props.auth;
    const { rating, textFilled } = this.state;
    const date = today.replace(/\//g, "_");
    this.props.addEntryAsync(id, rating, textFilled, date);
  }
  handleTextChange = (e) => {
    this.setState({ textFilled: e.nativeEvent.text });
    return e.nativeEvent.text;
  };
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    }
    const { navigation } = this.props;
    if (this.props.journal.shouldNavigate) {
      navigation.navigate("Journal");
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
            <Title>{today}</Title>
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
                selectedValue={this.state.rating}
                onValueChange={this.onSelectionChange.bind(this)}
              >
                <Picker.Item label="Very Sad" value="1" />
                <Picker.Item label="Sad" value="2" />
                <Picker.Item label="Good" value="3" />
                <Picker.Item label="Very Good" value="4" />
                <Picker.Item label="Awesome" value="5" />
              </Picker>
            </Item>
            <Textarea
              rowSpan={9}
              bordered
              placeholder="Textarea"
              value={this.state.textFilled}
              onChange={this.handleTextChange}
            />
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.handleAddEntry()} full>
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

export default connect(mapStateToProps, { addEntryAsync })(AddToJournal);
