import React, {Component} from 'react';
import {StyleSheet, Linking, Text, View, Button, Image, TouchableOpacity} from "react-native";
import MapView from "react-native-maps";
import {icons, SIZES} from "../constants";

const  Map  = ({navigation, route}) => {
    const latitude = route.params.latitude;
    const longitude = route.params.longitude;
    const name = route.params.name;
    const description = route.params.description;
    return (
        <View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                    }}
                        title={name}
                        description={description}
                    />
                </MapView>
            </View>
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '5%',
                    left: '0%' ,//for center align
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 50,
                        marginRight: 30,
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
            </View>
        </View>
    );
}

export default Map

const styles = StyleSheet.create({
    map: {
        height: '100%',
    },
    container: {
        flexDirection: 'column',
    }
})