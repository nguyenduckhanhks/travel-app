import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {COLORS, icons, SIZES, FONTS, images} from '../constants';
import Posts from '../components/Home/Posts';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import ApprovalPost from '../components/Admin/ApprovalPost';

const Liked = ({navigation}) => {
    const [uidLogin, setUidLogin] = useState('')
    const [uidLoginData, setUIdLoginData] = useState(null)
    const [listPost, setListPost] = useState([])
    const [mode, setMode] = useState('liked')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) return navigation.navigate('Login')
            let uidLogin = user['uid']
            setUidLogin(uidLogin)
        })
    }, [uidLogin])

    useEffect(() => {
        if(!uidLogin) return
        firebase.firestore()
                .collection('users')
                .doc(uidLogin)
                .onSnapshot(doc => {
                    if(doc && doc.data())
                        setUIdLoginData(doc.data())
                })
    }, [uidLogin])

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
            {
                uidLoginData && uidLoginData['type'] == 'admin' && 
                <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <TouchableOpacity 
                        style={{
                            width: '48%',
                            marginLeft: '2%'
                        }}
                        onPress={() => setMode('liked')}
                    >
                        <LinearGradient colors={mode == 'liked' ? [COLORS.primary, COLORS.primary] : [COLORS.darkgray,COLORS.darkgray]} 
                            style={{
                                paddingVertical: 15,
                                backgroundColor: COLORS.white,
                                borderRadius:  20,
                                alignItems: 'center',
                                marginRight: '2%'
                            }}
                        >
                            <Text style={{...FONTS.h4, color: COLORS.white}}>Đã thích</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width: '48%',
                            marginRight: '2%'
                        }}
                        onPress={() => setMode('admin')}
                    >
                        <LinearGradient colors={mode == 'liked' ? [COLORS.darkgray,COLORS.darkgray] : [COLORS.primary, COLORS.primary]} 
                            style={{
                                paddingVertical: 15,
                                backgroundColor: COLORS.white,
                                borderRadius:  20,
                                alignItems: 'center',
                                marginRight: '2%'
                            }}
                        >
                            <Text style={{...FONTS.h4, color: COLORS.white}}>Duyệt địa điểm</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }
            {
                mode == 'liked' && 
                <Posts 
                    navigation={navigation}
                    listPost={listPost}
                    setListPost={setListPost}
                    isLiked={true}
                />
            }
            {
                mode == 'admin' && 
                <ApprovalPost 
                    navigation={navigation}
                />
            }
        </SafeAreaView>
    )
}

export default Liked