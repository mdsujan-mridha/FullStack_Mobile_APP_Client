import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle, formHeading } from '../../styles/styles'
import Loader from '../Layout/Loader'
import ButtonBox from '../../utils/ButtonBox'
import ProductListHeading from '../Product/ProductListHeading'
import { fakeData } from '../../screens/Home'
import ProductListItem from '../Product/ProductListItem'
import Chart from './Chart'


const AdminPanel = () => {

    const loading = false

    const navigateHandler = (text) => {

    }

    const deleteHandler = (id) => {
        console.log(id)

    }

    const inStock = 12;
    const outOfStock = 5;

    return (
        <>
            <View style={defaultStyle}>

                <View style={{ marginBottom: 20, paddingTop: 70 }}>
                    <Text style={formHeading}> Admin Panel </Text>
                </View>

                {
                    loading ? (<Loader />)
                        :
                        (
                            <>

                                <View style={{
                                    backgroundColor: colors.color3,
                                    borderRadius: 20,
                                    alignItems: "center",
                                }}
                                >
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
                                            text={"Product"}
                                            handler={navigateHandler}
                                        />
                                        <ButtonBox
                                            icon={"format-list-bulleted-square"}
                                            text={"All Orders"}
                                            handler={navigateHandler}
                                        />
                                        <ButtonBox
                                            icon={"plus"}
                                            text={"user"}
                                            handler={navigateHandler}
                                        />
                                    </View>
                                </View>
                                <ProductListHeading />
                                <ScrollView>
                                    <View>
                                        {
                                            fakeData &&
                                            fakeData.map((item, index) => (
                                                <ProductListItem
                                                    key={item?._id}
                                                    id={item?._id}
                                                    i={index}
                                                    price={item?.price}
                                                    title={item?.title}
                                                    category={item?.category}
                                                    img={item?.img}
                                                    deleteHandler={deleteHandler}
                                                    stock={item?.Stock}
                                                />
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                            </>
                        )
                }
            </View>
        </>
    )
}

export default AdminPanel