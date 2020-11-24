import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { ActivityIndicator } from "react-native";
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
      <Text center h1 bold>
        MYYY Apointment
      </Text>
    </Block>
  );
}

const styles = StyleSheet.create({});
