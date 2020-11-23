import React from "react";
import { StyleSheet } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation";
import { Block } from "./components";

import store from "./store";
import { Provider } from "react-redux";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Warning: ..."]);

console.disableYellowBox = true;
// import all used images
const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/avatar.png"),
];
import * as firebase from "firebase";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyA5jRKgEBojarPr-BpgyCJ-Y3Ld0VAAxoo",
  authDomain: "health-management-app-cb4d6.firebaseapp.com",
  databaseURL: "https://health-management-app-cb4d6.firebaseio.com",
  projectId: "health-management-app-cb4d6",
  storageBucket: "health-management-app-cb4d6.appspot.com",
  messagingSenderId: "1012152980855",
  appId: "1:1012152980855:web:4cdab364c26c028f2a7d72",
  measurementId: "G-9S2GLZP9SP",
};
// firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <Block white>
          <Navigation />
        </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
