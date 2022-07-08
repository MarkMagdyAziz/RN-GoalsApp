import { useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  // States
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Handler Functions
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random() + Date.now() },
    ]);
    endAddGoalHandler();
  };
  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
    console.log("DELETED");
  };
  const startAddGoalHandler = () => {
    setModalVisible(true);
  };
  const endAddGoalHandler = () => {
    setModalVisible(false);
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View>
          <Button
            title="Add New Goal"
            color="#a065ec"
            onPress={startAddGoalHandler}
          />
        </View>
        <GoalInput
          visible={modalVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        {/* 
      <View style={styles.inputContainer}>
         <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} /> 
      </View>
      */}
        <View style={styles.goalsContainer}>
          {/* <ScrollView>
          {courseGoals.map((goal) => (
            <View key={goal} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteGoal={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            // keyExtractor={(item, index) => {
            //   return item.id;
            // }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    marginTop: 21,
  },
  goalsContainer: { flex: 5 },
});
