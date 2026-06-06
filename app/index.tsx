import { UserContext } from "@/context/UserContext";
import colors from "@/services/colors";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();

  const { user, setUser } = useContext(UserContext);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("[Index] Starting auth check...");
        console.log("[Index] isAuthenticated:", isAuthenticated);

        //  User authenticated according to Logto
        if (isAuthenticated) {

          const userData = await getIdTokenClaims();

          console.log("[Index] User claims:", userData);

          //  Invalid or stale session
          if (!userData || !userData.email) {

            console.log("[Index] Invalid session detected");

            // Clear ghost user
            setUser(null);

            return;
          }

          // Check if user exists in Strapi
          const result = await GlobalApi.GetUserByEmail(userData.email);

          console.log("[Index] User lookup result:", result?.data);

          //  User does not exist
          if (
            !result?.data?.data ||
            result.data.data.length === 0
          ) {

            console.log("[Index] Creating new user...");

            const newUserData = {
              email: userData.email,
              name: userData.name,
              picture: userData.picture,
            };

            const response = await GlobalApi.CreateNewUser(newUserData);

            setUser(response.data.data);

            console.log(
              "[Index] New user created:",
              response.data.data
            );

          } else {

            //  Existing user
            setUser(result.data.data[0]);

            console.log(
              "[Index] Existing user loaded:",
              result.data.data[0]
            );
          }

        } else {

          //  User NOT authenticated
          console.log("[Index] No authenticated user");

          // Clear stale user context
          setUser(null);
        }

      } catch (error) {

        console.error("[Index] Auth error:", error);

        // Clear user on auth failure
        setUser(null);

      } finally {

        console.log("[Index] Auth check completed");

        setAuthChecked(true);
      }
    };

    checkAuth();

  }, [isAuthenticated]);

  //  Loading screen while auth check runs
  if (!authChecked) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.WHITE,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.PRIMARY}
        />
      </View>
    );
  }

  //  ONLY redirect if REAL valid user exists
  const isValidUser = !!user;

  if (isValidUser) {

    console.log(
      "[Index] Valid user found, redirecting to tabs"
    );

    return <Redirect href="/Home" />;
  }

  console.log(
    "[Index] No valid user found, redirecting to Landing"
  );

  return <Redirect href="/landing" />;
}