/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { images } from 'constant';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButtom';

const _Layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
        <View
          className="w-full relative"
          style={{ height: Dimensions.get('screen').height / 2.25, overflow: 'visible' }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: 150,
              height: 400,
              alignSelf: 'center',
              position: 'absolute',
              bottom: -180,
            }}
          />
        </View>
        <CustomInput />
        <CustomButton />
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  );
};

export default _Layout;
