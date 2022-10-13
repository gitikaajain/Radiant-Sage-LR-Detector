// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { TextInput } from "react-native";
// import { Provider as PaperProvider } from "react-native-paper";
// import AppNavigator from "./appNavigator/app.navigator";
// import { NavigationContainer } from "@react-navigation/native";
// import { Home } from "./screens/Home";

// const App = () => {
// 	return (
// 		<NavigationContainer>
// 			<AppNavigator />
// 		</NavigationContainer>
// 	);
// };
// export default App;
import { useEffect, useRef, useState } from "react";
import { Home } from "./screens/Home";
import { Activity } from "./screens/Activity";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} options={{ title: "" }} />
				<Stack.Screen name="Detector" component={Activity} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
