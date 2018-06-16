import React from "react";
import { Image } from "react-native";
import gravatar from "gravatar-api";

import styles from "./styles";
import avatarImage from "../../images/avatar-placeholder.png";

const Avatar = props => {
  const gravatarOptions = {
    email: props.email,
    parameters: { size: 200 }
  };

  const uri = gravatar.imageUrl(gravatarOptions);
  return null;
};

Avatar.propTypes = {
  // email: React.PropTypes.string
};

export default Avatar;
