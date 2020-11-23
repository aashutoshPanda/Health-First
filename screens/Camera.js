import React, { Component } from "react";
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Thumbnail, Button, Icon } from "native-base";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { mocks } from "../constants";
import { connect } from "react-redux";
import {
  setImageTaken,
  setImagePath,
  setLoading,
  setResult,
  setShowUploadButtons,
  reset,
  setError,
} from "../store/slices/cameraSlice";
class Camera extends Component {
  render() {
    let image = this.props.camera.imagePath;
    if (this.props.camera.loading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={{ margin: 20, fontWeight: "bold", fontSize: 25 }}>
            Cataract Test
          </Text>
        </View>
        {/* <Image source={mocks.cataractLogo} style={styles.logo} /> */}
        <StatusBar barStyle="default" />
        {/* <View style={{ flex: 1, justifyContent: "center" }}> */}
        <Text style={styles.exampleText}>
          Take our quick, free test to see if you’ve a Cataract or
        </Text>
        {/* </View> */}

        {this.props.camera.showUploadButtons === true
          ? this._inputButtons()
          : this._maybeRenderImage()}

        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }
  _cataractTest = () => {
    const apiUrl = "http://192.168.0.104:8080/detect";
    const pictureuri = this.props.camera.imagePath;

    this.props.setLoading(true);
    this.props.setError(false);
    console.log("making cataract request");
    var data = new FormData();
    data.append("file", {
      uri: pictureuri,
      name: "imageFromApp.jpg",
      type: "image/jpeg",
    });

    fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.setImagePath(data.img_url);
        this.props.setResult(data);
        console.log("succ from cataract ");
        this.props.setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        this.props.setLoading(false);
        this.props.setError(true);
        console.log("err from cataract");
        console.log(err);
      });
  };
  _inputButtons = () => {
    return (
      <>
        {/* <View style={{ flex: 1, marginBottom: -100 }}> */}
        <Button iconLeft success onPress={this._pickImage}>
          <Icon name="download" />
          <Text style={{ color: "white", fontWeight: "bold", margin: 20 }}>
            Upload from device
          </Text>
        </Button>
        {/* </View> */}
        {/* <View style={{ flex: 1 }}> */}
        <Button iconLeft success onPress={this._takePhoto}>
          <Icon name="camera" />
          <Text style={{ color: "white", fontWeight: "bold", margin: 20 }}>
            Take a Picture
          </Text>
        </Button>
        {/* </View> */}
      </>
    );
  };
  _maybeRenderUploadingOverlay = () => {
    if (this.props.camera.loading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let image = this.props.camera.imagePath;
    const { navigation } = this.props;
    console.log("thjis is imahe", image);
    if (!image) {
      return;
    }

    console.log(image);
    console.log("result from prosp", this.props.camera.result);
    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
        {/* <View style={{ flex: 1 }}> */}
        <Button style={styles.container} onPress={() => this.props.reset()}>
          <Text style={{ color: "white", fontWeight: "bold", margin: 20 }}>
            RETAKE
          </Text>
        </Button>
        {/* </View> */}
        {this.props.camera.result === null ? (
          <View>
            <Button style={styles.container} onPress={this._cataractTest}>
              <Text style={{ color: "white", fontWeight: "bold", margin: 20 }}>
                TEST
              </Text>
            </Button>
          </View>
        ) : (
          <View>
            <Button
              style={styles.container}
              onPress={() => navigation.navigate("Appointment")}
            >
              <Text style={{ color: "white", fontWeight: "bold", margin: 20 }}>
                MAKE APPOINTMENT
              </Text>
            </Button>
            <Text style={{ fontWeight: "bold", margin: 20 }}>
              CATARACT FOUND : {this.props.camera.result.found}
            </Text>
          </View>
        )}
        {this.props.camera.error === true ? (
          <Text style={{ fontWeight: "bold", margin: 20 }}>
            Erorr while making request
          </Text>
        ) : null}
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.props.camera.imagePath,
      title: "Check out this photo",
      url: this.props.camera.imagePath,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.props.camera.imagePath);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.props.setImagePath(pickerResult.uri);
        this.props.setShowUploadButtons(false);
        this.props.setImageTaken(true);
      }
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.props.setImagePath(pickerResult.uri);
        this.props.setShowUploadButtons(false);
        this.props.setImageTaken(true);
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // flex: 1,
    // justifyContent: "center",
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
});
const mapStateToProps = (state) => {
  const { auth, camera } = state;
  return { auth, camera };
};

export default connect(mapStateToProps, {
  setImageTaken,
  setImagePath,
  setLoading,
  setResult,
  setShowUploadButtons,
  reset,
  setError,
})(Camera);
