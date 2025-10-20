/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@/components/Button';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Button title="Sign Up" onPress={() => router.push('/sign-in')} />
    </View>
  );
};

export default SignUp;
