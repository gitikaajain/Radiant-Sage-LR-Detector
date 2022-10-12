// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import Home from "../screens/Home";
// import Activity from "../screens/Activity";

// const { Navigator, Screen } = createNativeStackNavigator();
// const AppNavigator = () => {
// 	<NavigationContainer>
// 		<Navigator headerMode="none" initialRouteName="Home">
// 			<Screen name="Home" component={Home} />

// 			<Screen name="Activity" component={Activity} />
// 		</Navigator>
// 	</NavigationContainer>;
// };

// export default AppNavigator;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import { Home } from "../screens/Home";
import { Activity } from "../screens/Activity";

const screens = {
	Home: {
		screen: Home,
	},
	Activity: {
		screen: Activity,
	},
};

const AppNavigator = createNativeStackNavigator(screens);
export default createNativeStackNavigator(AppNavigator);
