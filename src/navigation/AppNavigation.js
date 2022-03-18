import "react-native-gesture-handler";
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = ({ route, navigation }) => {
  const response = route.params.param;
  const obj = JSON.parse(response);
  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.platenumberbox}>
            <Text style={styles.platenumbertext}>{obj.registrationNumber}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.texeboXx}
          onPress={() => alert("You tapped on MOT")}
        >
          <View style={styles.motbox}>
            {/*<View style={styles.boxiconleft}>
            <AntDesign name="like1" size={40} color="black" />
            </View>*/}
            <View>
              <Text style={styles.boxdatamotandtaxetextstatus}>
                MOT: {obj.motStatus}
              </Text>
              <Text style={styles.boxdatamotandtaxetextstatusdetails}>
                Expires:{obj.motExpiryDate}
              </Text>
            </View>
            {/*<View style={styles.boxiconright}>
              <Feather name="chevrons-right" size={40} color="black" />
            </View>*/}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.texeboXx}
          onPress={() => alert("You tapped Untaxed")}
        >
          <View style={styles.texebox}>
            {/*<View style={styles.boxiconleft}>
            <AntDesign name="like1" size={40} color="black" />
            </View>*/}
            <View>
              <Text style={styles.boxdatamotandtaxetextstatus}>
                Tax: {obj.taxStatus}{" "}
              </Text>
              <Text style={styles.boxdatamotandtaxetextstatusdetails}>
                Expires: {obj.taxDueDate}
              </Text>
            </View>
            {/*<View style={styles.boxiconright}>
              <Feather name="chevrons-right" size={40} color="black" />
          </View>*/}
          </View>
        </TouchableOpacity>
        <View style={styles.detailscard}>
          <Text style={styles.detailscardgenraltitle}>Basic Specification</Text>
          <Text style={styles.details}>Model: {obj.make}</Text>
          <Text style={styles.details}>Colour: {obj.colour}</Text>
          <Text style={styles.details}>
            Engine Capacity: {obj.engineCapacity}
          </Text>
          <Text style={styles.details}>Fuel Type: {obj.fuelType}</Text>
          <Text style={styles.details}>
            First Registration: {obj.monthOfFirstRegistration}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Search = ({ navigation }) => {
  const [text, setText] = useState("");

  const onChangeEmailHandler = (text) => {
    setText(text.toUpperCase());
  };

  const axios = require("axios").default;
  const onSubmitFormHandler = async () => {
    try {
      var data = JSON.stringify({ registrationNumber: text });
      var config = {
        method: "post",
        url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
        headers: {
          "x-api-key": "Your token",
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          datadata = JSON.stringify(response.data);
          navigation.navigate("TabNavigator", {
            screen: "Home",
            params: { param: datadata },
          });
        })
        .catch(function (error) {
          Alert.alert("Registration Number", "is invalid", [
            { text: "OK", onPress: () => console.log("") },
          ]);
        });
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <View style={styles.datainputrow}>
        <View style={styles.boxbox}>
          <View style={styles.boxtextgb}>
            <Text style={styles.textinput}>UK</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="PLATE"
            onChangeText={onChangeEmailHandler}
            maxLength={7}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="unless-editing"
            value={text}
            textAlignVertical="center"
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={onSubmitFormHandler}>
            <AntDesign name="search1" size={42} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
      }}
    >
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  texeboXx: { paddingBottom: 10 },
  boxbox: {
    flexDirection: "row",
    backgroundColor: "#FFCC66",
    borderRadius: 10,
    width: 230,
    height: 47.5,
    borderWidth: 4,
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignSelf: "center",
    marginLeft: 5,
    textAlign: "center",
    letterSpacing: 2,
    fontWeight: "900",
    fontSize: 35,
    color: "rgba(38, 70, 83, 0.4)",
  },
  button: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  boxtextgb: {
    justifyContent: "center",
    borderRightWidth: 3,
    backgroundColor: "blue",
  },
  platenumberbox: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 150,
    margin: 12,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFCC66",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
  },
  platenumbertext: { fontSize: 30 },
  buttontemporal: { justifyContent: "center", alignItems: "center" },
  detailscard: {
    height: 220,
    width: 368,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 20,
  },
  detailscardgenraltitle: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10,
    fontWeight: "bold",
  },

  boxdatamotandtaxetextstatus: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 3,
  },
  boxdatamotandtaxetextstatusdetails: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  motbox: {
    flexDirection: "row",
    height: 70,
    width: 368,
    backgroundColor: "rgba(0, 102, 102, 0.6)",
    borderRadius: 10,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  texebox: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    width: 368,
    backgroundColor: "rgba(230, 57, 70, 0.6)",
    borderRadius: 10,
    paddingLeft: 10,
  },
  boxiconleft: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  boxiconright: {
    justifyContent: "center",
    paddingRight: 10,
  },
  datainputrow: {
    flexDirection: "row",
  },
  details: {
    fontSize: 18,
    paddingLeft: 5,
    paddingBottom: 4,
    paddingTop: 5,
  },
  textinput: {
    height: 47.5,
    width: 24,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 12,
    paddingTop: 29,
    color: "#fff",
    textAlign: "center",
  },
});

export default DrawerNavigator;
