import { View, Text, Pressable, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as ImagePicker from "expo-image-picker";

import Context from "../../context/Context";
import PhotoPicker from "../../components/PhotoPicker";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";

import DateTimePicker from "@react-native-community/datetimepicker";

import { isRequired, isPositiveNumber, isPositiveInteger, isValidDate } from "../../utils/validators";
import { postDataToken } from "../../services/services";

const { height, width } = Dimensions.get("window");

const AddTicket = ({ navigation }) => {
  const { token, route } = useContext(Context);
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

    const newTicket = {
      supermarket: form.supermarket,
      ticketDate: form.ticketDate.toISOString(), // THIS IS TO SEND DATE SAFELY
      amountProducts: Number(form.amountProducts),
      totalPrice: Number(form.totalPrice),
    };

    console.log("SENDING NEW TICKET: " + newTicket);

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

    if (isSuccess) {
      console.log("SAVED CORRECTLY");
      navigation.goBack();
    } else {
      alert("Failed :(");
    }

    Keyboard.dismiss();
  };

  const addTicketRequest = async (formData) => {
    console.log("SENDING PETITION CREATE_TICKET_REQUEST");

    //const response = await postDataToken(route + "/recipes/createRecipe", formData, token);

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;
    console.log("STATUS:", status);

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
            <ItemInput label="Date:" placeholder="Select date" value={formatDate(form.ticketDate)} editable={false} error={errors.ticketDate} />
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={form.ticketDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  setForm((prev) => ({
                    ...prev,
                    ticketDate: selectedDate,
                  }));
                }
              }}
            />
          )}

          <ItemInput
            label="Total:"
            placeholder="0.00"
            value={form.totalPrice}
            onChangeText={(text) => setForm((prev) => ({ ...prev, totalPrice: text }))}
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

        <ModalButtons onCancel={() => navigation.goBack()} onSave={onSaved} isFormComplete={isFormComplete} />
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
