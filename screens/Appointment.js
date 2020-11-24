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
  KeyboardAvoidingView,
} from "react-native";

import { connect } from "react-redux";
import * as IconTemp from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DatePicker } from "native-base";
import { Button, Block, Input, Text } from "../components";
import { theme, mocks } from "../constants";
import { View } from "native-base";

import {
  getSearchDataAsync,
  setAppointment,
  setLoading,
  setSearchQuery,
} from "../store/slices/appointmentSlice";
class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    const { withName, withId, address } = this.props.appointment.selectedData;
    return (
      <Block
        style={{ marginTop: 10, marginBottom: 0 }}
        padding={[0, theme.sizes.base * 2]}
      >
        <Text center h1 bold>
          Confirm Booking
        </Text>
        <Block style={{ marginTop: 50 }} middle>
          <Input label="Name" style={[styles.input]} />
          <Input label="Address" style={[styles.input]} />

          <Input label="Mobile No." style={[styles.input]} />
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
          <Text style={{ margin: 10 }} h3>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>
          <Button gradient onPress={() => this.handleLogin()}>
            <Text bold white center>
              Confirm (100$)
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

const mapStateToProps = (state) => {
  const { auth, appointment } = state;
  return { auth, appointment };
};
export default connect(mapStateToProps, {
  getSearchDataAsync,
  setAppointment,
  setLoading,
  setSearchQuery,
})(Appointment);
