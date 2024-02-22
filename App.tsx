import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { Dispatch, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Tarefas = ({
    item,
    taskItems,
    setTaskItems,
    index,
}: {
    item: string;
    taskItems: Array<string>;
    setTaskItems: Dispatch<React.SetStateAction<string[]>>;
    index: number;
}) => {
    const [newTask, setNewTask] = useState(item);
    const [edit, setEdit] = useState(false);

    const editarTask = () => {
        const newTaskItems = [...taskItems];
        newTaskItems[index] = newTask;
        setTaskItems(newTaskItems);
        setEdit(false);
    };

    const handleApagar = () => {
        const newTaskItems = taskItems.filter((_, i) => i !== index);
        setTaskItems(newTaskItems);
    };

    const handleEditar = () => {
        setEdit(true);
    };

    return (
        <View style={styles.taskContainer}>
            <Text
                onPress={() => handleEditar()}
                style={[styles.task, { display: edit ? "none" : "flex" }]}
            >
                {item}
            </Text>
            <TextInput
                style={[styles.inputTask, { display: edit ? "flex" : "none" }]}
                value={newTask}
                onChangeText={(text) => setNewTask(text)}
                onSubmitEditing={() => editarTask()}
            />
            <Ionicons
                style={styles.iconsStyle}
                name="trash"
                size={30}
                color="red"
                onPress={() => handleApagar()}
            />
        </View>
    );
};

const App = () => {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState<Array<string>>([]);

    return (
        <View style={styles.home}>
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
    );
};

export default App;

const styles = StyleSheet.create({
    home: {
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
    taskContainer: {
        padding: 20,
        backgroundColor: "white",
        marginTop: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
    },
    task: {
        fontSize: 24,
        width: "90%",
    },
    inputTask: {
        fontSize: 24,
        width: "60%",
        borderBottomWidth: 1,
        display: "none",
    },
    iconsStyle: {
        width: "10%",
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
