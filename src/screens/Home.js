import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {COLORS} from '../constants';

import Catagory from '../components/Home/Catagory';
import Header from '../components/Header';
import Posts from '../components/Home/Posts';

const Home = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <Catagory/>
            <Posts 
                navigation={props.navigation}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    }
})

export default Home