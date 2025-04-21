import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaDeCampanhasScreen from "../paginas/campanhas/ListaDeCampanhasScreen";
import ListaDePersonagensScreen from "../paginas/personagens/ListaDePersonagensScreen";
import LoginScreen from "../paginas/login/LoginScreen";
import EditarPersonagemScreen from "../paginas/personagens/EditarPersonagemScreen";
import ListaDeFichas3DeTScreen from "../paginas/ficha3det/ListaDeFichas3DeTScreen";
import EditarFicha3DeTScreen from "../paginas/ficha3det/EditarFicha3detScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
        <Stack.Screen
          name="EditarPersonagem"
          component={EditarPersonagemScreen}
          options={{ title: "Editar Personagem" }}
        />
        <Stack.Screen
          name="ListaDeFichas3DeT"
          component={ListaDeFichas3DeTScreen}
          options={{ title: "Fichas 3DeT" }}
        />
        <Stack.Screen
          name="EditarFicha3DeT"
          component={EditarFicha3DeTScreen}
          options={{ title: "Editar Ficha 3DeT" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
