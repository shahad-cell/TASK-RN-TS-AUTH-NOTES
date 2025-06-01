import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "../context/AuthContext";
import { getToken, storeToken } from "../api/storage";


const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true); // wait before rendering

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) setIsAuthenticated(true);
      setCheckingAuth(false);
    };
    checkToken();
  }, []);

  if (checkingAuth) return null; // ✅ Optional: Show loading spinner here

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
        </Stack>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
