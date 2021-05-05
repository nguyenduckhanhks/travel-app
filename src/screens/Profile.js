import React from 'react';
import { View, TextInput, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {COLORS, icons, SIZES, FONTS, images} from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Profile = ({navigation}) => {
    return (
        <SafeAreaView  style={{marginBottom: 50}}>
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
                        <Text style={{ ...FONTS.h3 }}>Trang cá nhân</Text>
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
            
            <View style={styles.container}>
                {/* ảnh bìa */}
                <Image 
                    source={images.pizza_restaurant } 
                    style={styles.bgImage} 
                />
                
                {/* avatar  */}
                <Image 
                    source={images.teh_c_peng } 
                    style={styles.avatar} 
                />

                {/* name */}
                <Text style={styles.name}>Hasan Mahmud</Text>
                
                {/* mô tả */}
                <Text style={styles.description}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </Text>
                
                {/* Location Address */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={icons.location}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{...FONTS.body4}}>Bangkok, Thai Lan</Text>
                </View>

                <KeyboardAwareScrollView>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        {[1,2,3,4,5,6].map(img => 
                            <Image 
                                key={img}
                                source={images.teh_c_peng } 
                                style={{
                                    width: "30%",
                                    height: 100
                                }} 
                            />
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 70,
        marginTop: -35,
        marginLeft: 25
    },
    bgImage: {
        width: "100%",
        height: 180,
        borderRadius: 10
    },
    name: {
        ...FONTS.h3,
        marginTop: 10,
    },
    description: {
        ...FONTS.body3,
        marginTop: 10,
        color: '#767676'
    }
})