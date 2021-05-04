import React, {useState, useEffect} from 'react';
import { 
    View,
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

const NewPost = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
    
    return (
            <KeyboardAwareScrollView style={{marginBottom: 50}}>
                <View 
                    style={styles.container}
                >
                    <View>
                        <Text style={styles.title}>Thêm địa điểm</Text>
                    </View>

                    {/* Image */}
                    <View style={{height: 210, marginVertical: 20}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                            {
                                <Image 
                                    source={image ? { uri: image} : images.image_blank } 
                                    style={{ 
                                        width: "100%",
                                        height: 200,
                                        borderRadius: SIZES.radius
                                    }} 
                            />}
                            <TouchableOpacity 
                                style={{marginLeft: -30, marginTop: 13}} 
                                onPress={() => pickImage()}
                            >
                                <LinearGradient colors={[COLORS.primary, COLORS.primary]} style={{width: 30, height: 30,borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="pencil-outline" size={18} color="#fff"/>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Tên địa điểm</Text>
                        <View style={styles.inputSection}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setEmail}
                            />
                        </View>

                        <Text style={styles.label}>Địa chỉ</Text>
                        <View style={styles.inputSection}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Text style={styles.label}>Phí dịch vụ</Text>
                        <View style={styles.inputSection}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Text style={styles.label}>Danh mục</Text>
                        <View style={styles.inputSection}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Text style={styles.label}>Mô tả</Text>
                        <View style={[styles.textareaSection]}>
                            <TextInput
                                multiline={true}
                                numberOfLines={14}
                                style={styles.input}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => {navigation.navigate('Home')}}
                        >
                            <LinearGradient colors={[COLORS.primary, COLORS.primary]} style={styles.gradient}>
                                <Text style={styles.text}>
                                        Đăng bài</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAwareScrollView>
    )
}

export default NewPost

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: 40,
        marginBottom: 50,
        flex: 1
    },
    inputSection: {
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical: 0,
        backgroundColor: '#fff',
        borderRadius:10,
        marginTop: 5,
        height: 50,
        alignItems: 'center',
    },
    textareaSection: {
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical: 0,
        backgroundColor: '#fff',
        borderRadius:10,
        marginTop: 5,
        height: 100,
    },
    inputIcon: {
        padding: 10,
    },
    gradient:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 25
    },
    input:{
        ...FONTS.body3
    },
    button: {
        marginTop: 40,
        height: 50,
    },
    title: {
        ...FONTS.h1,
        textAlign: 'center',
        marginTop: 70
    },
    text: {
        ...FONTS.body2,
        color: 'white'
    },
    label: {
        ...FONTS.body3,
        marginTop: 20
    }
})