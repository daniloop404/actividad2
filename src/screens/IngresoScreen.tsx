import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import ProductosService from '../services/ProductosService';

const IngresoPantalla = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleGuardar = async () => {
    try {
      await ProductosService.crear({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
      });
      alert('Producto guardado exitosamente');
      // Limpia los campos después de guardar
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar producto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingreso de Productos</Text>
      <TextInput
        mode="outlined"
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleGuardar} style={styles.button}>
        Guardar
      </Button>
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
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default IngresoPantalla;