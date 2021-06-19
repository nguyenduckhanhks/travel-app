import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import firebase from 'firebase/app'
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Posts = ({ navigation, listPost, setListPost, lastPost, setLastPost, getAll = true, isMyPost = false, isLiked = false, selectedCategory, searchText,title }) => {
    const [uidLogin, setUidLogin] = useState('')
    const prevCata = usePrevious(selectedCategory)
    const preTextSearch = usePrevious(searchText)

    useEffect(() => {
        if (prevCata != selectedCategory || preTextSearch != searchText) {
            setListPost([])
            setLastPost(null)
        }
    }, [selectedCategory, searchText])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) return navigation.navigate('Login')
            let uidLogin = user['uid']
            setUidLogin(uidLogin)
        })
        getAllListPost()
    }, [uidLogin, selectedCategory, searchText])

    const getAllListPost = () => {
        if (!uidLogin) return
        if (isMyPost) {
            if (!lastPost) {
                firebase.firestore()
                    .collection('places')
                    .where('auth', '==', uidLogin)
                    .where('status', '==', 'active')
                    .limit(5)
                    .onSnapshot(snaps => {
                        setLastPost(snaps.docs[snaps.docs.length - 1])
                        let tmpList = snaps.docs.map(doc => {
                            return {
                                idDoc: doc.id,
                                ...doc.data()
                            }
                        })
                        setListPost(tmpList)
                    })
            } else {
                firebase.firestore()
                    .collection('places')
                    .where('auth', '==', uidLogin)
                    .where('status', '==', 'active')
                    .startAfter(lastPost)
                    .limit(5)
                    .onSnapshot(snaps => {
                        if (snaps.docs.length > 0) {
                            setLastPost(snaps.docs[snaps.docs.length - 1])
                        }
                        let tmpList = snaps.docs.map(doc => {
                            return {
                                idDoc: doc.id,
                                ...doc.data()
                            }
                        })
                        setListPost([
                            ...listPost,
                            ...tmpList
                        ])
                    })
            }
        }
        if (getAll) {
            if (!lastPost || prevCata != selectedCategory || preTextSearch != searchText) {
                let ft = firebase.firestore()
                    .collection('places')
                    .where('status', '==', 'active')

                if (selectedCategory != 'all') {
                    ft = ft.where('catagory.id', '==', selectedCategory)
                }

                if (searchText != '') {
                    ft = ft.where('name', '>=', searchText)
                        .where('name', '<=', searchText + '\uf8ff')
                }

                ft.limit(5)
                    .onSnapshot(snaps => {
                        setLastPost(snaps.docs[snaps.docs.length - 1])
                        let tmpList = snaps.docs.map(doc => {
                            return {
                                idDoc: doc.id,
                                ...doc.data()
                            }
                        })
                        setListPost(tmpList)
                    })
            } else {
                let ft = firebase.firestore()
                    .collection('places')
                    .where('status', '==', 'active')

                if (selectedCategory != 'all') {
                    ft = ft.where('catagory.id', '==', selectedCategory)
                }

                if (searchText != '') {
                    ft = ft.where('name', '>=', searchText)
                        .where('name', '<=', searchText + '\uf8ff')
                }

                ft.startAfter(lastPost)
                    .limit(5)
                    .onSnapshot(snaps => {
                        if (snaps.docs.length > 0) {
                            setLastPost(snaps.docs[snaps.docs.length - 1])
                        }
                        let tmpList = snaps.docs.map(doc => {
                            return {
                                idDoc: doc.id,
                                ...doc.data()
                            }
                        })
                        setListPost([
                            ...listPost,
                            ...tmpList
                        ])
                    })
            }
        }

        if (isLiked) {
            if (!lastPost) {
                firebase.firestore()
                    .collection('likes')
                    .where('uid', '==', uidLogin)
                    // .limit(1)
                    .onSnapshot(snaps => {
                        // setLastPost(snaps.docs[snaps.docs.length - 1])
                        snaps.docs.forEach(doc => {
                            if (doc.data()['uid'] == uidLogin) {
                                let listPosts = doc.data()['listPost']
                                let result = []
                                listPosts.forEach(post => {
                                    firebase.firestore()
                                        .collection('places')
                                        .where('id', '==', post)
                                        .where('status', '==', 'active')
                                        .onSnapshot(snapshot => {
                                            snapshot.docs.forEach(element => {
                                                if (element.data()['id'] == post) {
                                                    result.push({
                                                        idDoc: element.id,
                                                        ...element.data()
                                                    })
                                                    setListPost(result)
                                                }
                                            });
                                        })
                                })
                            }
                        })
                    })
            }

        }
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
                    source={item && item.image ? { uri: item.image } : icons.image}
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

            {/*Info */}
            <Text style={{ ...FONTS.h3 }}>{item.name}</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Map", {
                latitude: item.lat,
                longitude: item.long,
                name: item.name,
                description: item.description
            })} >
                <Text style={{color: '#888', ...FONTS.h4 }}>Chỉ đường</Text>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >

                {/* Categories */}
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        {/* <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text> */}
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
            {
                listPost.indexOf(item) == listPost.length - 1 &&
                <View>
                    <TouchableOpacity
                        style={{
                            width: '40%',
                            marginLeft: '30%',
                            marginBottom: 200,
                            marginTop: 50,
                            paddingBottom:100,
                            
                            
                        }}
                        onPress={() => getAllListPost()}
                    >
                        <LinearGradient colors={[COLORS.primary, COLORS.primary]}
                            style={{
                                paddingVertical: 10,
                                backgroundColor: COLORS.white,
                                borderRadius: 20,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ ...FONTS.body3, color: COLORS.white }}>Xem thêm</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }
        </TouchableOpacity>
    )

    return (
        <View>
            <Text style={{paddingHorizontal: SIZES.padding * 2,...FONTS.h2}}>{title}</Text>
            <FlatList
                data={listPost}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom:100
                }}
            />
        </View>

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