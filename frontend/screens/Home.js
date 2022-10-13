import React from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { Provider as PaperProvider } from "react";
import { Activity } from "./Activity";
export const Home = ({ navigation }) => {
	// export default function Home({ navigation }) {
	const Start = () => Alert.alert("Start");
	return (
		<ImageBackground
			style={styles.background}
			source={require("../assets/background.jpg")}
		>
			<Image style={styles.logo} source={require("../assets/icon.png")} />

			<View style={styles.logoContainer}>
				<Text> Left And Right Palm Detector</Text>
			</View>
			<View style={styles.logButton}>
				<Button
					mode="contained"
					color="#fccb00"
					contentStyle={{ height: 60, width: 500 }}
					labelStyle={{ color: "white", fontSize: 20 }}
					onPress={() => navigation.navigate("Detector")}
				>
					START
				</Button>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		//padding: 40,
	},
	logButton: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		height: 70,
		alignItems: "flex-end",
		position: "absolute",
		flexDirection: "row",
	},
	logo: {
		position: "absolute",
		top: 240,
		// alignContent: "center",
		// // alignItems: "center",
		// // justifyContent: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	logoContainer: {
		position: "absolute",
		justifyContent: "center",
		top: 330,
		alignItems: "center",
	},
});
