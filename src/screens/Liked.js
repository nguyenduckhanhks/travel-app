import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {COLORS, icons, SIZES, FONTS, images} from '../constants';
import Posts from '../components/Home/Posts';

const Liked = ({navigation}) => {
    const [listPost, setListPost] = useState([])

    return (
        <SafeAreaView style={{backgroundColor: COLORS.lightGray4, flex: 1,}}>
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Đã thích</Text>
                    </View>
                </View>

                <View
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                ></View>
            </View>

            <Posts 
                navigation={navigation}
                listPost={listPost}
                setListPost={setListPost}
                isLiked={true}
            />
        </SafeAreaView>
    )
}

export default Liked