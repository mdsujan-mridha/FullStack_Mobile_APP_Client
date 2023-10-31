import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import { useMessageAndErrorUser } from '../utils/hooks'
import { logout } from '../components/action/userAction'
import Loader from '../components/Layout/Loader';
import { Avatar, Button, Dialog, Portal, TextInput } from 'react-native-paper';

import defaultImg from "../assets/profile/profile.jpg";

const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(defaultImg);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const loading = useMessageAndErrorUser(navigation, dispatch, "login");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");


      default:
      case "Orders":
        navigation.navigate("orders");
        break;
    }
  }

  return (
    <>
      <View style={defaultStyle}>

        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}> Profile </Text>
        </View>
        {/* loading  */}
        {
          loading ?
            (<Loader />) :
            (
              <>
                <View style={styles.container}>
                  <Image
                    source={avatar}
                    style={{ backgroundColor: colors.color1, width: 100, height: 100, borderRadius: 100 }}
                  />
                  <TouchableOpacity >
                    <Button style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> Update Profile </Text> </Button>

                  </TouchableOpacity>
                  <TouchableOpacity >

                    <Button style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> Reset password </Text> </Button>
                  </TouchableOpacity>
                </View>
                <View style={styles.container2} >
                  <TouchableOpacity >
                    <Button style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> My Donation </Text> </Button>
                    <Button mode='contained' onPress={showDialog} style={{ backgroundColor: 'white', marginTop: 20, }}> <Text style={styles.txt}> Donate food </Text> </Button>
                  </TouchableOpacity>

                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title style={{ textAlign: 'center', fontWeight: 600 }}>Donate your Food</Dialog.Title>
                      <Dialog.Content>
                        <Text>Enter the details of the food you want to donate here.</Text>
                        <TextInput  placeholder='Food name'/>
                        <TextInput  placeholder='Description'/>
                        <TextInput  placeholder='location'/>
                        <TextInput  placeholder='price'/>
                        <TextInput  placeholder='quantity'/>
                        
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={hideDialog}>Confirm</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
              </>
            )
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
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

export default Profile


