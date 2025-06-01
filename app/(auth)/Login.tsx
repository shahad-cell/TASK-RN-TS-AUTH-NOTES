import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import colors from "../../data/styling/colors";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login as loginAPI } from "../../api/auth";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { storeToken } from "../../api/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const {
    mutate: login,
    isLoading,
  }: UseMutationResult<any, Error, { email: string; password: string }> = useMutation({
    mutationFn: async ({ email, password }) => {
      const userInfo = { email, password };
      const data = await loginAPI(userInfo);
      await storeToken(data.token);
      return data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/(tabs)/home");
    },
    onError: () => {
      Alert.alert("Login Failed", "Please check your credentials.");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={styles.title}>Login to your account</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => login({ email, password })}
            disabled={isLoading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/Register")}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.link}>
              Don't have an account? <Text style={styles.bold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: colors.white,
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});
