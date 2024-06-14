import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import ProductosService from '../services/ProductosService';
import { Producto } from '../services/ProductosService';
import { useFocusEffect } from '@react-navigation/native';

const ListarProductosPantalla = ({ navigation }: { navigation: any }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  
  const obtenerProductos = async () => {
    try {
      const productosObtenidos = await ProductosService.obtenerTodos();
      setProductos(productosObtenidos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerProductos();
    }, [])
  );

  const renderItem = ({ item }: { item: Producto }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>Descripción: {item.descripcion}</Text>
        <Text>Precio: {item.precio}</Text>
        <Text>Cantidad: {item.cantidad}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Detalles', { productoId: item.id })}
          style={styles.button}
        >
          Detalles
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});

export default ListarProductosPantalla;