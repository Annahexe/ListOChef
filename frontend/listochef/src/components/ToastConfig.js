import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

/**
 * Custom toast configuration used by react-native-toast-message.
 * Defines the visual style for success, error and info toast types.
 */
const toastConfig = {
  /**
   * Success toast style used for completed actions.
   *
   * @param {Object} props - Toast props provided by react-native-toast-message.
   * @returns {JSX.Element} Styled success toast.
   */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 12,
        borderWidth: 1.7,
        borderColor: "#2C5818",
        borderLeftColor: "#2C5818",
        backgroundColor: "rgba(236, 253, 228, 0.85)",
        width: "90%",
        alignSelf: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontFamily: "MontserratSemiBold",
        color: "#2C5818",
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: "#2C5818",
      }}
    />
  ),

  /**
   * Error toast style used for failed actions or validation issues.
   *
   * @param {Object} props - Toast props provided by react-native-toast-message.
   * @returns {JSX.Element} Styled error toast.
   */
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 12,
        borderWidth: 1.7,
        borderColor: "#D9534F",
        borderLeftColor: "#D9534F",
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontFamily: "MontserratSemiBold",
        color: "#D9534F",
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: "#D9534F",
      }}
    />
  ),

  /**
   * Info toast style used for neutral application feedback.
   *
   * @param {Object} props - Toast props provided by react-native-toast-message.
   * @returns {JSX.Element} Styled info toast.
   */
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 12,
        borderWidth: 1.7,
        borderColor: "#2C5818",
        borderLeftColor: "#2C5818",
        backgroundColor: "rgba(236, 253, 228, 0.85)",
        width: "90%",
        alignSelf: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontFamily: "MontserratSemiBold",
        color: "#2C5818",
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: "#2C5818",
      }}
    />
  ),
};

export default toastConfig;