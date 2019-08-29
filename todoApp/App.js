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
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false, //목록 추가떄마다 디스크에서 ToDo를 로딩해서 저장해야함. 앱을 열면 투두를 리스트에서 가져와야하고.
    toDos: {}
  };
  componentDidMount = () => {
    // 마운트가 끝나면 _loadtodos 를 실행!
    this._loadToDos();
  };
  render() {
    const { newToDo, loadedToDos, toDos } = this.state; //1. value는 state에 있고
    console.log(toDos);
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-centent" />
        <Text style={styles.title}> OO아, 숙제는 하고 노니? </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"오늘 할 일"}
            value={newToDo} //2.value를 input에 패스
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo} //done 키를 눌렀을 때
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo key={toDo.id} {...toDo} deleteToDo={this._deleteToDo} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewToDo = text => {
    //3. value관리는 여기서
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  _addToDo = () => {
    // to do를 state에서 가져오는 함수
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "", //flush 작업(비워버리는거)
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return { ...newState };
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
