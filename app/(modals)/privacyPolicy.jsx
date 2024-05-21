
import React from 'react'
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
export default function privacyPolicy() {
  return (
    <>
    <WebView source={{ uri: 'https://iraqpad.com/privacypolicy' }} style={{ flex: 1,marginTop:20 }} />
    </>
  )
}