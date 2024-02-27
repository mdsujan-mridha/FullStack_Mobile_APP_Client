import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors, defaultStyle, formHeading, formStyles, inputStyling } from '../styles/styles'
import { Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../components/action/productAction';
import mime from "mime";
import Toast from 'react-native-toast-message';
import { NEW_PRODUCT_RESET } from '../components/constant/productConstant';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


const NewDonation = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.newProduct);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [date, setDate] = useState("");



    //======================= notification============================

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            // console.log("token", token);
            setExpoPushToken(token);
        });

    }, [])

    // send notification handler function 
    const sendNotificationHandler = async () => {
        // Object for notification
        const message = {
            to: expoPushToken,
            sound: "default",
            title: "New Donation Available",
            body: `${productName} has been listed as available for donation by ${phoneNumber}`,
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                host: "exp.host",
                accept: "application/json",
                "content-type": "application/json", // Corrected header field name
            },
            body: JSON.stringify(message),
        });
    };


    //   =====================notification function =================
    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            token = (await Notifications.getExpoPushTokenAsync({ projectId: '770f48a4-892b-45f4-9278-4fdfab42e66f' })).data;
            // console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    const clearForm = () => {
        setProductName("");
        setDescription("");
        setLocation("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPhoneNumber("");
        setImage(""); // Assuming you want to clear the image as well
    };
    //=========================== new donation handler ======================================
    const submitHandler = () => {
        const myForm = new FormData();
        myForm.append("productName", productName);
        myForm.append("description", description);
        myForm.append("price", price);
        myForm.append("quantity", quantity);
        myForm.append("category", category);
        myForm.append("location", location);
        myForm.append("phoneNumber", phoneNumber);
        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        });

        // if (categoryID) myForm.append("category", categoryID);

        dispatch(createProduct(myForm));
        // console.log(myForm);
        clearForm();

    };

    useEffect(() => {

        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            });
            console.log(error);
            dispatch(clearErrors())
        }

        if (success) {
            Toast.show({
                type: 'success',
                text1: "Your Donation Add successfully",
            });

            dispatch({ type: NEW_PRODUCT_RESET });
            clearForm(); // Clear the form after submission
        }

    }, [error, success, dispatch]);

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
    }, [route.params]);

    return (
        <View
            style={defaultStyle}
        >
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> Donate Your food! </Text>
            </View>

            <ScrollView style={formStyles}>

                <View
                    style={{
                        width: 80,
                        height: 80,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                >
                    <Avatar.Image
                        size={80}
                        style={{
                            backgroundColor: colors.color1,
                        }}
                        source={{
                            uri: image ? image : null,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("camera", { newProduct: true })
                        }
                    >
                        <Avatar.Icon
                            icon={"camera"}
                            size={30}
                            color={colors.color3}
                            style={{
                                backgroundColor: colors.color2,
                                position: "absolute",
                                bottom: 0,
                                right: -5,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder='Food name'
                    value={productName}
                    onChangeText={setProductName}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />

                <TextInput
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='location'
                    value={location}
                    onChangeText={setLocation}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='price'
                    value={price}
                    onChangeText={setPrice}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='Expire date'
                    value={date}
                    onChangeText={setDate}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />


                <TextInput
                    placeholder='quantity'
                    value={quantity}
                    onChangeText={setQuantity}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='Category'
                    value={category}
                    onChangeText={setCategory}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='phoneNumber'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={{ ...inputStyling, borderColor: '#000000', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingLeft: 10 }}
                />
                <Button
                    onPress={() => {
                        submitHandler();
                        sendNotificationHandler();
                    }}
                    style={{ backgroundColor: "rgba(227,25,99,1)", }}>
                    <Text style={{ color: "#ffff", fontSize: 17, fontWeight: 900 }}> Donate </Text> </Button>
            </ScrollView>
        </View>
    )
}

export default NewDonation

const styles = StyleSheet.create({})