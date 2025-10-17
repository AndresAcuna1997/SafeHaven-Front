import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: 'https://60369e4a8377b52268ead4bfa4122948@o4510205858938880.ingest.us.sentry.io/4510205882007552',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
