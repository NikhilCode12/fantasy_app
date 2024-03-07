import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import DeleteIcon from "../components/common/DeleteIcon";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ScrollView,
  Modal,
  ToastAndroid,
  Linking
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "../components/common/Checkbox";
import BackArrow from "../components/common/BackArrow";
import { Ionicons } from "@expo/vector-icons";
import { ColorSpace } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose another icon library if needed

// import { ScrollView } from "react-native-gesture-handler";

export default function HelpandSupportScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber]=useState(1);
const openTelegram = () => {
    const telegramURL = `https://t.me/+57SB9W2TVbJkNDI1`;
    Linking.openURL(telegramURL).catch((err) => console.error('Error opening URL:', err));
  };
  const sendEmail = () => {
    const email = 'fanverse.official12@gmail.com'; // Replace with your email address
    const subject = 'Help me !!'; // Customize the email subject
    const emailURL = `mailto:${email}?subject=${subject}`;
    Linking.openURL(emailURL);
  };
// export default function HelpandSupportScreen({ navigation }) {
  // const [registration, setregistration] = useState(false);
  // const [PlayingTheGame, setPlayingTheGame] = useState(false);
  // const [ScoresAndPoints, setScoresAndPoints] = useState(false);
  // const [contests, setcontests] = useState(false);
  // const [cashPrize, setCashPrize] = useState(false);
  // const [accounBalance, setaccounBalance] = useState(false);
  // const [Verfication, setVerifiaction] = useState(false);
  // const [withdrawls, setWithdrawls] = useState(false);
  // const [payments, setPayments] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help and Support</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:30}}   showsVerticalScrollIndicator={false}>
            <View style={{margin:20}}>
              <Text style={{fontSize:18, color:COLORS.light, fontWeight:"700"}}>
                Most asked Questions
              </Text>
              </View>
              <View style={styles.AllQuestionMain}>
                <TouchableOpacity style={styles.questionContainer} onPress={() => {setNumber(1);setModalVisible(true)}}>
                  <Text style={styles.questionText}>I haven't receive my withdrawl money , what should I do ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.questionContainer} onPress={() => {setNumber(2);setModalVisible(true)}}>
                  <Text style={styles.questionText}>I can't see my added money , what should I do ?</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.questionContainer} onPress={() => {setNumber(3);setModalVisible(true)}}>
                  <Text style={styles.questionText}>I Want to Withdraw , how do I verify ?</Text>
                </TouchableOpacity>
                     <TouchableOpacity style={styles.questionContainer} onPress={() => {setNumber(4);setModalVisible(true)}}>
                  <Text style={styles.questionText}>How do I withdraw my earnings ?</Text>
                </TouchableOpacity>
                     <TouchableOpacity style={styles.questionContainer} onPress={() => {setNumber(5);setModalVisible(true)}}>
                  <Text style={styles.questionText}>How do I unlink Pan Card ?</Text>
                </TouchableOpacity>
              </View>
                <View style={{marginHorizontal:20}}>
                  <View>
                  <Text style={{fontSize:18,fontWeight:"900", color:COLORS.light}}>CONTACT US :</Text>
                  </View>
                    <View style={{flexDirection:"row", gap:25,marginTop:25 ,alignItems:"center"}}>
                      <TouchableOpacity onPress={openTelegram}>
                   <Icon name="telegram" size={40} color="#0088cc" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={sendEmail}>

                   <Ionicons name="mail-sharp" size={40} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                </View>
             <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{padding:10, borderBottomColor:COLORS.silver,borderBottomWidth:1}}>
              <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <Ionicons name ="close-outline" size={35} color={COLORS.dark}/>
              </TouchableOpacity>
              </View>
            <View style={{padding:15}}>
              <Text style={{fontSize:16, fontWeight:"bold"}}>
                {
                    number===1? "I haven't receive my withdrawl money , what should I do ?":number===2?"I can't see my added money , what should I do ?":number===3?"I Want to Withdraw , how do I verify ?":number===4?"How do I withdraw my earnings ?":"How do I unlink Pan Card ?"
                }
               
              </Text>
            </View>
            <View style={{padding:15}}>
              <Text style={{fontSize:14, fontWeight:"400"}}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </View>
            
          </View>
        </View>
      </Modal>
         </ScrollView>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  questionContainer:{
    borderWidth:1,
    borderColor:COLORS.primary,
    paddingVertical:15,
    marginBottom:25,
    paddingHorizontal:10,
    width:300,
    borderRadius:10,
  },
  questionText:{
    fontSize:14,
    color:COLORS.light
  },
    modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal to the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: 300, // Set the height of the modal
    backgroundColor: COLORS.light_grey,
    borderRadius: 10,
  },
  AllQuestionMain:{
    marginHorizontal:14,
    paddingVertical:20,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-around"
  },
            container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea: {
    flex: 1,
    // paddingBottom:5,
    // marginBottom:15
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  colorslight: { color: COLORS.light },
  colorslight_grey: { color: COLORS.light_grey },

  // bottom
  faqsmainContainer: { flexDirection: "column", marginHorizontal: 20 },
  faqBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
  },
  faqTitle: { color: COLORS.light_grey, fontSize: 16 },
  faqQues: { color: COLORS.light, marginTop: 30 },
  faqAns: { color: COLORS.light_grey, marginTop: 5 },
});
