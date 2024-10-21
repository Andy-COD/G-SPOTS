import {
  View,
  Text,
  KeyboardAvoidingView,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "@/context/SessionContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import auth from "@react-native-firebase/auth";
import Header from "@/components/header/Header";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const login = () => {
  const sessionContext = useContext(SessionContext);
  const theme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState<Location.LocationObject>();
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Location Loading....."
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      var latitude, longitude;
      let location = await Location.getCurrentPositionAsync({});
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
      setLocation(location);

      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of responce) {
        let address = `${item.city}`;
        setDisplayCurrentAddress(address);
      }
      GoogleSignin.configure({
        webClientId:
          "87562483515-2avsmue4j80o96aum8cpaliub186ugnb.apps.googleusercontent.com",
      });
    })();
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
  
      // Get the user's ID token
      const { data } = await GoogleSignin.signIn();
  
      // If token is retrieved, create a Google credential
      if (data?.idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
  
        sessionContext?.setUser(data.user)
        // Sign-in the user with the Google credential
        return await auth().signInWithCredential(googleCredential).then(() => {
          router.push("/(tabs)/Home")
        }).catch((error) => {
          console.log("Error logging in ", error)
        })
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  

  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        backgroundColor:
          theme === "light" ? Colors.light.background : Colors.dark.background,
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <KeyboardAvoidingView>
        <Header centerText="Log in or sign up" />
        <View style={{ gap: 1, paddingTop: 30 }}>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              placeholder="Username, email or mobile number"
              style={{
                borderWidth: 0.5,
                borderRadius: 18,
                backgroundColor:
                  theme === "light" ? Colors.light.tint : Colors.dark.tint,
                padding: 12,
                fontSize: 16,
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              placeholder="Password"
              style={{
                borderWidth: 0.5,
                borderRadius: 18,
                backgroundColor:
                  theme === "light" ? Colors.light.tint : Colors.dark.tint,
                padding: 12,
                fontSize: 16,
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                borderRadius: 18,
                backgroundColor:
                  theme === "light"
                    ? Colors.light.icon
                    : Colors.dark.iconSecondary,
                padding: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color:
                    theme === "light" ? Colors.light.text : Colors.dark.text,
                  fontFamily: "SpaceMono",
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          {/* Seperator */}
          <View style={{ position: "relative", paddingVertical: 20 }}>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor:
                  theme === "light" ? Colors.light.tint : Colors.dark.tint,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                top: 10,
                width: 20,
                height: 20,
                left: "45%",
                right: "auto",
                // borderRadius: 99999,
                backgroundColor:
                  theme === "light"
                    ? Colors.light.background
                    : Colors.dark.background,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color:
                    theme === "light" ? Colors.light.text : Colors.dark.text,
                }}
              >
                or
              </Text>
            </View>
          </View>

          {/* Button group */}
          <View>
            <Pressable
              style={{
                width: "100%",
                gap: 12,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor:
                  theme === "light"
                    ? Colors.dark.background
                    : Colors.light.background,
                borderRadius: 24,
                padding: 12,
              }}
              onPress={() =>
                onGoogleButtonPress()
              }
            >
              <Image
                source={require("@/assets/images/icons/google-symbol.png")}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ fontSize: 14 }}>Continue with Google</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default login;
