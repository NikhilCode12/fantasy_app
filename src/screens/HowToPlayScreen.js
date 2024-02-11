import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import DeleteIcon from "../components/common/DeleteIcon.js";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";
export default function HowToPlayScreen({navigation}) {
  return (
   <SafeAreaView style={styles.container}>

         <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrow}  onPress={() => {
              navigation.goBack();
            }}>
          <Ionicons
            name="arrow-back"
            size={24}
           
            color={COLORS.primary}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>How To Play</Text>
      </View>
               <ScrollView contentContainerStyle={{paddingBottom:30}}   showsVerticalScrollIndicator={false}>

      
            <View style={{flexDirection:"column", marginHorizontal:25, marginVertical:10}}>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                              How do I play on Fanverse?

                        </Text>
                       <Text  style={styles.Ans}>
                     Follow these simple steps to play on Fanverse:{'\n'}
a. Register / Login to Fanverse{'\n'}
b. Select the match you want to join and then click on the ‘Create New Team’ button for creating your team{'\n'}
c. Create your team of 11 players (including a Captain & Vice-captain) within an allocated virtual budget of 100 credit points from a pool of players applicable for the match{'\n'}
d. Join free or cash contests of your choice. Cash contests let you win cash and require an entry fee, for which we provide multiple payment methods such as Credit Cards, Debit Cards, Net banking and different wallet services.{'\n'}
e. After the beginning of the match your team is awarded points basis the on-field performance of your selected players. Final points, ranks and winners are declared after the end of the match.{'\n'}

                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                              When does a Fantasy Game start on Fanverse?

                        </Text>
                       <Text  style={styles.Ans}>
Any fantasy game on Fanverse starts as soon as the deadline for the match ends. The deadline (denoted by the countdown ticker) is usually the start time of the match. In an exceptional scenario, if the deadline is extended beyond the start time of the match, users will be appropriately notified.
                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                              What is Fanverse Referal Code?
                        </Text>
                       <Text  style={styles.Ans}>
                      Any fantasy game on Fanverse starts as soon as the deadline for the match ends. The deadline (denoted by the countdown ticker) is usually the start time of the match. In an exceptional scenario, if the deadline is extended beyond the start time of the match, users will be appropriately notified.

                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                              How do I select my Fantasy Team?

                        </Text>
                       <Text  style={styles.Ans}>
                  After logging into your Fanverse account, click on the ‘Create Team’ button for the match you want to join. Create your team of 11 players (including a Captain & Vice-captain) in fantasy cricket, football & kabaddi, from the applicable pool of players for the match within the given virtual budget of 100 credit points.


                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                             Can I change my team for future rounds?

                        </Text>
                       <Text  style={styles.Ans}>
               Yes, you are required to create new team(s) for every match on Fanverse.


                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                    How many players are needed to create a team?

                        </Text>
                       <Text  style={styles.Ans}>
          To create a team, the user requires 11 players in cricket wherein there must be at least 3 bowlers, 3 batsmen, 1 all-rounder & 1 wicket-keeper. Similarly, 11 players in football where there should be at least 3 defenders, 3 mid-fielders, 1 striker & 1 goal-keeper while the other 3 players can be from any category in Fantasy Cricket and any category except goal-keeper in Fantasy Football. Similarly, in Kabaddi, your fantasy team needs to have at least 1 Raider and All Rounder and at least 2 Defenders. The other players can be from any category.


                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                          Can I choose players from one side only?


                        </Text>
                       <Text  style={styles.Ans}>
         No! A maximum of 7 players can be selected from each side, the remaining need to be from the other side
                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
                          I've spent my entire budget before selecting all the players of my fantasy team. How do I complete my team?



                        </Text>
                       <Text  style={styles.Ans}>
         Fanverse allows the users to create their team within a virtual budget of 100 credit points only. Thus, the user must use the provided credits efficiently for selecting all the players of the team within the given budget of 100 credit points only.

                        </Text>
                </View>
                <View style={styles.boxx}>
                    <Text style={styles.Ques}>
What is the use of a Captain & Vice-Captain in a team?



                        </Text>
                       <Text  style={styles.Ans}>
         The Captain / Vice Captain of a team can help the user in earning extra points. The player chosen as the Captain of the user's team is awarded 2 times the original points whereas the Vice-captain of the team is awarded 1.5 times the original points according to their on-field performance.

                        </Text>
                </View>
            </View>
            </ScrollView>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea:{
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
  colorslight:{color:COLORS.light},
  colorslight_grey:{color:COLORS.light_grey},
   Ques:{color:COLORS.light , marginTop:10},
  Ans:{color:COLORS.light_grey , marginTop:5},
  boxx:{ backgroundColor:COLORS.bgLightBlack, paddingVertical:5, paddingHorizontal:14, borderRadius:10,marginTop:12},
})
