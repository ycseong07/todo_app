import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform
} from "react-native";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-centent" />
        <Text style={styles.title}> To Do </Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={"New To Do"} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        ShadowOffset: {
          height: -1, //위아래로 안움직이게
          width: 0 // 보더 안에 있도록. 1로 설정하면 움직임
        }
      },
      android: {
        elevation: 3
      }
    })
  }
});
