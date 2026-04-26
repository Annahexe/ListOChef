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

import ExpensesTitleIcon from "../../../assets/icons/expenses_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";

import { useState, useEffect, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import ExpensiveCard from "../../components/ExpensesCard";
import AddCircleButton from "../../components/AddCircleButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Context from "../../context/Context";
import { getData } from "../../services/services";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Expenses = (props) => {
  const { route, token } = useContext(Context);
  const { ticketsSaved, setTicketsSaved } = useContext(Context);
  const tabBarHeight = useBottomTabBarHeight();

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showUntilPicker, setShowUntilPicker] = useState(false);

  useEffect(() => {
    console.log("EN Tickets LIST" + ticketsSaved);
    setTicketsSaved([
      {
        id: 1,
        super: "Mercadona",
        date: "2025-12-12",
        amountProducts: 10,
        price: 12.14,
      },
      {
        id: 2,
        super: "Consum",
        date: "2026-01-04",
        amountProducts: 15,
        price: 15.56,
      },
      {
        id: 3,
        super: "Lidl",
        date: "2026-03-13",
        amountProducts: 5,
        price: 30.59,
      },
      {
        id: 4,
        super: "Mercadona",
        date: "2026-04-21",
        amountProducts: 10,
        price: 12.56,
      },
    ]);
  }, []);

  //Normalizar horas del dia. (Si el back no devuleve horas esto lo hace bien)
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  //Obtener el ultimo mes
  const getLastMonthDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  //Fecha en bonita android
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  //Las variables para el selector de fecha en el último mes
  const [fromDate, setFromDate] = useState(getLastMonthDate());
  const [untilDate, setUntilDate] = useState(new Date());

  //Filtrado por fecha
  const filteredTickets = ticketsSaved.filter((ticket) => {
    const ticketDate = normalizeDate(ticket.date);

    if (fromDate && ticketDate < fromDate) return false;
    if (untilDate && ticketDate > untilDate) return false;

    return true;
  });

  //Array de ticket filtrados
  const activeTickets = filteredTickets;

  //Accede a la pantalla crear ticket
  const onAddTicket = () => {
    return props.navigation.navigate("AddTicket");
  };

  //Accede a la pantalla de ver ticket
  const onViewTicket = () => {
    return props.navigation.navigate("ViewTicket");
  };

  //Poner fecha bonita (meses)
  const beautifulDate = (item) => {
    const d = new Date(item.date);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  };

  //Permite borrar ticket.  Salta alerta por si es un error.
  const onDelete = (item) => {
    Alert.alert("Delete ticket", `Remove ${item.super}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTicketsSaved((prev) => prev.filter((i) => i.id !== item.id));
        },
      },
    ]);
  };

  //Calcula el total de dinero. Lo deja en dos decimal. Calcula la media (si es 0, pone 0 sino es indeterminada(explota))
  const totalPrice = () => {
    return activeTickets.reduce((acc, item) => acc + item.price, 0);
  };
  const totalMoney = totalPrice().toFixed(2);
  const average =
    ticketsSaved.length > 0
      ? (totalPrice() / ticketsSaved.length).toFixed(2)
      : 0;

  //Calcula el total de productos.
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

                {showFromPicker && (
                  <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowFromPicker(false);
                      if (event.type === "set" && selectedDate) {
                        setFromDate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>

              <View style={styles.dateColumn}>
                <Pressable onPress={() => setShowUntilPicker(true)}>
                  <Text style={styles.label}>Until:</Text>
                  <Text style={styles.value}>{formatDate(untilDate)}</Text>
                </Pressable>

                {showUntilPicker && (
                  <DateTimePicker
                    value={untilDate || new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowUntilPicker(false);
                      if (event.type === "set" && selectedDate) {
                        setUntilDate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>
            </View>
          )}

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
                        setShowFromPicker(false);
                        if (event.type === "set" && selectedDate) {
                          setFromDate(selectedDate);
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
                  super={ticket.super}
                  date={beautifulDate(ticket)}
                  amount={ticket.amountProducts}
                  money={ticket.price}
                  onDelete={() => onDelete(ticket)}
                  onViewTicket={onViewTicket}
                />
              ))}
            </ScrollView>
            <View
              style={[styles.floatingButton, { bottom: tabBarHeight - 150 }]}
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
