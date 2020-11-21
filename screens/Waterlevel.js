import React, { Component } from "react";
import {StyleSheet} from 'react-native'
import { Button, Block,Input, Text } from "../components";
import { theme, mocks } from "../constants";

export default class WaterLevel extends Component{

    render(){
        return(
            <Block padding={[0, theme.sizes.base * 2]}>
              <Text h1 bold>
                Water Tracker
              </Text>
            </Block>
        )
    }
}

const styles=StyleSheet.create({})