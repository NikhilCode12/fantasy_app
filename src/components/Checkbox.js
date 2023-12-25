import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Checkbox({ checked, onChange }) {
  return (
    <TouchableOpacity onPress={onChange}>
      <Icon
        name={checked ? "check-square" : "square"}
        size={24}
        color={checked ? "green" : "lightgrey"}
      />
    </TouchableOpacity>
  );
}
