import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useContext } from 'react'
import { SessionContext } from '@/context/SessionContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const login = () => {
  const sessionContext = useContext(SessionContext);
  const insets = useSafeAreaInsets()
  return (
    <View style={{paddingTop: insets.top + 10}}>
      <KeyboardAvoidingView>
        
      </KeyboardAvoidingView>
    </View>
  )
}

export default login