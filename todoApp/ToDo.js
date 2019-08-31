import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    //_startEditing에서 prop을 state에 복사하는 대신 constructor를 사용해서 컴포넌트가 렌더하자마자 할일리스트를 가져오도록
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    unCompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  };
  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props; //isCompleted를 state말고 props에서 살펴보자! 그러면 이제 todo.js말고 app.js에서 작업이 됨.
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controllInput} // 텍스트 수정할수 있도록
              returnKeyType={"done"}
              onBlur={this._finishEditing} // blur(다른칸 터치하면)하면 편집종료!
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}> ✅ </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}> ✏️ </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}> ❌ </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = () => {
    //isCompleted를 state말고 props에서 살펴보자!
    const { isCompleted, unCompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      unCompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  _startEditing = () => {
    this.setState({ isEditing: true });
  };
  _finishEditing = () => {
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
  _controllInput = text => {
    this.setState({ toDoValue: text });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#22d6b2"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 10
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 10,
    width: width / 2,
    paddingBottom: 5
  },
  stamp: {}
});
