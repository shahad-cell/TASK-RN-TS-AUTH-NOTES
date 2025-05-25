import React, { useContext } from "react";
import { Button } from "react-native";
import { Stack } from "expo-router";
import AuthContext from "@/context/AuthContext";
import { deleteToken } from "@/api/storage";

export default function HomeLayout() {
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Button
            title="Logout"
            onPress={async () => {
              await deleteToken();
              setIsAuthenticated(false);
            }}
            color="red"
          />
        ),
      }}
    />
  );
}
