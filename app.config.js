const { width } = require("deprecated-react-native-prop-types/DeprecatedImagePropType");

module.exports = {
  name: 'IraqPad',
  scheme: "iraqpadproject",
  version: '1.0.0',
  icon: "./assets/images/logo.png",
  extra: {
    "clerkPublishableKey": "pk_test_Zm9uZC13b2xmLTM5LmNsZXJrLmFjY291bnRzLmRldiQ",
    "clerkSecretKey": "​sk_test_zfrtbX5riGWMKc8PgK06dIBAl21iHQpaH1dTsnZLA0",
    "eas": {
      "projectId": "8eaf19d3-673f-4cdc-b931-d612f4f2db5b"
    }
  },
  splash: {
    "image": "./assets/images/splashScreen.png",
    "resizeMode" : "cover",
  },
  "android": {
    "package": "com.metalux.iraqpad",

  },
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.metalux.iraqpad"
  },
};