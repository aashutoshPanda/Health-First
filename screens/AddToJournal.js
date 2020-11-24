import React, { Component } from "react";
import {View, StyleSheet, ActivityIndicator } from "react-native";
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
  Textarea,
  Footer,
  FooterTab,
} from "native-base";
import * as Font from "expo-font";
import { addEntryAsync, setShouldNavigate } from "../store/slices/journalSlice";
import { connect } from "react-redux";
import {Text,Button} from '../components/index'
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
    this.props.setShouldNavigate(false);
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
      <View style={{alignItems:"center"}}>

        <View style={{width:"100%"}}>
          <Text style={{margin:40}} h1 bold>
            Share Your Day!
          </Text>
        </View>

        <View style={{width:"80%"}}>

          <Form>
            <Text bold>How Was Your Mood Today ?</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: 250,fontWeight:"bold" }}
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

            <Text style={{marginTop:20,marginBottom:10}} bold>How would you describe your day ?</Text>            

            <Textarea
              rowSpan={9}
              bordered
              placeholder="Share your thoughts..."
              value={this.state.textFilled}
              onChange={this.handleTextChange}
            />
          </Form>
        </View>
        
        <Button style={{width:150,marginTop:20}} gradient onPress={() => this.handleAddEntry()}>
            <Text bold white center>
              Add this day!
            </Text>
          </Button>

        {/* <Footer>
          <FooterTab>
            <Button onPress={() => this.handleAddEntry()} full>
              <Text>ADD TODAY'S STORY</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { auth, journal } = state;
  return { auth, journal };
};

export default connect(mapStateToProps, { addEntryAsync, setShouldNavigate })(
  AddToJournal
);
