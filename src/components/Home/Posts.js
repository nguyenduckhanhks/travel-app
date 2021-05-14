import React, {useState, useEffect} from 'react';
import {FlatList, View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Posts = ({navigation, listPost, setListPost}) => {
    const [uidLogin, setUidLogin] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) return navigation.navigate('Login')
            let uidLogin = user['uid']
            setUidLogin(uidLogin)
        })
        getAllListPost()
    }, [uidLogin])

    const getAllListPost = () => {
        firebase.firestore()
                .collection('places')
                .onSnapshot(snaps => {
                    let tmpList = snaps.docs.map(doc => {
                        return doc.data()
                    })
                    setListPost(tmpList)
                })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2 }}
            onPress={() => navigation.navigate("PostsDetail", {
                postData: item
            })}
        >
            {/* Image */}
            <View
                style={{
                    marginBottom: SIZES.padding
                }}
            >
                <Image
                    source={item && item.image ? {uri: item.image} : icons.image}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: SIZES.radius
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: 50,
                        width: SIZES.width * 0.3,
                        backgroundColor: COLORS.white,
                        borderTopRightRadius: SIZES.radius,
                        borderBottomLeftRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.cost + ' VNĐ'}</Text>
                </View>
            </View>

            {/* Restaurant Info */}
            <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Icon style={{marginRight: 5}} name="heart" size={20} color={COLORS.primary}/>
                <Text style={{ ...FONTS.body3 }}>{item.countLike > 0 ? item.countLike : ''}</Text>

                {/* Categories */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: 5
                    }}
                >
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                        <Text style={{ ...FONTS.body3 }}>{item.catagory['name']}</Text>
                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                    </View>

                </View>
                {/* Rating */}
                <Text style={{ ...FONTS.body3 }}>{item.rate}</Text>
                <Image
                    source={icons.star}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.primary,
                        marginLeft: 5
                    }}
                />
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            data={listPost}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding * 2,
                paddingBottom: 30
            }}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Posts;