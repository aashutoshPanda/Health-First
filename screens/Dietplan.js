import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import PureChart from 'react-native-pure-chart';

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
  Tab,
  Tabs,
  Badge
} from "native-base";
import {Text,Block} from '../components/index'
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import { mocks } from "../constants";
import {diet} from '../constants/data'
const dayNumberToday = new Date().getDay();

export default function DietPlan() {
  const [isReady, setReady] = useState(false);
  const [dayNumber, setDayNumber] = useState(dayNumberToday);
  const [foodType, setFoodType] = useState(0);
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

  console.log(dayNumber)

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
        
        <Block style={{margin:20}}>
          <Tabs>
            <Tab tabStyle={{backgroundColor:"white"}} activeTabStyle={{backgroundColor:"red"}} activeTextStyle={{fontWeight:"bold",color:"white"}}  textStyle={{fontWeight:"bold",color:"red"}} heading="Breakfast">
              <View style={{alignItems:"center",marginTop:30}}>
                <PureChart data={diet[dayNumber][0].calories} type='pie' />
              </View>
            </Tab>
            <Tab tabStyle={{backgroundColor:"white"}} activeTabStyle={{backgroundColor:"green"}} activeTextStyle={{fontWeight:"bold",color:"white"}}  textStyle={{fontWeight:"bold",color:"green"}} heading="Lunch">
              <View style={{alignItems:"center",marginTop:30}}>
                <PureChart data={diet[dayNumber][1].calories} type='pie' />
              </View>
            </Tab>
            <Tab tabStyle={{backgroundColor:"white"}} activeTabStyle={{backgroundColor:"blue"}} activeTextStyle={{fontWeight:"bold",color:"white"}}  textStyle={{fontWeight:"bold",color:"blue"}} heading="Dinner">
              <View style={{alignItems:"center",marginTop:30}}>
                <PureChart data={diet[dayNumber][2].calories} type='pie' />
              </View>
            </Tab>
          </Tabs>
        </Block>
        
        <Text style={{margin:20,fontWeight:"bold",fontStyle:"italic",fontSize:18}}>Your Menu -</Text>

        <View style={{marginLeft:20,flex:1,flexDirection:"row"}}>
            <Button info rounded style={{margin:10,padding:8}}>
              <Text style={{padding:0,fontSize:18,color:"white",fontWeight:"bold"}}>{diet[dayNumber][foodType].meal[0]}</Text>
            </Button>
            <Button success rounded style={{margin:10,padding:8}}>
              <Text style={{padding:0,fontSize:18,color:"white",fontWeight:"bold"}}>{diet[dayNumber][foodType].meal[1]}</Text>
            </Button>
            <Button danger rounded style={{margin:10,padding:8}}>
              <Text style={{padding:0,fontSize:18,color:"white",fontWeight:"bold"}}>{diet[dayNumber][foodType].meal[2]}</Text>
            </Button>
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
