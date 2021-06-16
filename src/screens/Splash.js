import React, { useRef, useEffect } from 'react';
import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { COLORS, FONTS } from '../constants';
import { Button } from 'react-native-paper';

export default function Splash({ navigation }) {
    const moveAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(moveAnim, {
                duration: 1000,
                toValue: Dimensions.get('window').width / 1.6,
                delay: 0,
                useNativeDriver: false,
            }),
            Animated.timing(moveAnim, {
                duration: 1000,
                toValue: 0,
                delay: 0,
                useNativeDriver: false,
            }),
        ]).start();
        Animated.timing(fadeAnim, {
            duration: 1000,
            toValue: 1,
            delay: 1000,
            useNativeDriver: false,
        }).start();
    }, [moveAnim, fadeAnim]);
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Animated.Image
                    style={[styles.image, { opacity: fadeAnim }]}
                    source={require('../../assets/icons/car.png')}
                />
                <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
                    <Text style={[styles.logoText]}>T</Text>
                    <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
                        ourGuide
                    </Animated.Text>
                </Animated.View>
            </View>
            <Button onPress={() => {
                navigator.navigate('Home')
            }}>Bắt đầu khám phá</Button>
        </SafeAreaView>


    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    logoText: {
        fontSize: 35,
        marginTop: 20,
        color: 'white',
        fontWeight: '700',
        ...FONTS.h1
        
    },
    contentContainer: {
        top: '40%',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        flexDirection: 'row',
    },
});