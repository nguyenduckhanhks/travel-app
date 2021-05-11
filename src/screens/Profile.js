import React, {useState} from 'react';
import { View, TextInput, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import {COLORS, icons, SIZES, FONTS, images} from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Posts from '../components/Home/Posts';
import EditProfile from '../components/Profile/EditProfile';

const Profile = ({navigation}) => {
    const [mode, setMode] = useState(['Post'])

    const changeMode = (newMode) => {
        setMode(newMode)
    }

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

                {/* Menu */}
                <View 
                    style={styles.menu}
                >
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={[styles.menuItem, mode == 'Post' ? styles.menuItemActive : '']}
                            onPress={() => changeMode('Post')}
                        >
                            <Image 
                                source={icons.instagram} 
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 5
                                }}/>
                            <Text>Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, mode == 'Image' ? styles.menuItemActive : '']}
                            onPress={() => changeMode('Image')}
                        >
                            <Image 
                                source={icons.image} 
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 5
                                }}/>
                            <Text>Image</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, mode == 'User' ? styles.menuItemActive : '']}
                            onPress={() => changeMode('User')}
                        >
                            <Image 
                                source={icons.user} 
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 5
                                }}/>
                            <Text>User</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

            <View style={{marginTop: 10, backgroundColor: COLORS.lightGray4, flex: 1}}>
                {/* POST */}
                {
                    mode == 'Post' &&
                    <Posts navigation={navigation}/>
                }

                {/* Image */}
                {
                    mode == 'Image' &&
                    <KeyboardAwareScrollView>
                        <View style={{display: 'flex',flexDirection: 'row', width: '100%', marginLeft: '2%', marginTop: 15}}>
                            {[1,2,3].map(img => 
                                <Image 
                                    key={img}
                                    source={images.teh_c_peng } 
                                    style={{
                                        width: "30%",
                                        height: 100,
                                        marginHorizontal: '1%',
                                        borderRadius: 20
                                    }} 
                                />
                            )}
                        </View>
                    </KeyboardAwareScrollView>
                }
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={mode == 'User'}
                onRequestClose={() => {
                    setModal(!modal)
                }}
            >
                <View style={styles.modalView}>
                    <View style={{backgroundColor: COLORS.white,}}>
                        
                        <View 
                            style={styles.menu}
                        >
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity
                                    style={[styles.menuItem, mode == 'Post' ? styles.menuItemActive : '']}
                                    onPress={() => changeMode('Post')}
                                >
                                    <Image 
                                        source={icons.instagram} 
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 5
                                        }}/>
                                    <Text>Post</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.menuItem, mode == 'Image' ? styles.menuItemActive : '']}
                                    onPress={() => changeMode('Image')}
                                >
                                    <Image 
                                        source={icons.image} 
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 5
                                        }}/>
                                    <Text>Image</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.menuItem, mode == 'User' ? styles.menuItemActive : '']}
                                    onPress={() => changeMode('User')}
                                >
                                    <Image 
                                        source={icons.user} 
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 5
                                        }}
                                    />
                                    <Text>User</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                        <EditProfile/>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.lightGray4
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
        height: 120,
        borderRadius: 10
    },
    name: {
        ...FONTS.h3,
        marginTop: 10,
    },
    description: {
        ...FONTS.body4,
        marginTop: 10,
        color: '#767676'
    }, 
    menu: {
        alignItems: 'center', 
        paddingVertical: 10, 
        width: '100%', 
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    menuItem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10, 
    },
    menuItemActive: {
        borderBottomColor: COLORS.primary, 
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    modalView: {
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: COLORS.black,
        borderRadius: 20,
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
})