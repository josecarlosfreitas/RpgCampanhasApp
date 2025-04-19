import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaDeCampanhasScreen from "../paginas/campanhas/ListaDeCampanhasScreen";
import ListaDePersonagensScreen from "../paginas/personagens/ListaDePersonagensScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListaDeCampanhas"
          component={ListaDeCampanhasScreen}
          options={{ title: "Campanhas" }}
        />
        <Stack.Screen
          name="ListaDePersonagens"
          component={ListaDePersonagensScreen}
          options={{ title: "Personagens" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
