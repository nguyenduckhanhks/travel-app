import React from 'react';
import { Animated, View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES, COLORS, FONTS, icons } from '../../constants'

const PostInfo = ({postData}) => {
    const scrollX = new Animated.Value(0);
    return (
        <View
            style={{
                paddingHorizontal: 20
            }}
        >
            <View
                style={{
                    marginBottom: 3 * SIZES.padding,
                    paddingTop: 50
                }}
            >
                <Image
                    source={postData.photo}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: SIZES.radius
                    }}
                />
            </View>

            <Animated.ScrollView
                vertical
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {/* Name */}
                <Text style={{ ...FONTS.h3 }}>{postData.name}</Text>

                {/* Location Address */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={icons.location}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{...FONTS.body4}}>Bangkok, Thai Lan</Text>
                </View>

                {/* Price */}
                <View  style={styles.textBg}>
                    <Text style={styles.text}>
                        $1000
                    </Text>
                </View>

                {/* Description */}
                <Text style={{...FONTS.h2}}>Description</Text>
                <Text style={{marginTop: 20, color: '#767676'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. 
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
            </Animated.ScrollView>
        </View>
    )
}

export default PostInfo

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
    },
    gradient:{
        flex: 1,
        borderRadius: 10,
        width: 'auto'
    },
    textBg: {
        alignSelf:'flex-start', 
        paddingVertical: 5,
        paddingHorizontal: 10, 
        backgroundColor: COLORS.primary, 
        borderRadius: 10,
        marginVertical: 20
    },
    text: {
        ...FONTS.body4,
        color: 'white',
    }
})