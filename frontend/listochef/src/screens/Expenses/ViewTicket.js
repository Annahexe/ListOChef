import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import TitleModalScreen from "../../components/TitleModalScreen";
import PrimaryButton from "../../components/PrimaryButton";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const TicketInfoRow = ({ icon, label, value }) => {
  return (
    <View style={styles.infoRow}>
      {icon}

      <View style={styles.infoTextContainer}>
        <Text style={styles.ticketTextLabel}>{label}</Text>
        <Text style={styles.ticketText}>{value}</Text>
      </View>
    </View>
  );
};

const ViewTicket = ({ navigation, route }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={ticket.supermarket} onPress={() => navigation.goBack()} size={30} />

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.labelStyle} numberOfLines={1}>TICKET PHOTO:</Text>

          <View style={styles.imageContainer}>
            <Image style={styles.mainImage} source={{ uri: ticket.ticketPictureUri }} />
          </View>

          <View style={styles.ticketInfoContainer}>
            <TicketInfoRow icon={<MaterialCommunityIcons name="calendar-blank-outline" size={28} color="white" />} label="Date:" value={ticket.ticketDate} />

            <TicketInfoRow icon={<AntDesign name="shopping-cart" size={28} color="white" />} label="Products:" value={`${ticket.amountProducts} products`} />

            <View style={styles.totalRow}>
              <Text style={styles.ticketText}>Total:</Text>
              <Text style={styles.ticketPrice}>{ticket.totalPrice}€</Text>
            </View>
          </View>

          <PrimaryButton onPress={() => navigation.goBack()} buttonText="Close" />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
    paddingVertical: 50,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 2,
    overflow: "hidden",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    flex: 2,
    marginVertical: 15,
    marginBottom: 0,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: "#2C5818",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
    aspectRatio: 0.6,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "#DBE0D9",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#2C5818",
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage: {
    width: "92%",
    height: "95%",
    resizeMode: "cover",
  },
  ticketInfoContainer: {
    backgroundColor: "#A5B19F",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
    paddingLeft: "4%",
    padding: "3%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#0C1F03",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  infoTextContainer: {
    marginLeft: "2%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingVertical: "5%",
  },
  ticketTextLabel: {
    color: "white",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
  },
  ticketText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
  },
  ticketPrice: {
    color: "#2C5818",
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
  },
});

export default ViewTicket;
