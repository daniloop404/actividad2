import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="inventory" size={100} color="black" />
        <Text style={styles.title}>Inventario de Productos</Text>
        <Button
          icon={() => <MaterialIcons name="add" size={24} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate('Ingreso')}
          style={styles.button}
        >
          Agregar Producto
        </Button>
        <Button
          icon={() => <MaterialIcons name="view-list" size={24} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate('Listar')}
          style={styles.button}
        >
          Listar Productos
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});

export default HomeScreen;