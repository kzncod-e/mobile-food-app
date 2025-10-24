/* eslint-disable prettier/prettier */
import { View, Text, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButtom';
import { sides } from 'constant';
import { signIn } from 'lib/appwrite';
import * as Sentry from '@sentry/react-native';
const SignIn = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) return Alert.alert('Error', 'Please Enter valid email address');
    setIsSubmit(true);
    try {
      await signIn({ email, password });
      Alert.alert('Sucess', 'User signed in sucessfully');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your pasword"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign-in" isLoading={isSubmit} onPress={submit} />
      <View className="">
        <Text className="base-regular text-gray-100">Don&apos;t have an account</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
