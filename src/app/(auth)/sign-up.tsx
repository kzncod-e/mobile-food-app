/* eslint-disable prettier/prettier */
import { View, Text, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButtom';
import { createUser } from 'lib/appwrite';

const SignUp = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password)
      return Alert.alert('Error', 'Please Enter valid email address');
    setIsSubmit(true);
    try {
      await createUser({ email, password, name });
    
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="name"
      />
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
        <Text className="base-regular text-gray-100">Already have an Acoount ?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
