import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearErrors, updatePassword } from '../components/action/userAction';
import Toast from 'react-native-toast-message';
import { UPDATE_PASSWORD_RESET } from '../components/constant/userConstant';
import { Button } from 'react-native-paper';
import Loader from '../components/Layout/Loader';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector((state) => state?.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigation();

    const passwordSubmitHandler = () => {

        const myForm = {
            oldPassword,
            newPassword,
            confirmPassword,

        }
        dispatch(updatePassword(myForm))
        // console.log(myForm);


    }

    useEffect(() => {
        if (error) {
            Toast.show(error);
            dispatch(clearErrors());
            console.log(error);
        }
        if (isUpdated) {
            Toast.show("Profile update successful");
            navigate("/Profile");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);


    return (
        <View style={defaultStyle}>
            {/* heading  */}
            <View style={{ marginBottom: 20 }}>
                <Text style={formHeading}> update password </Text>
            </View>

            <View>
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Old password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="New password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                {
                    loading ?
                        (<Loader />)
                        :
                        (<Button
                            disabled={
                                !oldPassword || !newPassword || !confirmPassword
                            }
                            style={Styles.btn}
                            onPress={passwordSubmitHandler}
                        >
                            <Text style={{ color: "#fff" }}> Update password </Text>
                        </Button>)
                }
            </View>
        </View>
    )
}

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

export default UpdatePassword

