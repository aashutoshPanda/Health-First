import React, { Component, useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

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
  ProgressBar,
  Image,
} from "native-base";
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import { mocks } from "../constants";

export default function MoodTracker() {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }).then(() => {
        setReady(true);
      });
    };
    loadFont();
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }
  // const items = new Array(5).map((ele) => <Icon name="home" />);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Water Log</Title>
        </Body>
        <Right />
      </Header>
      <Content></Content>
      <Footer>
        <FooterTab>
          <Button>
            <Text>Add water</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
