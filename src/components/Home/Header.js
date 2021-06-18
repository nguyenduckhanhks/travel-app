import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native';
import { icons, SIZES, COLORS, FONTS } from '../../constants';
import firebase from 'firebase/app'

const initialCurrentLocation = {
    streetName: "Hà Nội",
    gps: {
        
        latitude: 21.025762,
        longitude: 105.852142
    }
}

const Header = ({navigation}) => {
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)
    const logout = () => {
        navigation.navigate('Login')
        firebase.auth().signOut().then(() => {
            
        })
    }

    return (
        <View style={{ flexDirection: 'row', height: 50 }}>
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={logout}
            >
                <Image
                    source={icons.post}
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
                    <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={{
                    width: 50,
                    
                    justifyContent: 'center'
                }}
                onPress={logout}
            >
                <Image
                    source={icons.logout}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </TouchableOpacity>

            
        </View>
    )
}

export default Header