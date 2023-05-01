import React, { useContext, useEffect } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../context/authContext/AuthContext";

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Incorrect login", errorMessage, [
      {
        text: "Ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    signIn({ email, password });
    Keyboard.dismiss();
  };
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <View style={loginStyles.buttonContainer}>
            <Logo />
          </View>

          <Text style={loginStyles.title}>Login</Text>
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
            onChangeText={(value) => onChange(value, "email")}
            value={email}
            onSubmitEditing={onLogin}
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
            onChangeText={(value) => onChange(value, "password")}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Boton login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Create new account */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("RegisterScreen")}
            >
              <Text style={loginStyles.buttonText}>New account </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
