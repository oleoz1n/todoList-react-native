import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { Dispatch, useState } from "react";
  import { Modal, Portal, Text, Button, PaperProvider, TextInput } from "react-native-paper";
  import { Ionicons } from "@expo/vector-icons";

export default function Tarefas ({
    item,
    taskItems,
    setTaskItems,
    index,
    editarTarefa
  }: {
    item: string;
    taskItems: Array<string>;
    setTaskItems: Dispatch<React.SetStateAction<string[]>>;
    index: number;
    editarTarefa: any;
  }) {
    const handleApagar = () => {
      const newTaskItems = taskItems.filter((_, i) => i !== index);
      setTaskItems(newTaskItems);
    };
  
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.task}>{item}</Text>
        <TouchableOpacity onPress={() => handleApagar()}>
        <Ionicons
          name="trash"
          size={30}
          color="red"
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarTarefa(index)}>
        <Ionicons name="create" size={30} color="lightgray" />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    taskContainer: {
      padding: 20,
      backgroundColor: "white",
      marginTop: 10,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    task: {
      fontSize: 24,
      width: "80%",
    },
  });