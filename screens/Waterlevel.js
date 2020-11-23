import React, { Component, useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View,Image,TouchableOpacity } from "react-native";
import CircleSizeSelector from 'react-native-circle-size-selector'

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
  ProgressBar
} from "native-base";
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { selectLevel, incrementAsync } from "../store/slices/waterSlice";
import {SemiCircleProgress,Block,Text} from "../components/index"
import { mocks } from "../constants";

export default function WaterLevel() {
  const [isReady, setReady] = useState(false);
  const level = useSelector(selectLevel);
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
  const items = new Array(level).fill("");

  const onChange = (value) => {
    level=value
  }



  return (
    <Block>

        <View style={{width:"100%"}}>
          <Text style={{margin:20}} h1 bold>
            Water Log
          </Text>
        </View>

        <Text style={{marginTop:10,marginLeft:20,marginRight:20,fontStyle:"italic",fontSize:13}}>
          <Icon name="quote"/> &nbsp;Health experts commonly recommend eight 8-ounce glasses of water every
          daya, which equals about 2 liters, or half a gallon a day. 
        </Text>

        <Block center style={{marginTop:70,marginBottom:-100}}>
        <SemiCircleProgress
            percentage={level/80}
            progressColor={"steelblue"}
        >
            <Text style={{ fontSize: 32, color:"steelblue" }}>{Math.floor(level/80)}%</Text>
        </SemiCircleProgress>
        </Block>

        <View style={{marginTop:-10,marginBottom:30}}>
          <Text center style={{fontSize:25}}>{level/1000}/8 Lts</Text>
        </View>
        {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {items.map((_) => (
            // <Thumbnail source={mocks.glassImage} />
            <Thumbnail
              square
              source={mocks.glassImage}
              style={{ margin: 10 }}
            />
          ))}
        </View> */}
      
      {/* <Button rounded onPress={() => dispatch(incrementAsync(240))}>
            <Text>Add water</Text>
          </Button> */}

      
      <Text style={{margin:20,fontWeight:"bold",fontSize:20}}>Add your intake: </Text>

      <View style={{width:"100%",flex:1,flexDirection:"row",justifyContent:"center"}}>
        
        <TouchableOpacity onPress={() => dispatch(incrementAsync(240))}>

        <View style={{flex:1,flexDirection:"column",alignItems:"center"}} >
          <Image style={{width:50,height:50,margin:25}} source={require("../assets/icons/glass-of-water.png")}/>
          <Text style={{margin:10,fontWeight:"bold",fontSize:15}}>240 ml</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(incrementAsync(750))}>
        <View style={{flex:1,flexDirection:"column",alignItems:"center"}}>
          <Image style={{width:50,height:50,margin:25}} source={require("../assets/icons/zam-zam.png")}/>
          <Text style={{margin:10,fontWeight:"bold",fontSize:15}}>750 ml</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(incrementAsync(1000))}>
        <View style={{flex:1,flexDirection:"column",alignItems:"center"}}>
          <Image style={{width:50,height:50,margin:25}} source={require("../assets/icons/drink-water.png")}/>
          <Text style={{margin:10,fontWeight:"bold",fontSize:15}}>1000 ml</Text>
        </View>
        </TouchableOpacity>
        
      </View>
    </Block>
  );
}
