import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };
  render() {
    const { newTodo } = this.state; //1. value는 state에 있고
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-centent" />
        <Text style={styles.title}> 숙제는 하고 노니 </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"할 일 입력"}
            value={newTodo} //2.value를 input에 패스
            onChangeText={this._controllNewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"im TODO---!"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewTodo = text => {
    //3. value관리는 여기서
    this.setState({
      newTodo: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22d6b2",
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
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
