import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/AccountScreen.style.js";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [usernameVerified, setusernameVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const [data, setData] = useState({
    username: "dummy",
    contestsWon: 0,
    totalContests: 0,
    matches: [],
    series: 0,
    email: "",
    mobile: "",
  });
  /*These states aare only used for modals  */
  const [username, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  function handleEmail(text) {
    setEmail(text);
  }
  function handleUserName(text) {
    setUserName(text);
  }
  function handleMobile(text) {
    setMobile(text);
  }
  function handleDob(text) {
    setDob(text);
  }
  function handleGender(text) {
    setGender(text);
  }
  function handleCountry(text) {
    setCountry(text);
  }
  function handleState(text) {
    setState(text);
  }
  async function updateEmail() {
    if (isValidEmailAddress(email) == false) {
      ToastAndroid.show("Enter a Valid Email", ToastAndroid.SHORT);
      setEmail("");
      return;
    }
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        { email: email, emailVerified: true }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
      // setData(parsedUser);
      console.log("NEW DATA IS : ", userData.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateMobile() {
    if (isValidMobileNumber(mobile) == false) {
      ToastAndroid.show("Enter a Valid Mobile Number", ToastAndroid.SHORT);
      setMobile("");
      return;
    }
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        { mobile: mobile, mobileVerified: true }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
      // console.log("NEW DATA IS : ",userData.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateUserName() {
    // console.log(username);
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        { username: username, usernameVerified: true }
      );
      setData(userData.data);
      AsyncStorage.setItem("user", JSON.stringify(userData.data));
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
      // console.log("NEW DATA IS : ",userData.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateDob() {
    // console.log(username);
    if (validateDobFormat(dob) == false) {
      ToastAndroid.show("Enter DOB in Format DD/MM/YYYY", ToastAndroid.SHORT);
      setDob("");
      return;
    }

    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        {
          basicInfo: {
            dob: dob,
            country: data.basicInfo.country,
            state: data.basicInfo.state,
            gender: data.basicInfo.gender,
          },
        }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
      // console.log("NEW DATA IS : ",userData.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateCountry() {
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        {
          basicInfo: {
            dob: data.basicInfo.dob,
            country: country,
            state: data.basicInfo.state,
            gender: data.basicInfo.gender,
          },
        }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateState() {
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        {
          basicInfo: {
            dob: data.basicInfo.dob,
            country: data.basicInfo.country,
            state: state,
            gender: data.basicInfo.gender,
          },
        }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateGender() {
    try {
      const userData = await axios.put(
        `https://fanverse-backend.onrender.com/api/user/${data._id}`,
        {
          basicInfo: {
            dob: data.basicInfo.dob,
            country: data.basicInfo.country,
            state: data.basicInfo.state,
            gender: gender,
          },
        }
      );
      setData(userData.data);
      ToastAndroid.show("SuccessFully Updated", ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  }
  /*---------------- */
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      return token != null ? JSON.parse(token) : null;
    } catch (e) {
      console.log(e);
    }
  };

  function isValidMobileNumber(number) {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(number);
  }
  function isValidEmailAddress(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  const validateDobFormat = (dob) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    const isValidFormat = regex.test(dob);
    // setIsValid(isValidFormat);
    return isValidFormat;
  };
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const userr = await AsyncStorage.getItem("user");
  //       const parsedUser = JSON.parse(userr);

  //       setData(parsedUser);
  //       // if (parsedUser && parsedUser.msg === "User Already Registered") {
  //       //   setData((prevUser) => ({ ...prevUser, ...prevUser.existingUser }));
  //       // } else {
  //       //   setData((prevUser) => ({ ...prevUser, ...prevUser.newUser }));
  //       // }
  //       console.log(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getUser();
  //   console.log("Account Screen Loaded!");
  // }, []);
  useEffect(() => {
    if (data.mobileVerified) setMobileVerified(true);
    if (data.usernameVerified) setusernameVerified(true);
    if (data.emailVerified) setEmailVerified(true);
    if (emailVerified && mobileVerified && usernameVerified) {
      setIsVerified(true);
    }
  }, [data]);
  useEffect(() => {
    getToken().then(async (token) => {
      try {
        const userData = await axios.get(
          "https://fanverse-backend.onrender.com/api/user/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userData) {
          setData(userData.data);
          AsyncStorage.setItem("user", JSON.stringify(userData.data));
          // console.log(data);
        }
      } catch (error) {
        console.log("Error in getting user data: ", error);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[styles.headerContainer, { justifyContent: "space-between" }]}
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={[
            styles.backArrow,
            {
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              paddingHorizontal: 10,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 14,
              color: COLORS.light_grey,
              fontWeight: "bold",
            }}
          >
            Edit
          </Text>
          <Ionicons name="ios-create" size={16} color={COLORS.silver} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* personal INfo */}
        <View style={styles.personalInfoTop}>
          <View style={styles.imageContainer}>
            <Text
              style={{
                fontSize: 35,
                color: COLORS.light,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {data.username[0]}
            </Text>
          </View>
          <View style={styles.top_profile_left}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.colorslight}>{data.username}</Text>
            </View>
            <Text style={styles.colorslight_grey}>{data.email}</Text>
            <View style={styles.verfied_container}>
              <Ionicons
                name={isVerified ? "shield-checkmark" : "warning"}
                size={14}
                color={isVerified ? "lime" : "#ad7736"}
              />
              <Text
                style={[
                  styles.colorslight_grey,
                  { marginLeft: 6, fontSize: 12 },
                ]}
              >
                {isVerified ? "Verified" : "Not Verified"}
              </Text>
            </View>
          </View>
        </View>
        {/* Finacial history -- all transactions */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyTransactions");
          }}
        >
          <View style={styles.financialHistoryContainer}>
            <Text style={styles.financialHistoryText}>Financial History</Text>
          </View>
        </TouchableOpacity>
        {/*player contest records  */}
        <View style={styles.playingExperienceContainer}>
          <View style={{}}>
            <Text style={styles.playingExperienceText}>Playing Experience</Text>
          </View>
          <View style={styles.contestRecordContainer}>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.contestsWon}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Contest Won</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.totalContests}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>
                Total Contests
              </Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.matches ? data.matches.length : "0"}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Matches</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>{data.series}</Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Series</Text>
            </View>
          </View>
        </View>
        {/* Primary Info */}
        <View style={styles.primaryInfoContainer}>
          <View>
            <Text
              style={[
                styles.colorslight_grey,
                { marginLeft: 4, marginBottom: 4 },
              ]}
            >
              Primary Info
            </Text>
          </View>
          <View style={styles.primaryInfoBox}>
            <View style={styles.primaryInfoBoxRow}>
              <View style={{ flexDirection: "column", gap: 1 }}>
                <Text style={styles.colorslight}>Mobile No.</Text>
                <Text style={styles.primaryItem}>+91 {data.mobile}</Text>
              </View>
              {/* <View>
                <Text style={styles.ChangeText}>CHANGE</Text>
              </View> */}
            </View>
            <View style={styles.primaryInfoBoxRow}>
              <View style={{ flexDirection: "column", gap: 1 }}>
                <Text style={styles.colorslight}>Email Id</Text>
                <Text style={styles.primaryItem}>{data.email}</Text>
              </View>
              {/* <View>
                <Text style={styles.ChangeText}>CHANGE</Text>
              </View> */}
            </View>
          </View>
        </View>
        {/* Basic Info */}
        <View style={styles.basicInfoContainer}>
          <View>
            <Text style={[styles.colorslight_grey, { marginLeft: 4 }]}>
              Basic Info
            </Text>
          </View>
          <View style={styles.basicInfoBox}>
            <View style={styles.basicInfoRow1}>
              <View style={{ width: "35%" }}>
                <Text style={[styles.colorslight_grey]}>Date of birth</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {data.basicInfo ? data.basicInfo.dob : "unknown"}
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>Gender</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {data.basicInfo ? data.basicInfo.gender : "unknown"}
                </Text>
              </View>
            </View>
            <View style={styles.basicInfoRow2}>
              <View style={{ width: "35%" }}>
                <Text style={[styles.colorslight_grey]}>Country</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {data.basicInfo ? data.basicInfo.country : "unknown"}
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>State</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {data.basicInfo ? data.basicInfo.state : "unknown"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bgLightBlack,
              paddingHorizontal: 24,
              paddingVertical: 24,
            }}
          >
            <TouchableOpacity
              style={[
                styles.backArrow,
                {
                  width: 40,
                  height: 40,
                  position: "absolute",
                  top: 24,
                  right: 24,
                },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  color: COLORS.light_grey,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                Update your Profile
              </Text>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update username{" "}
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 12,
                  }}
                >
                  (only once)
                </Text>
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleUserName}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                editable={usernameVerified ? false : true}
                placeholder={data.username}
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                {usernameVerified ? (
                  <Button title="Verified" color={"gray"} />
                ) : (
                  <Button title="Verify" onPress={updateUserName} />
                )}
              </View>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update Email
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleEmail}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                editable={emailVerified ? false : true}
                placeholder={data.email}
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                {emailVerified ? (
                  <Button title="Verified" color={"gray"} />
                ) : (
                  <Button title="Verify" onPress={updateEmail} />
                )}
              </View>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update Mobile No.
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleMobile}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                editable={mobileVerified ? false : true}
                placeholder={data.mobile}
              />
              <View style={{ width: "100%", marginTop: 10 }}>
                {mobileVerified ? (
                  <Button title="Verified" color={"gray"} />
                ) : (
                  <Button title="Verify" onPress={updateMobile} />
                )}
              </View>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update DOB{" "}
                <Text style={{ color: COLORS.primary, fontSize: 12 }}>
                  (eg. 01/01/2002)
                </Text>
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleDob}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                placeholder="dd/mm/yyyy"
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                <Button title="Update DOB" onPress={updateDob} />
              </View>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update Country
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleCountry}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                placeholder="Your Country"
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                <Button title="UPDATE Country" onPress={updateCountry} />
              </View>
            </View>
            <View style={{ marginTop: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update State
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleState}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                placeholder="Your State"
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                <Button title="UPDATE STATE" onPress={updateState} />
              </View>
            </View>
            <View style={{ marginVertical: 36 }}>
              <Text style={{ color: COLORS.light_grey, fontSize: 14 }}>
                Update Gender
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleGender}
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: COLORS.lightGray,
                  color: COLORS.light,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
                placeholder="Male"
              />
              <View style={{ width: "100%", marginTop: 12 }}>
                <Button title="UPDATE GENDER" onPress={updateGender} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}
