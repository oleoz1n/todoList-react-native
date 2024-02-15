import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Tarefas = ({ item }: { item: string }) => {
    return (
        <View>
            <Text>{item}</Text>
        </View>
    );
};

const App = () => {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState<Array<string>>([]);
    return (
        <View style={styles.safeArea}>
            <StatusBar style="auto" />
            <Text style={styles.titulo}>Today's Task</Text>
            <FlatList
                data={taskItems}
                renderItem={({ item }) => <Tarefas item={item} />}
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
                    <Ionicons name="add" size={30} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
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
        fontSize: 24,
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
        height: 40,
        borderRadius: 15,
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
