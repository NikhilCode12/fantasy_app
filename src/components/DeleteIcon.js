import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const DeleteIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        size={26}
        style={{ alignSelf: "flex-end" }}
      />
    </TouchableOpacity>
  );
};

export default DeleteIcon;
