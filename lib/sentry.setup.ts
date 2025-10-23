/* eslint-disable prettier/prettier */
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://051cadc91d5c29f9d048e66e13bc2ee1@o4508381019832320.ingest.de.sentry.io/4510237337321552',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
