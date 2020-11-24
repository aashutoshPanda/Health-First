import React, { useState, useEffect } from "react";
import { StyleSheet ,View,ScrollView,ActivityIndicator} from "react-native";

import { Button, Block} from "../components";
import { theme, mocks } from "../constants";
import { List, ListItem, Left, Right, Icon,Text, Body } from "native-base";

import {
  getMyAppointmentsAsync,
  selectLoading,
  selectMyAppointments,
} from "../store/slices/appointmentSlice";
import { selectUserId } from "../store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Appointment(props) {
  const id = useSelector(selectUserId);
  const loading = useSelector(selectLoading);
  const appointments = useSelector(selectMyAppointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointments = async () => {
      // console.log("useeffect");

      dispatch(getMyAppointmentsAsync());
    };
    getAppointments();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  console.log("my appointments to show = ", appointments);

  return (
    <View style={{width:"100%",alignItems:"center"}}>
      <Text style={{fontWeight:"bold",fontSize:18,textAlign:"center",marginBottom:15,marginTop:15}}>
        My Apointments
      </Text>

      <View style={{width:"90%"}}>
        {appointments.map((item)=>{

          return(
            <View key={item.withId}>
                <List>
                  <ListItem selected>
                    <Body>
                      <Text style={{fontWeight:"bold",fontStyle:"italic"}}>{item.withName}</Text>
                      <Text note>{item.address}</Text>
                      <Text style={{fontWeight:"bold"}} note>Service: {item.service}</Text>
                      <Text style={{fontStyle:"italic"}} note>Price: {item.price} Rs</Text>
                      <Text note> Date :{item.date}</Text>
                    </Body>
                    <Right>
                      <Text note>{item.time}</Text>
                    </Right>
                  </ListItem>
                </List>
            </View>
          )
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
