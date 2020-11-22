import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

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
  Card,
  CardItem,
} from "native-base";
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import { mocks } from "../constants";

const dayNumberToday = new Date().getDay();

export default function CataractTest() {
  const [isReady, setReady] = useState(false);
  const [dayNumber, setDayNumber] = useState(dayNumberToday);
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
  const daysCountArray = new Array(7).fill("");
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Cataract Test</Title>
        </Body>
        <Right />
      </Header>
      <Content></Content>
    </Container>
  );
}
const styles = StyleSheet.create({});
