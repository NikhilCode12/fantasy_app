import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackArrow = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={26}
        color="white"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </TouchableOpacity>
  );
};

export default BackArrow;
