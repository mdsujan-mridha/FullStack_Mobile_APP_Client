

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import { defaultImg } from "../assets/profile/profile.jpg";
import { Avatar, Button } from 'react-native-paper';


const UpdateProfilePic = ({ navigation, route }) => {

    const [avatar, setAvatar] = useState(defaultImg);


    const submitHandler = () => {

        const myForm = new FormData();

        myForm.append("file", {
            uri: route.params.image,
            type: mime.getType(route.params.image),
            name: route.params.image.split("/").pop(),
        })
        dispatch(updatePic(myForm));
        // console.log(myForm);
    };

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image)
        }
    }, [route.params,])

    return (
        <View style={defaultStyle}>
            <View style={styles.container}>
                <Avatar.Image
                    source={{
                        uri: avatar,
                    }}
                    size={100}
                    style={{ backgroundColor: colors.color1 }}
                />
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("camera", { updateProfile: true })
                    }
                >
                    <Button
                        textColor={colors.color1}
                    >
                        Change Photo
                    </Button>
                    <Button
                        onPress={submitHandler}
                        textColor={colors.color1}
                    >
                        Update
                    </Button>
                </TouchableOpacity>
            </View>
        </View>
    )
}



export default UpdateProfilePic

const styles = StyleSheet.create({
    container: {
      elevation: 7,
      backgroundColor: colors.color3,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
  
    },
    container2: {
      elevation: 7,
      backgroundColor: colors.color3,
      padding: 30,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 30
    },
    name: {
      fontSize: 20,
      fontWeight: "500",
      marginTop: 10,
      color: colors.color2,
    },
    txt: {
      color: 'black'
    }
  });