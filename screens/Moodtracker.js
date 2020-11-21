import React, { Component } from "react";
import {StyleSheet} from 'react-native'
import { Button, Block,Input, Text } from "../components";
import { theme, mocks } from "../constants";

export default class MoodTracker extends Component{

    render(){
        return(
            <Block padding={[0, theme.sizes.base * 2]}>
              <Text h1 bold>
                Mood Tracker
              </Text>
            </Block>
        )
    }
}

const styles=StyleSheet.create({})