import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, TextInput, Keyboard, Alert } from 'react-native'
import { loginStyles } from '../theme/loginTheme';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext/AuthContext';


interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({navigation}: Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
      if(errorMessage.length === 0) return;
  
      Alert.alert('Incorrect register',errorMessage,[{
        text: 'Ok',
        onPress: removeError
        }]);
    }, [errorMessage])
  
    
    const onRegister = () => {
        signUp({name,email,password});
        Keyboard.dismiss();
      }
    return (
        <>
          {/* backgorund */}
          <Background />
          <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === 'ios' ? 'padding': 'height'}
          >
            <View style={loginStyles.formContainer}>
              <View style={loginStyles.buttonContainer}>
                <Logo />
              </View>
    
              <Text style={loginStyles.title}>Register</Text>
              <Text style={loginStyles.label}>Name:</Text>
              <TextInput
                placeholder="name"
                placeholderTextColor="rgba(255,255,255,0.9)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                style={[
                  loginStyles.inputField,
                  Platform.OS === "ios" && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                onChangeText={(value) => onChange(value,'name')}
                value={name}
                onSubmitEditing={onRegister}
    
                autoCapitalize="words"
                autoCorrect={false}
              />
              <Text style={loginStyles.label}>Email:</Text>
              <TextInput
                placeholder="user@gmail.com"
                placeholderTextColor="rgba(255,255,255,0.9)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                style={[
                  loginStyles.inputField,
                  Platform.OS === "ios" && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                onChangeText={(value) => onChange(value,'email')}
                value={email}
                onSubmitEditing={onRegister}
    
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={loginStyles.label}>Password:</Text>
              <TextInput
                placeholder="*****"
                placeholderTextColor="rgba(255,255,255,0.9)"
                underlineColorAndroid="white"
                secureTextEntry
                style={[
                  loginStyles.inputField,
                  Platform.OS === "ios" && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                onChangeText={(value) => onChange(value,'password')}
                value={password}
                onSubmitEditing={onRegister}
    
                autoCapitalize="none"
                autoCorrect={false}
              />
    
              {/* Boton login */}
              <View style={loginStyles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.8}
                 style={loginStyles.button}
                  onPress={ onRegister }>
                  <Text style={loginStyles.buttonText}>Create an account</Text>
                </TouchableOpacity>
              </View>
    
              {/* Create new account */}
              <TouchableOpacity
                onPress={() => navigation.replace('LoginScreen')}
                activeOpacity={0.8}
                style={loginStyles.buttonReturn}
              >
                <Text style={loginStyles.buttonText}>Login</Text>
              </TouchableOpacity>
    
              {/* jeyboard avoid view */}
            </View>
          </KeyboardAvoidingView>
        </>
      );
}
