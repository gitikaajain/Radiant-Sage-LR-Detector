import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { StackActions } from "@react-navigation/native";

export const Activity = ({ navigation, route }) => {
	return (
		<SafeAreaView>
			<ScrollView>{/* <HeaderComponent /> */}</ScrollView>
		</SafeAreaView>
	);
};

export const activity = StyleSheet.create({
	content: {
		flex: 1,
		display: "flex",
		padding: 10,
		height: 80,
	},
});
