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

import { Redirect, Slot } from 'expo-router';
import { images } from 'constant';
import useAuthStore from '@/store/auth.store';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore(); // Replace with your authentication logic
  if (!isAuthenticated) return <Redirect href="/sign-in" />;
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
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
