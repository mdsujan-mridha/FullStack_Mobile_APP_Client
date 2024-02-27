import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useMessageAndErrorUser } from '../utils/hooks'
import Loader from '../components/Layout/Loader';
import { Avatar, Button, Dialog, Portal } from 'react-native-paper';
import { defaultImg } from "../assets/profile/profile.jpg";
import Chart from '../components/AdminPanel/Chart';
import ButtonBox from '../utils/ButtonBox';
import ProductListHeading from '../components/Product/ProductListHeading';
import ProductListItem from '../components/Product/ProductListItem';
import mime from "mime";
import { loadUser, updatePic } from '../components/action/userAction';


const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const [avatar, setAvatar] = useState(defaultImg);
  const [allProducts, setAllProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "login");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    let apiUrl = 'https://emerald-capybara-slip.cyclic.cloud/api/v1/products';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setAllProducts(data.products))
  }, [])
  const inStock = allProducts.length;
  const outOfStock = 5;

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image)
      const myForm = new FormData();
      myForm.append("file", {
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop(),
      });
      // console.log("Form data is:-",myForm);
      dispatch(updatePic(myForm))
    }
    // dispatch(loadUser())

  }, [route.params, dispatch]);


  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);

  // console.log(user);
  // console.log(route.params.image);

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
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Chart inStock={inStock} outOfStock={outOfStock} />
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 10,
                      justifyContent: "space-between",
                    }}>
                    <ButtonBox
                      icon={"plus"}
                      text={"Donate"}
                      handler={() => navigation.navigate("donation")}
                    />
                    <ButtonBox
                      icon={"format-list-bulleted-square"}
                      text={"Update Profile"}
                      handler={showDialog}
                    />
                    <ButtonBox
                      icon={"plus"}
                      text={"Collection"}
                      handler={() => navigation.navigate("collection")}
                    />
                  </View>
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>

                      <Dialog.Content>
                        <Button onPress={() => { navigation.navigate("updateprofile"); showDialog(false); }}> <Text> Update profile </Text> </Button>
                        <Button onPress={() => { navigation.navigate("updatepassword"); showDialog(false); }}> <Text> Update password </Text> </Button>
                     
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Thank you!</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
                <ProductListHeading />
                <ScrollView>
                  {
                    allProducts &&
                    allProducts.map((item, index) => (
                      <ProductListItem
                        key={item?._id}
                        id={item?._id}
                        i={index}
                        price={item?.price}
                        title={item?.productName ? item?.productName : item.title}
                        category={item?.category}
                        stock={item?.quantity}
                      />
                    ))
                  }
                </ScrollView>
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

export default Profile


