import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import Header from '../components/PostsDetail/Header';
import Postinfo from '../components/PostsDetail/PostInfo';

const PostsDetail = ({navigation, route}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header 
                navigation={navigation}
            />
            <Postinfo
                postData={route.params.postData}
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