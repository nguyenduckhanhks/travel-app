import React, {useEffect, useState} from 'react';
import { TextInput } from 'react-native';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../DatePicker';
import { RadioButton } from 'react-native-paper';
import { COLORS, icons, FONTS } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Profile = ({navigation, route}) => {
    const [uidLogin, setUidLogin] = useState('')

    const [uid, setUid] = useState('')
    const [photo, setPhoto] = useState('')
    const [birthday, setBirthday] = useState(new Date(Date.now()))
    const [gender, setGender] = useState('male')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const [isEdit, setIsEdit] = useState(false)
    const [type, setType] = useState('account')
    const [statusFriend, setStatusFriend] = useState('none')
    const [idRequest, setIdRequest] = useState('none')
    
    return (
        <LinearGradient
            style={styles.container}
            colors={[COLORS.lightGray, COLORS.lightGray]}
        >
            <Text style={{
                fontSize: 35,
                textAlign: 'center',
                paddingTop: 20,
            }}>{name}</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.lightGray}}>
                <KeyboardAwareScrollView>
                    <View>
                        <DatePicker 
                            model={birthday} 
                            setDate={setBirthday} 
                            label='Ngày sinh:' 
                            disabled={!isEdit}
                        />
                    </View>

                    <View style={styles.nomalField}>
                        <Text style={styles.title}> Giới tính:</Text>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 10,
                            backgroundColor: COLORS.white
                        }}>
                            <RadioButton 
                                value="male"
                                status={ gender === 'male' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('male')}
                                color="#f20045"
                                disabled={!isEdit}
                            /><Text style={{marginRight: 30}}>Nam</Text>
                            <RadioButton 
                                value="female"
                                status={ gender === 'female' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('female')}
                                color="#f20045"
                                disabled={!isEdit}
                            /><Text>Nữ</Text>
                        </View>
                    </View>

                    <View style={styles.nomalField}>
                        <Text style={styles.title}> Số điện thoại:</Text>
                        <View style={styles.backgroundInput}>
                            <TextInput 
                                placeholder='Số điện thoại'
                                placeholderTextColor={COLORS.darkgray}
                                style={{
                                    fontSize: 16,
                                }}
                                value={tel}
                                onChangeText={setTel}
                                editable={isEdit}
                            />
                        </View>
                    </View>

                    <View style={styles.nomalField}>
                        <Text style={styles.title}> Email:</Text>
                        <View style={styles.backgroundInput}>
                            <TextInput 
                                placeholder='Email'
                                placeholderTextColor={COLORS.darkgray}
                                style={{
                                    fontSize: 16,
                                }}
                                value={email}
                                onChangeText={setEmail}
                                editable={isEdit}
                            />
                        </View>
                    </View>

                    <View style={styles.nomalField}>
                        <Text style={styles.title}> Địa chỉ:</Text>
                        <View style={styles.backgroundInput}>
                            <TextInput 
                                placeholder='Địa chỉ'
                                placeholderTextColor={COLORS.darkgray}
                                style={{
                                    fontSize: 16,
                                    color: COLORS.darkgray
                                }}
                                value={address}
                                onChangeText={setAddress}
                                editable={isEdit}
                            />
                        </View>
                    </View>

                    {
                        !isEdit &&
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => {
                                setIsEdit(true)
                            }}
                        >
                            <LinearGradient colors={[COLORS.primary, COLORS.primary, COLORS.primary]} style={styles.gradient}>
                                <Text style={styles.text}>
                                        Chỉnh sửa</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }

                    <View style={{flexDirection: 'row'}}>
                    {
                        isEdit &&
                        <TouchableOpacity 
                            style={[styles.button1, {marginLeft: '10%'}]} 
                            onPress={() => updateProfile()}
                        >
                            <LinearGradient colors={[COLORS.primary, COLORS.primary, COLORS.primary]} style={styles.gradient}>
                                <Text style={styles.text}>
                                        Lưu</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }

                    {
                        isEdit &&
                        <TouchableOpacity 
                            style={[styles.button1, {marginLeft: '10%'}]} 
                            onPress={() => {
                                setIsEdit(false)
                            }}
                        >
                            <LinearGradient colors={[COLORS.darkgray, COLORS.darkgray]} style={styles.gradient}>
                                <Text style={styles.text}>
                                        Hủy</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                    </View>
                    {
                        !isEdit && type === 'myProfile' &&
                        <View style={{...FONTS.body4, marginTop: 10, alignItems: 'center'}}>
                            <Text 
                                style={{fontSize: 17, color: COLORS.primary}}
                                onPress={() => Signout()}
                            >
                                Đăng xuất
                            </Text>
                        </View>
                    }
                </KeyboardAwareScrollView>
            </ScrollView>

        </LinearGradient>
    ) 
}

export default Profile

const styles = StyleSheet.create({
    container:{
        paddingBottom: 20
    },
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    nomalField: {
        marginVertical: 10,
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        borderRadius: 40
    },
    title: {
        fontSize: 18,
    },
    backgroundInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: COLORS.white,
    },
    gradient:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 25
    },
    button: {
        width: '70%',
        marginLeft:'15%',
        marginTop: 40,
        height: 50,
    },
    button1: {
        width: '35%',
        marginTop: 40,
        height: 50,
    },
    text: {
        color: COLORS.white,
        fontSize: 20,
    }
})