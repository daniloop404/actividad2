import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import IngresoPantalla from './src/screens/IngresoScreen';
import ListarProductosPantalla from './src/screens/ListarProductosScreen';
import DetallesScreen from './src/screens/DetallesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Ingreso" component={IngresoPantalla} />
          <Stack.Screen name="Listar" component={ListarProductosPantalla} />
          <Stack.Screen name="Detalles" component={DetallesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;