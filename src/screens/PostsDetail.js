import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import Header from '../components/PostsDetail/Header';
import Postinfo from '../components/PostsDetail/PostInfo';

const postData = {
    id: 1,
    name: "ByProgrammers Burger",
    rating: 4.8,
    categories: [5, 7],
    priceRating: 1,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    location: {
        latitude: 1.5347282806345879,
        longitude: 110.35632207358996,
    },
    courier: {
        avatar: images.avatar_1,
        name: "Amy"
    },
}

const PostsDetail = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header 
                navigation={navigation}
            />
            <Postinfo
                postData={postData}
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