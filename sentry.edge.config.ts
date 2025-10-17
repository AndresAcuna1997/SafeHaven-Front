import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: 'https://60369e4a8377b52268ead4bfa4122948@o4510205858938880.ingest.us.sentry.io/4510205882007552',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // that it will also get attached to your source maps
});
