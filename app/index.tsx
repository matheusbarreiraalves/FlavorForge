import { UserContext } from "@/context/UserContext";
import colors from "@/services/colors";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { setUser } = useContext(UserContext);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          const userData = await getIdTokenClaims();
          console.log("[Index] User claims:", userData);

          if (userData?.email) {
            // Check if user exists
            const result = await GlobalApi.GetUserByEmail(userData.email);

            if (!result.data.data || result.data.data.length === 0) {
              // Create new user
              const newUserData = {
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
              };

              const response = await GlobalApi.CreateNewUser(newUserData);
              setUser(response.data.data);
              console.log("[Index] New user created:", response.data.data);
            } else {
              // User exists
              setUser(result.data.data[0]);
              console.log("[Index] Existing user loaded:", result.data.data[0]);
            }
          }
        }
      } catch (error) {
        console.error('[Index] Auth error:', error);
      } finally {
        setAuthChecked(true); // MUST always run
      }
    };

    checkAuth();
  }, [isAuthenticated, getIdTokenClaims, setUser]);

  // 🔥 Show loading until FULL auth check completes
  if (!authChecked) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.WHITE
      }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  // 🔥 Navigation ONLY after auth check is complete
  if (isAuthenticated) {
    console.log("[Index] User authenticated, redirecting to tabs");
    return <Redirect href="/(tabs)/Home" />;
  }

  console.log("[Index] User not authenticated, redirecting to landing");
  return <Redirect href="/Landing" />;
}