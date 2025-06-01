import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "../../api/auth";
import { storeToken } from "../../api/storage";
import AuthContext from "../../context/AuthContext";
import colors from "../../data/styling/colors";
import { useRouter } from "expo-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate: register, isLoading } = useMutation({
    mutationFn: async () => {
      const userInfo = { email, password };
      const data = await registerAPI(userInfo, image!);
      await storeToken(data.token);
      return data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/(tabs)/home");
    },
    onError: () => {
      Alert.alert("Registration Failed", "Please check your input.");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={styles.title}>Register</Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>

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

          <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
            <Text style={styles.link}>Upload Profile Image</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: 10 }}
            />
          )}

          <TouchableOpacity
            onPress={() => register()}
            disabled={isLoading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/index")}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.bold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    fontSize: 24,
    fontWeight: "bold",
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
