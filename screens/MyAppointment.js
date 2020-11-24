import React, { useState, useEffect } from "react";
import { StyleSheet ,View,ScrollView,ActivityIndicator} from "react-native";

import { Button, Block} from "../components";
import { theme, mocks } from "../constants";
import { List, ListItem, Left, Right, Icon,Text } from "native-base";

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
    <Block
      style={{ marginTop: 10, marginBottom: 0 }}
      padding={[0, theme.sizes.base * 2]}
    >
      <Text style={{fontWeight:"bold",fontSize:18,margin:18}}>
        My Apointments
      </Text>

      <ScrollView>
        {mocks.recordData.map((item)=>{

          return(
            <View>
                <List>
                  <ListItem selected>
                    <Left>
                      <Text>{item.withName}</Text>
                    </Left>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                </List>
            </View>
          )
        })}
      </ScrollView>

    </Block>
  );
}

const styles = StyleSheet.create({});
