import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ExpensesTitleIcon from "../../../assets/icons/expenses_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";
import { useState, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ExpensiveCard from "../../components/ExpensesCard";
import AddCircleButton from "../../components/AddCircleButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Context from "../../context/Context";
import { postDataToken } from "../../services/services";
import Toast from "react-native-toast-message";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { dateBeautify } from "../../utils/dateBeautify";

/**
 * Expenses screen that displays the user's saved tickets with a summary
 * of total spent, number of tickets, and products. Allows filtering by
 * date range, and supports adding, viewing, and deleting tickets.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Expenses screen.
 */
const Expenses = (props) => {
  const { route, token, ticketsSaved, setTicketsSaved } = useContext(Context);
  const tabBarHeight = useBottomTabBarHeight();

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showUntilPicker, setShowUntilPicker] = useState(false);

  /**
   * Normalizes a date to midnight to avoid time-of-day comparison issues.
   * @param {Date|string} date
   * @returns {Date}
   */
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  /**
   * Returns the date from one month ago, normalized to midnight.
   * @returns {Date}
   */
  const getLastMonthDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  /**
   * Formats a date for display in Spanish locale (e.g. "03 may. 2026").
   * Used for Android date pickers.
   * @param {Date|string} date
   * @returns {string}
   */
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // Date range state — defaults to last month until today
  const [fromDate, setFromDate] = useState(getLastMonthDate());
  const [untilDate, setUntilDate] = useState(new Date());

  // Tickets filtered by the selected date range
  const filteredTickets = ticketsSaved.filter((ticket) => {
    const ticketDate = normalizeDate(ticket.ticketDate);

    if (fromDate && ticketDate < fromDate) return false;
    if (untilDate && ticketDate > untilDate) return false;

    return true;
  });
  const activeTickets = filteredTickets;

  /** Navigates to the AddTicket screen. */
  const onAddTicket = () => {
    return props.navigation.navigate("AddTicket");
  };

  /**
   * Navigates to ViewTicket, serializing the date to ISO string for safe passing.
   * @param {Object} ticket
   */ const onViewTicket = (ticket) => {
    const serializedTicket = {
      ...ticket,
      ticketDate: new Date(ticket.ticketDate).toISOString(),
    };
    return props.navigation.navigate("ViewTicket", {
      ticket: serializedTicket,
    });
  };

  /**
   * Shows a confirmation alert before deleting a ticket.
   * Only removes from context if the backend deletion succeeds.
   * @param {Object} item - Ticket to delete.
   */ const onDelete = (item) => {
    Alert.alert("Delete ticket", `Remove ${item.supermarket}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await removeFromExpensesListPetition(item.id);
          if (success) {
            setTicketsSaved((prev) => prev.filter((i) => i.id !== item.id));
          }
        },
      },
    ]);
  };

  /**
   * Sends a DELETE request to the backend for the given ticket.
   * @param {string} ticketId - MongoDB id of the ticket.
   * @returns {Promise<boolean>} True if successful, false otherwise.
   */
  const removeFromExpensesListPetition = async (ticketId) => {
    const data = { ticketId: ticketId };

    const response = await postDataToken(
      route + "/deleteTicket/" + ticketId,
      data,
      token,
    );

    if (!response) {
      Toast.show({
        type: "error",
        text1: "Error removing ticket!",
        text2: "Please try again later.",
      });

      return false;
    }
    return true;
  };

  /** Calculates total price of active (filtered) tickets. */
  const totalPrice = () => {
    return activeTickets.reduce((acc, item) => acc + item.totalPrice, 0);
  };
  const totalMoney = totalPrice().toFixed(2);
  const average =
    activeTickets.length > 0
      ? (totalPrice() / activeTickets.length).toFixed(2)
      : 0;

  /** Calculates total number of products across active tickets. */
  const totalProducts = () => {
    return activeTickets.reduce((acc, item) => acc + item.amountProducts, 0);
  };
  const totalAmountProducts = totalProducts();

  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="Expenses" icon={ExpensesTitleIcon} />

          <View style={styles.featuredTicket}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="coins" size={26} color="white" />
              <Text style={styles.TittleFeatureTicket}>Summary</Text>
            </View>
            <View style={styles.summary}>
              <View style={styles.summaryTextBox}>
                <Text style={styles.summaryText}>Total</Text>
                <Text style={styles.summaryTextBig}>{totalMoney}€</Text>
              </View>
              <View style={styles.summaryTextBox}>
                <Text style={styles.summaryText}>Tickets</Text>
                <Text style={styles.summaryTextBig}>
                  {activeTickets.length}
                </Text>
              </View>
              <View style={styles.summaryTextBox}>
                <Text style={styles.summaryText}>Products</Text>
                <Text style={styles.summaryTextBig}>{totalAmountProducts}</Text>
              </View>
            </View>
            <Text style={[styles.TittleFeatureTicket, { fontSize: 16 }]}>
              Average per purchase: {average}€
            </Text>
          </View>

          {Platform.OS === "android" && (
            <View style={styles.filterOrderContainer}>
              <View style={styles.dateColumn}>
                <Pressable onPress={() => setShowFromPicker(true)}>
                  <Text style={styles.label}>From:</Text>
                  <Text style={styles.value}>{formatDate(fromDate)}</Text>
                </Pressable>
              </View>

              <View style={styles.dateColumn}>
                <Pressable onPress={() => setShowUntilPicker(true)}>
                  <Text style={styles.label}>Until:</Text>
                  <Text style={styles.value}>{formatDate(untilDate)}</Text>
                </Pressable>
              </View>
            </View>
          )}

          <DateTimePickerModal
            isVisible={showFromPicker}
            mode="date"
            date={fromDate}
            onConfirm={(date) => {
              setShowFromPicker(false);
              setFromDate(date);
            }}
            onCancel={() => setShowFromPicker(false)}
          />

          <DateTimePickerModal
            isVisible={showUntilPicker}
            mode="date"
            date={untilDate}
            onConfirm={(date) => {
              setShowUntilPicker(false);
              setUntilDate(date);
            }}
            onCancel={() => setShowUntilPicker(false)}
          />

          {Platform.OS === "ios" && (
            <View style={styles.filterOrderContainer}>
              <View style={styles.filterOrderContainer}>
                <View style={styles.dateColumn}>
                  <Pressable onPress={() => setShowFromPicker(true)}>
                    <Text style={styles.label}>From: </Text>
                    <DateTimePicker
                      style={{ alignSelf: "center" }}
                      value={fromDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowFromPicker(false);
                        if (event.type === "set" && selectedDate) {
                          setFromDate(selectedDate);
                        }
                      }}
                    />
                  </Pressable>
                </View>
                <View style={styles.dateColumn}>
                  <Pressable onPress={() => setShowUntilPicker(true)}>
                    <Text style={styles.label}>Until: </Text>
                    <DateTimePicker
                      style={{ alignSelf: "center" }}
                      value={untilDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowUntilPicker(false);
                        if (event.type === "set" && selectedDate) {
                          setUntilDate(selectedDate);
                        }
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          <View style={{ flex: 1, width: "100%" }}>
            <ScrollView
              style={{ width: "100%", marginBottom: 15 }}
              contentContainerStyle={{ paddingBottom: 5 }}
            >
              {filteredTickets.map((ticket) => (
                <ExpensiveCard
                  key={ticket.id}
                  super={ticket.supermarket}
                  date={dateBeautify(ticket.ticketDate)}
                  amount={ticket.amountProducts}
                  money={ticket.totalPrice}
                  onDelete={() => onDelete(ticket)}
                  onViewTicket={() => onViewTicket(ticket)}
                />
              ))}
            </ScrollView>
            <View
              style={[styles.floatingButton, { bottom: tabBarHeight - 140 }]}
            >
              <Pressable onPress={onAddTicket}>
                <AddCircleButton />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 235, 0.7)",
  },
  container: {
    flex: 1,
    marginTop: 50,
    position: "relative",
    alignItems: "center",
  },
  featuredTicket: {
    width: "95%",
    borderRadius: 10,
    backgroundColor: "#4B7D33",
    padding: 15,
    margin: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  filterOrderContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
  },
  TittleFeatureTicket: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "InterSemiBold",
  },
  summaryTextBox: {
    backgroundColor: "#77AF5C",
    borderRadius: 15,
    padding: "3%",
    marginVertical: "5%",
  },
  summaryText: {
    fontSize: 18,
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  summaryTextBig: {
    fontSize: 25,
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateColumn: {
    flex: 1,
  },
  label: {
    color: "#173509",
    fontSize: 15,
    fontFamily: "MontserratSemiBold",
    marginLeft: 8,
    marginRight: 20,
  },
  value: {
    width: "95%",
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#6a6d6a63",
    marginVertical: 5,
    fontFamily: "MontserratSemiBold",
    textAlign: "center",
    fontSize: 20,
  },
});
export default Expenses;
