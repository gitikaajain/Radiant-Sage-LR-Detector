import React from "react";
import { Appbar } from "react-native-paper";

export const HeaderComponent = () => {
	return (
		<Appbar>
			<Appbar.BackAction />
			<Appbar.Content title=" Detector " />
		</Appbar>
	);
};
