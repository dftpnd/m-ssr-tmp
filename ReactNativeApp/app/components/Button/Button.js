import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const Button = props => {
  const { text, onPress } = props;
  return null;
};

// Button.propTypes = {
//   text: React.PropTypes.string,
//   onPress: React.PropTypes.func
// };

Button.defaultProps = {
  text: "Button Text",
  // eslint-disable-next-line no-console
  onPress: () => console.log("Button Pressed")
};

export default Button;
