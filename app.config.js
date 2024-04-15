module.exports = {
    name: 'IraqPad',
    scheme: "IraqPad",
    version: '1.0.0',
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      "eas": {
        "projectId": "8eaf19d3-673f-4cdc-b931-d612f4f2db5b"
      }
    },
    "android": {
      "package": "local.iraqpad",
    }
};