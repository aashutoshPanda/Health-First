import React, { Component, useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View, Image } from "react-native";

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
} from "native-base";
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import { mocks } from "../constants";

const dayNumberToday = new Date().getDay();

export default function DietPlan() {
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
          <Title>Diet Plan</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {daysCountArray.map((_, key) => (
            <Image
              source={mocks.days[key]}
              style={{
                borderWidth: dayNumberToday === key ? 2 : 0,
                ...styles.weekImage,
              }}
            />
          ))}
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  weekImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: "red",
  },
});
