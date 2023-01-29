/* eslint-disable react-native/no-inline-styles */
import tw from 'twrnc';
import React, { useState } from 'react';
import { ActionType } from '../screen/TodoApp';
import {
  View,
  Text,
  Alert,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export type TTodoItemProps = {
  id: number;
  task: String;
  completed: Boolean;
  dispatch: any;
};
const TodoItem = ({ id, task, completed, dispatch }: TTodoItemProps) => {
  const [onModal, setOnModal] = useState(false);
  const [changedTask, setChangedTask] = useState(task);
  const editDeleteAlert = () =>
    Alert.alert('Choose your action', '', [
      {
        text: 'Update',
        onPress: () => setOnModal(true),
      },
      {
        text: 'Delete',
        onPress: () => dispatch({ type: ActionType.DELETE, payload: id }),
      },
    ]);
  return (
    <>
      <View
        style={[
          tw`flex flex-row justify-between items-center bg-[#EDEDED] mb-2 p-3 rounded-lg`,
        ]}
      >
        <TouchableOpacity
          style={{ width: 250 }}
          onPress={() => dispatch({ type: ActionType.COMPLETED, payload: id })}
        >
          <Text
            style={[
              { textDecorationLine: completed ? 'line-through' : 'none' },
              { fontSize: 18, fontWeight: '600' },
              { color: completed ? 'red' : 'gray' },
            ]}
          >
            {task}
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            if (completed) return;
            editDeleteAlert();
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Options</Text>
        </Pressable>
      </View>
      <Modal
        transparent={true}
        visible={onModal}
        animationType="fade"
        onRequestClose={() => setOnModal(false)}
      >
        <View
          style={tw`bg-gray-500/50 h-full flex items-center justify-center`}
        >
          <View style={tw`bg-white h-32 w-72 rounded-lg px-2`}>
            <Text style={tw`text-center text-5 font-medium pt-1`}>
              Update Task
            </Text>
            <TextInput
              value={changedTask}
              placeholder="Change task..."
              onChangeText={val => setChangedTask(val)}
              style={tw`bg-gray-200/50 rounded-lg text-4`}
            />
            <View style={tw`flex flex-row w-full`}>
              <TouchableOpacity
                style={tw`flex-1 py-2`}
                onPress={() => setOnModal(false)}
              >
                <Text style={tw`text-center font-medium text-5`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 py-2`}
                onPress={() => {
                  dispatch({
                    type: ActionType.UPDATE,
                    payload: { id, changed: changedTask },
                  });
                  setOnModal(false);
                }}
              >
                <Text style={tw`text-center font-medium text-5`}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TodoItem;
