import React, { Component } from "react";
import {StyleSheet} from 'react-native'
import { theme, mocks } from "../constants";
import { Button, Block,Input, Text } from "../components";

export default class Chat extends Component{

    render(){
        return(
            <Block padding={[0, theme.sizes.base * 2]}>
              <Text h1 bold>
                Chat
              </Text>
            </Block>
        )
    }
}

const styles=StyleSheet.create({})