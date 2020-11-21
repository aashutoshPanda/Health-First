import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Appointment from "../screens/Appointment";
import Dietplan from "../screens/Dietplan";
import Moodtracker from "../screens/Moodtracker";
import Waterlevel from "../screens/Waterlevel";
import Journal from "../screens/journal";
import AddToJournal from "../screens/AddToJournal";
import Chat from "../screens/chat";

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Dietplan,
    Waterlevel,
    AddToJournal,
    Journal,
    Settings,
    Welcome,
    Login,
    SignUp,
    Forgot,
    Browse,
    Explore,
    Appointment,
    Chat,
    Product,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 0,
        marginTop: -30,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base,
      },
    },
  }
);

export default createAppContainer(screens);
