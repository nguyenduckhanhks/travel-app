import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {COLOR, COLORS} from '../constants/theme'

export default function CusStatusBar(){
    return(
        <StatusBar barStyle="dark-content"></StatusBar>
    )
}