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
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
} from "native-base";
import {Text} from '../components/index'
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import { mocks } from "../constants";
import {data} from '../constants/data'
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
      <View style={{width:"100%"}}>
          <Text style={{margin:20}} h1 bold>
            Diet Plan
          </Text>
        </View>
      <Content>
        <View style={{marginTop:20,width:"100%", flex: 1, flexDirection: "row", flexWrap: "wrap",justifyContent:"center" }}>
          {daysCountArray.map((_, key) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDayNumber(key)}
            >
              <Image
                source={mocks.days[key]}
                style={{
                  borderWidth: dayNumber === key ? 4 : 0,
                  ...styles.weekImage,
                }}
              />
            </TouchableOpacity>
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
    borderRadius: 80 / 4.5,
    borderColor: "black",
    elevation:10
  }
});
