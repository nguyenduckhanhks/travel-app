import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import Catagory from '../components/Home/Catagory';
import Header from '../components/Home/Header';
import Posts from '../components/Home/Posts';

const Home = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [listPost, setListPost] = useState([])
    const [lastPost, setLastPost] = useState(null)
    const [searchText, setSearchText] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={props.navigation} />
            <View style={styles.inputSection}>
                <Icon style={styles.inputIcon} name="search-outline" size={20} color={COLORS.primary} />
                <TextInput
                    style={{ ...FONTS.body3, width: '100%', paddingLeft: 10 }}
                    placeholder="Tìm kiếm"
                    onChangeText={setSearchText}
                />
            </View>
            <Catagory
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
            <Posts
                navigation={props.navigation}
                listPost={listPost}
                setListPost={setListPost}
                lastPost={lastPost}
                setLastPost={setLastPost}
                selectedCategory={selectedCategory}
                searchText={searchText}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    inputSection: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 0,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 20,
        height: 40,
        alignItems: 'center',
    }
})

export default Home