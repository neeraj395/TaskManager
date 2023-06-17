import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as Font from 'expo-font';

export default function App() {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



  const handleAddTask = () => {
    if (task.trim() && dueDate) {
      const newTask = {
        id: Date.now().toString(),
        title: task,
        dueDate: dueDate,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setTask('');
      setDueDate('');
    } else {
      Alert.alert('Error', 'Please enter a task and a due date');
    }
  };

  const handleToggleTask = (id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleDeleteTask = (id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((item) => item.id !== id)
    );
  };

  const handleDateConfirm = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  const handleDateCancel = () => {
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, item.completed && styles.completedTask]}
      onPress={() => handleToggleTask(item.id)}
      onLongPress={() => handleDeleteTask(item.id)}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.dueDate}>
          Due Date: {moment(item.dueDate).format('MMM DD, YYYY hh:mm A')}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TASK MANAGER</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateButtonText}>Pick Due Date</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />

      <Text style={styles.quote}>"Time Is Precious Dont Waste"</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:'sans-serif',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#3f51b5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#3f51b5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedTask: {
    backgroundColor: '#d9d9d9',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 12,
    color: '#888',
  },
  quote: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    justidyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: '',
  },
});
