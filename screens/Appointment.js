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

import DatePicker from "react-native-datepicker";
import { Button, Block, Input, Text } from "../components";
import { theme, mocks } from "../constants";
import {
  View,
  Picker,
  Item,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
} from "native-base";

import {
  getSearchDataAsync,
  setAppointment,
  setLoading,
  setSearchQuery,
  setAdditionalData,
  makeAppointmentAsync,
} from "../store/slices/appointmentSlice";
class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      datetime: "2016-05-15 00:00",
      choice: 0,
    };
    this.setDate = this.setDate.bind(this);
  }
  onSelectionChange(value) {
    this.setState({
      choice: value,
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  handleSubmit() {
    const date = this.state.datetime.replace(/-/g, "_").substr(0, 10);
    const time = this.state.datetime.substr(11, 5);
    console.log(this.state.datetime, this.state.datetime.substr(11, 5));
    const { service, price } = this.props.appointment.servicePrice[
      this.state.choice
    ];
    const { address, withId, withName } = this.props.appointment.selectedData;
    this.props.makeAppointmentAsync({
      date,
      time,
      service,
      price,
      address,
      withId,
      withName,
    });
    this.props.navigation.navigate("MyAppointment");
  }
  render() {
    const { withName, withId, address } = this.props.appointment.selectedData;

    return (
      <Block
        style={{ marginTop: 10, marginBottom: 0 }}
        padding={[0, theme.sizes.base * 2]}
      >
        <Text style={{ marginTop: 30 }} center h1 bold>
          Confirm Booking
        </Text>

        <Card style={{ marginTop: 50 }}>
          <CardItem header bordered>
            <Text style={{ fontStyle: "italic", color: "green" }} h2 bold>
              Your Invoice :
            </Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text
                style={{ margin: 7, fontStyle: "italic", fontSize: 18 }}
                bold
              >
                Name: &nbsp;
                <Text
                  style={{
                    fontStyle: "bold",
                    fontSize: 18,
                    color: "steelblue",
                  }}
                >
                  {withName}
                </Text>{" "}
              </Text>
              <Text
                style={{ margin: 7, fontStyle: "italic", fontSize: 18 }}
                bold
              >
                Address: &nbsp;
                <Text
                  style={{
                    fontStyle: "bold",
                    fontSize: 18,
                    color: "steelblue",
                  }}
                >
                  {address}
                </Text>{" "}
              </Text>

              <Text
                style={{ margin: 7, fontStyle: "italic", fontSize: 18 }}
                bold
              >
                Date: &nbsp;
                <Text
                  style={{
                    fontStyle: "bold",
                    fontSize: 18,
                    color: "steelblue",
                  }}
                ></Text>{" "}
              </Text>

              <DatePicker
                style={{ width: 200 }}
                date={this.state.datetime}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD HH:mm"
                minDate="2020-11-24"
                maxDate="2020-12-24"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(datetime) => {
                  this.setState({ datetime });
                }}
              />

              <Text
                style={{ margin: 7, fontStyle: "italic", fontSize: 18 }}
                bold
              >
                Service Requested:
              </Text>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: 200, color: "steelblue", fontWeight: "bold" }}
                  placeholder="Select A Mood ?"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.choice}
                  onValueChange={this.onSelectionChange.bind(this)}
                >
                  {this.props.appointment.servicePrice.map((ele, index) => {
                    return (
                      <Picker.Item
                        label={`${ele.service} : Rs. ${ele.price}`}
                        value={index}
                      />
                    );
                  })}
                </Picker>
              </Item>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text bold>*Please confirm the above mentioned details</Text>
          </CardItem>
        </Card>

        <Button gradient onPress={() => this.handleSubmit()}>
          <Text bold white center>
            Confirm
          </Text>
        </Button>

        {/* <Block style={{ marginTop:-100 }} middle>
          <Input label="Name" value={withName} style={[styles.input]} />
          <Input label="Address" value={address} style={[styles.input]} />
          

          <DatePicker
            style={{ width: 200 }}
            date={this.state.datetime}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm"
            minDate="2020-11-24"
            maxDate="2020-12-24"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              
            }}
            onDateChange={(datetime) => {
              this.setState({ datetime });
            }}
          />

          <Text style={{ margin: 10 }} h3>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>

          <Item picker>
            <Picker
              mode="dropdown"
              style={{ width: 250 }}
              placeholder="Select A Mood ?"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.choice}
              onValueChange={this.onSelectionChange.bind(this)}
            >
              {this.props.appointment.servicePrice.map((ele, index) => {
                return (
                  <Picker.Item
                    label={`${ele.service} : Rs. ${ele.price}`}
                    value={index}
                  />
                );
              })}
            </Picker>
          </Item>
          <Button gradient onPress={() => this.handleSubmit()}>
            <Text bold white center>
              Confirm (100$)
            </Text>
          </Button>
        </Block> */}
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
  setAdditionalData,
  makeAppointmentAsync,
})(Appointment);
