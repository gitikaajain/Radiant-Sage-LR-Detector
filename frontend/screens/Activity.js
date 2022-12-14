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
import { StyleSheet, Alert } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { StackActions } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import * as FS from 'expo-file-system';
import Constants from "expo-constants";
import axios from 'axios';
import { Audio } from 'expo-av';
import * as msh from '@mediapipe/hands';

// import sounds from '../audios';

const { manifest } = Constants;
const AUDIOS = {
	0: require('../audios/0.wav'),
	1: require('../audios/1.wav'),
	2: require('../audios/2.wav'),
	3: require('../audios/3.wav'),
	4: require('../audios/4.wav'),
	5: require('../audios/5.wav'),
	6: require('../audios/6.wav'),
}

const uriii = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
console.log("URII", uriii);

export const Activity = ({ navigation, route }) => {

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
			.then(async resp => {
				// response contains a number corresponding to the wav file that would be outputted
				let data = JSON.parse(resp.body)['data']
				let audio_file_no = data[0]
				let finger_proximity = data[1]
				console.log(audio_file_no);
				console.log(finger_proximity);
				console.log('Loading Sound');
				let audiopath = '../audios/' + String(audio_file_no) + '.wav';
				console.log(audiopath);
				const { sound } = await Audio.Sound.createAsync(AUDIOS[audio_file_no]);
				setSound(sound);
				console.log('Playing Sound');
				await sound.playAsync();
				Alert.alert(
					"Finger Proximity",
					"Thumb and Index Finger joined: " + String(finger_proximity[0]) + "\nIndex and Middle Finger joined: " + String(finger_proximity[1]) + "\nMiddle and Ring finger joined: " + String(finger_proximity[2]) + "\nRing and Pinky finger joined: " + String(finger_proximity[3]),
					[
						{
							text: "Cancel",
							style: "cancel",
						},
					],
					{
						cancelable: true,
						onDismiss: () =>
							Alert.alert(
								"This alert was dismissed by tapping outside of the alert dialog."
							),
					}
				);
			})
			.catch((err) => {
				console.log("Err ", err);
			})
	}

	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
	const [photo, setPhoto] = useState();
	const [sound, setSound] = React.useState();

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			const mediaLibraryPermission =
				await MediaLibrary.requestPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
			setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
			sound ? () => {
				console.log('Unloading Sound');
				sound.unloadAsync();
			}
				: undefined;
		})();
	}, [sound]);

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
			// const abs = await hands.send({ image: photo })
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
