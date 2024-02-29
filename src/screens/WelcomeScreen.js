import { useState, useEffect, useRef } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Platform,Button } from "react-native";
import COLORS from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const WelcomeScreen = () => {
    /* Code for push notifications*/
    const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    await schedulePushNotification();
    // AsyncStorage.clear();
    // navigation.navigate("Login");
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      // console.log("USER TOKEN IS: ", userToken);
      // console.log("USER DATA IS : ", await AsyncStorage.getItem("user"));
      if (userToken) {
        navigation.navigate("BottomNavigation");
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error checking if user is logged in: ", err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/cricket_icon.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Fanverse</Text>
        <Text style={styles.description}>
          Unleash your fantasy sports journey on this platform.
        </Text>
        <Text style={styles.description}>
          Click on Get Started to Play and Enjoy!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>GET STARTED</Text>
          <AntDesign name="rightcircle" size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Fanverse",
      body: 'Welcome you to the world of Fanverse',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'ed3a5384-321c-49c3-a6e0-adcec0abb687' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: COLORS.primary,
    borderRadius: 100,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.light,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.light,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginRight: 10,
  },
});

export default WelcomeScreen;
