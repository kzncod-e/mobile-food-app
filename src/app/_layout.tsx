/* eslint-disable prettier/prettier */
import * as Sentry from '@sentry/react-native';
import { SplashScreen, Stack } from 'expo-router';
import '../../global.css';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import useAuthStore from '@/store/auth.store';
Sentry.init({
  dsn: 'https://051cadc91d5c29f9d048e66e13bc2ee1@o4508381019832320.ingest.de.sentry.io/4510237337321552',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});
export function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Light': require('../../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);
  if (!fontsLoaded || isLoading) return null;
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </React.Fragment>
  );
}
export default Sentry.wrap(RootLayout);
