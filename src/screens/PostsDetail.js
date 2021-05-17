import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import * as firebase from 'firebase';

import Header from '../components/PostsDetail/Header';
import Postinfo from '../components/PostsDetail/PostInfo';

const PostsDetail = ({navigation, route}) => {
    const [uidLogin, setUidLogin] = useState('')
    const [authData, setAuthData] = useState(null)
    const [postData, setPostData] = useState(route.params.postData)
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) return navigation.navigate('Login')
            let uidLogin = user['uid']
            setUidLogin(uidLogin)
        })
        checkIsLike()
    }, [uidLogin])

    useEffect(() => {
        if(!postData) return
        // get auth data
        if(postData['auth']) {
            firebase.firestore()
                    .collection('users')
                    .where('id', '==', postData['auth'])
                    .onSnapshot(snaps => {
                        if(snaps.docs.length > 0) {
                            snaps.docs.forEach(doc => {
                                if(doc.id == postData['auth']) 
                                    setAuthData(doc.data())
                            })
                        }
                    })
        }
    }, [postData])

    const checkIsLike = () => {
        //check is liked
        if(!postData || postData['countLike'] == 0 || !uidLogin) return
        firebase.firestore()
                .collection('likes')
                .where('uid', '==', uidLogin)
                .where('listPost', 'array-contains-any', [postData['id']])
                .onSnapshot(snaps => {
                    if(snaps.docs.length > 0)
                        setIsLike(true)
                })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                navigation={navigation}
                postDataName={postData ? postData['name'] : 'POST NAME'}
            />
            <Postinfo
                postData={postData}
                authData={authData}
                isLike={isLike}
                uidLogin={uidLogin}
                setIsLike={setIsLike}
            />
        </SafeAreaView>
    )
}

export default PostsDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})