/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Keyboard,
  Pressable,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import tw from 'twrnc';
import { todos, TTodo } from '../data';
import React, { useReducer } from 'react';
import TodoItem from '../components/TodoItem';
import { TextInput } from 'react-native-gesture-handler';
export enum ActionType {
  ADD = 'ADD',
  DELETE = 'DELETE',
  SET = 'SET',
  UPDATE = 'UPDATE',
  COMPLETED = 'COMPLETED',
}
interface ITodoAction {
  type: ActionType;
  payload: any;
}
interface IState {
  todoData: TTodo[];
  length: number;
  task: string;
  changedTask: string;
}
const initialState = {
  todoData: todos,
  length: todos.length,
  task: '',
  changedTask: '',
};
const reducer = (state: IState, action: ITodoAction) => {
  switch (action.type) {
    case ActionType.SET:
      return {
        ...state,
        task: action.payload,
      };
    case ActionType.ADD:
      return {
        ...state,
        todoData: [
          ...state.todoData,
          { task: state.task, completed: false, id: Date.now() },
        ],
        task: '',
      };
    case ActionType.DELETE:
      return {
        ...state,
        todoData: state.todoData.filter(item => item.id !== action.payload),
      };
    case ActionType.COMPLETED:
      return {
        ...state,
        todoData: state.todoData.map(item => {
          return item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item;
        }),
      };
    case ActionType.UPDATE:
      return {
        ...state,
        todoData: state.todoData.map(item => {
          return item.id === action.payload.id && !item.completed
            ? { ...item, task: action.payload.changed }
            : item;
        }),
      };
    default:
      return state;
  }
};
const TodoApp = () => {
  const [{ todoData, task }, dispatch] = useReducer(reducer, initialState);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <KeyboardAvoidingView>
        <View style={tw`py-3 pl-3`}>
          <Text style={tw`font-medium text-6 text-black`}>Todo List</Text>
        </View>
        <View style={tw`px-2`}>
          <View
            style={tw`flex flex-row items-center justify-between px-3 bg-blue-300 rounded-lg mb-3`}
          >
            <View style={{ width: 300 }}>
              <TextInput
                placeholder="Enter your task..."
                value={task}
                style={tw`text-white font-medium text-4`}
                onChangeText={val =>
                  dispatch({ type: ActionType.SET, payload: val })
                }
              />
            </View>
            <Pressable
              onPress={() => {
                dispatch({ type: ActionType.ADD, payload: task });
                Keyboard.dismiss();
              }}
            >
              <Text style={tw`text-white font-medium text-4`}>Add</Text>
            </Pressable>
          </View>
          <ScrollView>
            {todoData.map(({ id, task, completed }) => (
              <TodoItem
                key={id}
                task={task}
                id={id}
                completed={completed}
                dispatch={dispatch}
              />
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default TodoApp;
