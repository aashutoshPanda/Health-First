import React, { Component } from "react";
import { View,StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
  Thumbnail,
} from "native-base";
import * as Font from "expo-font";
import {Text,Button} from '../components/index'
import { getJournalsAsync } from "../store/slices/journalSlice";

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

    const { navigation } = this.props;
    const { journals } = this.props.journal;
    const items = [];

    for (const [key, value] of Object.entries(journals)) {
      const { content, rating } = value;
      const date = key.replace(/_/g, "-");

      const item = (
        <ListItem thumbnail>
          <Body>
            <Text style={{fontWeight:"bold"}}>{date}</Text>
            <Text note numberOfLines={1}>
              <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Your Thoughts</Text> : <Text style={{color:"steelblue"}}>{content}</Text>
            </Text>
            <Text note numberOfLines={1}>
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Rate your Day</Text> : <Text style={{color:"red"}}>{rating}</Text>
            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Text style={{fontWeight:"bold"}}>View</Text>
            </Button>
          </Right>
        </ListItem>
      );
      items.push(item);
    }
    return (
      <View>

        <View style={{width:"100%"}}>
          <Text style={{margin:40}} h1 bold>
            Journal
          </Text>
        </View>

        <View style={{margin:10}}>
          {this.props.journal.loading ? (
            <ActivityIndicator />
          ) : (
            <List>{items.map((item) => item)}</List>
          )}
        </View>

        <Button style={{margin:20}} gradient onPress={() => navigation.navigate("AddToJournal")}>
            <Text bold white center>
              Share your Day!
            </Text>
          </Button>

        {/* <Footer>
          <FooterTab>
            <Button onPress={() => navigation.navigate("AddToJournal")} full>
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

export default connect(mapStateToProps, { getJournalsAsync })(Journal);
