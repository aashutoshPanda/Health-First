import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

import * as IconTemp from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import { Button, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { View } from "native-base";

const { width, height } = Dimensions.get("window");

import {
  getSearchDataAsync,
  setAppointment,
  setLoading,
  setSearchQuery,
} from "../store/slices/appointmentSlice";

class Explore extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
  };

  handleSearchFocus(status) {
    Animated.timing(this.state.searchFocus, {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150, // ms
    }).start();
  }
  componentDidMount() {
    console.log("mount");
    this.props.getSearchDataAsync();
  }
  renderSearch() {
    const { searchFocus } = this.state;
    const { searchQuery } = this.props.appointment;
    const isEditing = searchFocus && searchQuery;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={(text) => this.props.setSearchQuery(text)}
          value={searchQuery}
          onRightPress={() =>
            isEditing ? this.props.setSearchQuery(null) : null
          }
          rightStyle={styles.searchRight}
          rightLabel={
            <IconTemp.FontAwesome
              name={isEditing ? "close" : "search"}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  }
  handleMakeAppointment(withName, withId, address) {
    this.props.setAppointment({ withName, withId, address });
    this.props.navigation.navigate("Appointment");
  }
  render() {
    const { searchQuery } = this.props.appointment;
    const searchData = this.props.appointment.searchData;
    const items = searchData.filter((item) => {
      if (searchQuery === "" || searchQuery === null) return item;
      let relevant = false;
      const tags = [];
      for (const [key, value] of Object.entries(item.tags)) {
        tags.push(item.tags[key]);
      }

      tags.forEach((element) => {
        const { service, price } = element;
        if (service.toLowerCase().includes(searchQuery)) relevant = true;
      });
      if (relevant) return item;
    });
    console.log("search data", items);
    let hospitalList = items.map((item) => (
      <Card key={item.id}>
        <CardItem>
          <Left>
            {/* <Thumbnail source={item.thumbnail} /> */}
            <Body>
              <Text title bold>
                {item.name}
              </Text>
              <Text note>{item.address}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          {/* <Image
            source={item.image}
            style={{ height: 200, width: null, flex: 1 }}
          /> */}
        </CardItem>
        <CardItem footer bordered>
          <Left>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
            >
              <Button
                onPress={() =>
                  this.handleMakeAppointment(item.name, item.id, item.address)
                }
                gradient
                style={{ width: width / 2.8 }}
              >
                <Text h5 bold white center>
                  Book Appointment
                </Text>
              </Button>
            </LinearGradient>
          </Left>

          <Right>
            <Text h2 bold>
              100$<Text>&nbsp;(Approx)</Text>
            </Text>
          </Right>
        </CardItem>
      </Card>
    ));

    return (
      <Block style={{ marginTop: 20 }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Explore
          </Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {/* {this.renderExplore()} */}
          {hospitalList}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    );
  }
}

Explore.defaultProps = {
  images: mocks.explore,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent",
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
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
})(Explore);
