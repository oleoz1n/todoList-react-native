import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, useState } from "react";
import { Modal, Portal, Text, Button, PaperProvider, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Tarefas from './Task'



const App = () => {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState<Array<string>>([]);
  const [taskIndex, setTaskIndex] = useState<number>(0)

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, flex: 0.5, margin: 32 };

  const editarTarefa = (indice:number) => {
    showModal();
    setTaskIndex(indice)
    const tarefaAtual = taskItems[indice]
    setTask(tarefaAtual)
  }

  const salvarTarefa = () => {
    const copiarTask = [...taskItems]
    copiarTask[taskIndex] = task
    setTaskItems(copiarTask)
    hideModal()
    setTask('')
  }

  return (
    <PaperProvider>
      <View style={styles.safeArea}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Today's Task</Text>
        <FlatList
          data={taskItems}
          renderItem={({ item, index }) => (
            <Tarefas
              item={item}
              index={index}
              setTaskItems={setTaskItems}
              taskItems={taskItems}
              editarTarefa={editarTarefa}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="Write a task"
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setTaskItems([...taskItems, task]);
              setTask("");
            }}
            disabled={!task}
          >
            <Ionicons name="add" size={40} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={()=> {setTask(''), hideModal()}}
          contentContainerStyle={containerStyle}
        >
          <TextInput
            value={task}
            onChangeText={(text) => setTask(text)}
            style={{marginBottom: 20}}
          />
          <Button mode="contained" onPress={salvarTarefa}>
            Ok
          </Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "black",
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "gray",
    height: 60,
    borderRadius: 15,
    fontSize: 20,
    backgroundColor: "white",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  addBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
