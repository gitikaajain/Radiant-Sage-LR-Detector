import React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	Image,
	Button,
} from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { StackActions } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import * as FS from 'expo-file-system';
import Constants from "expo-constants";
import axios from 'axios';

const { manifest } = Constants;

const uriii = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
console.log("URII", uriii);

async function sendToServer(obj) {

	// defining connection constructs
	let schema = "http://";
	let host = "192.168.29.245";
	let route = "/scan";
	let port = "5000";
	let url = "";
	let content_type = "image/jpeg";

	url = schema + host + ":" + port + route;
	console.log(url);

	console.log("obj", obj);

	// uploading captured image on backend
	let response = await FS.uploadAsync(url, obj.uri, {
		headers: {
			"content-type": content_type,
		},
		httpMethod: "POST",
		uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
	})
		.then(resp => {
			// response contains a number corresponding to the wav file that would be outputted
			let audio_file_no = JSON.parse(resp.body)['audio_no']
			console.log(audio_file_no);
		})
		.catch((err) => {
			console.log("Err ", err);
		})
}

export const Activity = ({ navigation, route }) => {
	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
	const [photo, setPhoto] = useState();

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			const mediaLibraryPermission =
				await MediaLibrary.requestPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
			setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
		})();
	}, []);

	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>;
	} else if (!hasCameraPermission) {
		return (
			<Text>
				Permission for camera not granted. Please change this in settings.
			</Text>
		);
	}

	let takePic = async () => {
		let options = {
			quality: 1,
			base64: true,
			exif: false,
		};

		let newPhoto = await cameraRef.current.takePictureAsync(options);

		setPhoto(newPhoto);
		console.log("photo:", photo);
	};

	if (photo) {
		let sharePic = () => {
			shareAsync(photo.uri).then(() => {
				setPhoto(undefined);
			});
		};

		let savePhoto = async () => {
			console.log("***", photo.uri);
			const obj = {
				type: "image",
				base64: true,
				uri: photo.uri,
			};
			const abc = await sendToServer(obj);
			MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
				setPhoto(undefined);
				// console.log("saved");
			});
		};

		return (
			<SafeAreaView style={styles.container}>
				<Image
					style={styles.preview}
					source={{ uri: "data:image/jpg;base64," + photo.base64 }}
				/>
				<Button title="Share" onPress={sharePic} />
				{hasMediaLibraryPermission ? (
					<Button title="Save" onPress={savePhoto} />
				) : undefined}
				<Button title="Discard" onPress={() => setPhoto(undefined)} />
			</SafeAreaView>
		);
	}

	return (
		<Camera style={styles.container} ref={cameraRef}>
			<View style={styles.buttonContainer}>
				<Button
					// contentStyle={{ height: 60, width: 500 }}
					// labelStyle={{ color: "white", fontSize: 20 }}
					title="Take Pic"
					onPress={takePic}
				/>
			</View>
			{/* <StatusBar style="auto" /> */}
		</Camera>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		// display: "flex",
		// flex: 1,

		// height: 35,
		// alignItems: "flex-end",
		// position: "absolute",
		// flexDirection: "column",
		// backgroundColor: "#fff",

		width: "100%",
		height: 70,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
	},
	preview: {
		alignSelf: "stretch",
		flex: 1,
	},
});
