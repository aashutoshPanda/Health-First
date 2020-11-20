import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";

import * as IconTemp from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {DatePicker} from 'native-base'
import { Button, Block,Input, Text } from "../components";
import { theme, mocks } from "../constants";
import { View } from "native-base";

export default class Appointment extends Component{
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
    render(){
        return(
            
            <Block padding={[0, theme.sizes.base * 2]}>
              <Text h1 bold>
                Confirm Booking
              </Text>
              <Block middle>
                <Input
                  label="Name"
                  style={[styles.input]}
                />
                <Input
                  label="Address"
                  style={[styles.input]}
                />

                <Input
                  label="Mobile No."
                  style={[styles.input]}
                />
                <DatePicker
                defaultDate={new Date(2020, 10, 20)}
                minimumDate={new Date(2020, 10, 20)}
                maximumDate={new Date(2025, 11, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
                />
                <Text style={{margin:10}} h3>
                Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
                <Button gradient onPress={() => this.handleLogin()}>
                    <Text bold white center>
                      Confirm (100$)
                    </Text>
                </Button>
              </Block>
            </Block>
          
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
      },
      login: {
        flex: 1,
        justifyContent: "center"
      },
      input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      hasErrors: {
        borderBottomColor: theme.colors.accent
      }
});