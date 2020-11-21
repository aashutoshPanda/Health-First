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

export default function DietPlan() {
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
          <Title>Diet Plan</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {daysCountArray.map((_, key) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDayNumber(key)}
            >
              <Image
                source={mocks.days[key]}
                style={{
                  borderWidth: dayNumber === key ? 2 : 0,
                  ...styles.weekImage,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
                  }}
                />
                <Body>
                  <Text>Breakfast</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Eggs Mashed Potatoes</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="logo-github" />
                  <Text>1,926 Calories</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
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
