import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

const VALID_EMAIL = "test@gmail.com";
const VALID_PASSWORD = "123456";
import {
  logInAsync,
  registerAsync,
  selectLoading,
  setDetails,
  setLoading,
  selectIsLoggedIn,
} from "../store/slices/authSlice";

export default function Login(props) {
  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const loading = useSelector(selectLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleLogin = async () => {
    Keyboard.dismiss();
    dispatch(setLoading(true));
    dispatch(logInAsync(email, password));
  };
  // const { loading, errors } = state;
  // const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  if (isLoggedIn) {
    navigation.navigate("Browse");
  }
  return (
    <KeyboardAvoidingView style={styles.login}>
      <Block style={{ marginTop: 30 }} padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Login
        </Text>
        <Block middle>
          <Input
            label="Email"
            // error={hasErrors("email")}
            style={[styles.input]}
            defaultValue={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            secure
            label="Password"
            // error={hasErrors("password")}
            style={[styles.input]}
            defaultValue={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Button gradient onPress={() => handleLogin()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Forgot")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
