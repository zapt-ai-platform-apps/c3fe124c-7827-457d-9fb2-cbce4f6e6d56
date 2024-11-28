# Name my pet

A web app that suggests names for your pet based on its type and characteristics.

## User Journeys

1. [Generate Pet Names](docs/journeys/generate-pet-names.md) - Get personalized name suggestions for your pet.

## External APIs Used

- **ChatGPT API via ZAPT platform**: Used to generate pet name suggestions based on user input.

## Environment Variables

The app uses the following environment variables:

- `VITE_PUBLIC_APP_ID`: The App ID for ZAPT integration.
- `VITE_PUBLIC_APP_ENV`: The environment (e.g., 'development', 'production').
- `VITE_PUBLIC_SENTRY_DSN`: The DSN for Sentry error logging.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: The Website ID for Umami analytics.