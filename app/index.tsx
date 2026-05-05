import { UserContext } from "@/context/UserContext";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(async(userData) => {
       console.log("--", userData)
       if(userData?.email){
        // Call your API to check if the user exists in database
        // If the user does not exist, create a new user entry in database
        const result =await GlobalApi.GetUserByEmail(userData?.email);
        if(!result.data.data)
          {
        //insert new record
        const data={
          email:userData?.email,
          name:userData?.name,
          picture:userData?.picture
        }
        const response=await GlobalApi.CreateNewUser(data);
        setUser(response.data.data);
        router.replace('/(tabs)/Home');
       }
       else{
        setUser(result?.data?.data[0]);
          router.replace('/(tabs)/Home');
       }
      }
      });
    }
  }, [isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect href={'../Landing'} />
    </View>
  );
}
