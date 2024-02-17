import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import defaultImg from "../assets/profile/profile.jpg";
import { clearErrors, loadUser, updateProfile } from '../components/action/userAction';
import Toast from 'react-native-toast-message';
import { UPDATE_PROFILE_RESET } from '../components/constant/userConstant';
import Loader from '../components/Layout/Loader';
import { Button } from 'react-native-paper';

const UpdateProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    // all state 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("defaultImg");



    const updateProfileSubmit = (e) => {
        const myForm = {
            name,
            email,
            avatar
        }
        dispatch(updateProfile(myForm));
    }

    // const updateProfileDataChange = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatarPreview(reader.result);
    //             setAvatar(reader.result);
    //         }
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // };

    useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
            setAvatarPreview(user?.avatar?.url)
        }
        if (error) {
            Toast.show(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            Toast.show('Profile updated successfully')
            // dispatch(loadUser);
            // navigation.navigate("Profile")
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, user, isUpdated, error])

    return (
        <View style={defaultStyle}>
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> {user?.name}'s Profile Update </Text>
            </View>

            <View>
                <TextInput
                    style={Styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={Styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <View
                    style={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        loading ?
                            (<Loader />)
                            :
                            (<Button
                                disabled={
                                    !name || !email
                                }
                                style={Styles.btn}
                                onPress={updateProfileSubmit}
                            >
                                <Text style={{ color: "#fff" }}> Update Profile </Text>
                            </Button>)
                    }
                </View>


            </View>

        </View>
    )
}

export default UpdateProfile

const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },
    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
})