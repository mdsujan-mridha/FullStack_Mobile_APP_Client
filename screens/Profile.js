import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useMessageAndErrorUser } from '../utils/hooks'
import Loader from '../components/Layout/Loader';
import { Avatar, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import defaultImg from "../assets/profile/profile.jpg";
import { clearErrors, createProduct } from '../components/action/productAction';
import Toast from 'react-native-toast-message';
import { NEW_PRODUCT_RESET } from '../components/constant/productConstant';
import { loadUser } from '../components/action/userAction';

const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const { error, success } = useSelector((state) => state.newProduct);
  const [avatar, setAvatar] = useState(defaultImg);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const loading = useMessageAndErrorUser(navigation, dispatch, "login");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      default:
    }
  }


  const productSubmitHandler = () => {

    dispatch(createProduct(productName, description, phoneNumber, location, price, quantity, category));
  };


  useEffect(() => {

    if (error) {
      Toast.show(error);
      console.log(error);
      dispatch(clearErrors())
    }

    if (success) {
      Toast.show("Post new Product");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    // dispatch(loadUser())

  }, [error, success, dispatch]);



  const openGallery = async () => {
    let options = {
      options: {
        storageOptions: {
          path: 'images',
        }
      }
    }
    launchImageLibrary(options, (response) => {
      console.log(response);
    })
  };



  return (
    <>
      <View style={defaultStyle}>

        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}> {user?.name}'s Profile </Text>
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
                    <Button onPress={() => navigation.navigate("updateprofile")} style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> Update Profile </Text> </Button>
                  </TouchableOpacity>

                  <TouchableOpacity >

                    <Button onPress={() => navigation.navigate("updatepassword")} style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> update  password </Text> </Button>
                  </TouchableOpacity>
                </View>
                <View style={styles.container2} >
                  <TouchableOpacity >
                    <Button onPress={() => navigation.navigate("collection")} style={{ backgroundColor: 'white', marginTop: 20, }}> <Text> My Collection </Text> </Button>
                    <Button mode='contained' onPress={() => navigation.navigate("donation")} style={{ backgroundColor: 'white', marginTop: 20, }}> <Text style={styles.txt}> Donate food </Text> </Button>
                  </TouchableOpacity>

                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title style={{ textAlign: 'center', fontWeight: 600 }}>Donate your Food</Dialog.Title>
                      <Dialog.Content>
                        <Text>Enter the details of the food you want to donate here.</Text>
                        <View>

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
                            onPress={() => {
                              openGallery()
                            }}
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
                        <TextInput placeholder='Food name' value={productName} onChangeText={setProductName} />
                        <TextInput placeholder='Description' value={description} onChangeText={setDescription} />
                        <TextInput placeholder='location' value={location} onChangeText={setLocation} />
                        <TextInput placeholder='price' value={price} onChangeText={setPrice} />
                        <TextInput placeholder='quantity' value={quantity} onChangeText={setQuantity} />
                        <TextInput placeholder='Category' value={category} onChangeText={setCategory} />
                        <TextInput placeholder='phoneNumber' value={phoneNumber} onChangeText={setPhoneNumber} />

                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={() => {
                          productSubmitHandler()
                        }}> Confirm </Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
              </>
            )
        }
      </View >
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


