import { View, Text, Pressable, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";

import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import Context from "../../context/Context";
import PhotoPicker from "../../components/PhotoPicker";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";

import { isRequired, isPositiveNumber, isPositiveInteger, isValidDate } from "../../utils/validators";
import { postDataToken } from "../../services/services";

const { height } = Dimensions.get("window");

const AddTicket = ({ navigation }) => {
  const { token, route, setTicketsSaved } = useContext(Context);

  const [form, setForm] = useState({
    photo: null,
    supermarket: "",
    ticketDate: new Date(),
    amountProducts: "",
    totalPrice: "",
  });

  const [errors, setErrors] = useState({
    supermarket: "",
    ticketDate: "",
    amountProducts: "",
    totalPrice: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setForm((prev) => ({
        ...prev,
        photo: {
          uri: asset.uri,
          name: asset.fileName || `photo-${Date.now()}.jpg`,
          type: asset.mimeType || "image/jpeg",
        },
      }));
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const onSaved = async () => {
    const isValid = validateForm();

    if (!isValid) {
      alert("Please fill in all fields before saving");
      return;
    }

    setIsLoading(true);

    const newTicket = {
      supermarket: form.supermarket,
      ticketDate: form.ticketDate.toISOString(), // THIS IS TO SEND DATE SAFELY
      amountProducts: Number(form.amountProducts),
      totalPrice: Number(form.totalPrice),
    };

    console.log("SENDING NEW TICKET: ", newTicket);

    const formData = new FormData();
    formData.append("ticket", JSON.stringify(newTicket));

    if (form.photo) {
      formData.append("photo", {
        uri: form.photo.uri,
        name: form.photo.name,
        type: form.photo.type,
      });
    }

    const isSuccess = await addTicketRequest(formData);

    setIsLoading(false);
    if (isSuccess) {
      navigation.goBack();
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Ticket created!",
          text2: "Your ticket was saved correctly.",
        });
      }, 400);
    } else {
      Toast.show({
        type: "error",
        text1: "Ticket creation failed.",
        text2: "Please try again later.",
      });
    }

    Keyboard.dismiss();
  };

  const addTicketRequest = async (formData) => {
    const response = await postDataToken(route + "/createTicket", formData, token);

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status, jsonResponse] = response;

    if (status === 200 || status === 201) {
      setTicketsSaved((prev) => [
        ...prev,
        {
          ...jsonResponse,
          ticketDate: new Date(jsonResponse.ticketDate),
        },
      ]);
    }
    return status === 200 || status === 201;
  };

  const isFormComplete = Object.values(form).every((value) => value);

  const validateForm = () => {
    const newErrors = {
      supermarket: isRequired(form.supermarket),
      ticketDate: isValidDate(form.ticketDate),
      amountProducts: isRequired(form.amountProducts) || isPositiveInteger(form.amountProducts),
      totalPrice: isRequired(form.totalPrice) || isPositiveNumber(form.totalPrice),
    };

    setErrors(newErrors);

    return !newErrors.supermarket && !newErrors.ticketDate && !newErrors.amountProducts && !newErrors.totalPrice;
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={"New Ticket"} onPress={() => navigation.goBack()} />

        <KeyboardAwareScrollView
          style={styles.scrollContainer}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={60}
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.labelStyle}>TICKET PHOTO:</Text>
          <PhotoPicker photo={form.photo?.uri} choosePhoto={choosePhoto} />

          <ItemInput
            label="Supermarket:"
            placeholder="Ex: Mercadona, Consum..."
            value={form.supermarket}
            onChangeText={(text) => setForm((prev) => ({ ...prev, supermarket: text }))}
            keyboardType="default"
            error={errors.supermarket}
          />

          <Pressable onPress={() => setShowDatePicker(true)}>
            <View pointerEvents="none">
              <ItemInput
                label="Date:"
                placeholder="Select date"
                value={formatDate(form.ticketDate)}
                editable={false}
                error={errors.ticketDate}
                pointerEvents="none"
              />
            </View>
          </Pressable>

          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={form.ticketDate}
            display={Platform.OS === "ios" ? "inline" : "default"}
            onConfirm={(date) => {
              setShowDatePicker(false);
              setForm((prev) => ({ ...prev, ticketDate: date }));
            }}
            onCancel={() => setShowDatePicker(false)}
          />

          <ItemInput
            label="Total:"
            placeholder="0.00"
            value={form.totalPrice}
            onChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                totalPrice: text.replace(",", "."),
              }))
            }
            keyboardType="numeric"
            error={errors.totalPrice}
          />

          <ItemInput
            label="Number of products:"
            placeholder="0"
            value={form.amountProducts}
            onChangeText={(text) => setForm((prev) => ({ ...prev, amountProducts: text }))}
            keyboardType="numeric"
            error={errors.amountProducts}
          />
        </KeyboardAwareScrollView>

        <ModalButtons onCancel={() => navigation.goBack()} onSave={onSaved} isFormComplete={isFormComplete} isLoading={isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: height * 0.87,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
    paddingBottom: 50,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
  },
});

export default AddTicket;
