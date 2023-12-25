import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackArrow = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={20}
        style={{ alignSelf: "flex-start" }}
      />
    </TouchableOpacity>
  );
};

export default BackArrow;
