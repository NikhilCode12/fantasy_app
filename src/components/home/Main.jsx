import { ActivityIndicator, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import styles from "../../styles/main.style";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    showLoader();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  const showLoader = () => {
    setIsLoading(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.matchesContainer}>
        <View>
          {isLoading ? (
            <View style={{ marginVertical: "50%", marginHorizontal: "50%" }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <Text>Main Screen</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
