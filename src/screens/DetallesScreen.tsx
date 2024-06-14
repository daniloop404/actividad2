import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, Card } from 'react-native-paper';
import ProductosService from '../services/ProductosService';
import { Producto } from '../services/ProductosService';

const DetallesScreen = ({ route, navigation }: any) => {
  const { productoId } = route.params;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [editando, setEditando] = useState(false);
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [precioEdit, setPrecioEdit] = useState('');
  const [cantidadEdit, setCantidadEdit] = useState('');

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productoObtenido = await ProductosService.obtenerPorId(productoId);
        setProducto(productoObtenido);
        if (productoObtenido) {
          setDescripcionEdit(productoObtenido.descripcion);
          setPrecioEdit(productoObtenido.precio.toString());
          setCantidadEdit(productoObtenido.cantidad.toString());
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    obtenerProducto();
  }, [productoId]);

  const handleConfirmarEdicion = async () => {
    try {
      if (producto) {
        const productoActualizado = {
          ...producto,
          descripcion: descripcionEdit,
          precio: parseFloat(precioEdit),
          cantidad: parseInt(cantidadEdit),
        };
        await ProductosService.actualizar(productoId, productoActualizado);
        setProducto(productoActualizado);
        setEditando(false);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setEditando(false);
    if (producto) {
      setDescripcionEdit(producto.descripcion);
      setPrecioEdit(producto.precio.toString());
      setCantidadEdit(producto.cantidad.toString());
    }
  };

  const handleEliminar = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await ProductosService.eliminar(productoId);
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar el producto:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  if (!producto) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title title={producto.nombre} />
        <Card.Content>
          {editando ? (
            <>
              <TextInput
                mode="outlined"
                label="Descripción"
                value={descripcionEdit}
                onChangeText={setDescripcionEdit}
                style={styles.input}
              />
              <TextInput
                mode="outlined"
                label="Precio"
                value={precioEdit}
                onChangeText={setPrecioEdit}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                mode="outlined"
                label="Cantidad"
                value={cantidadEdit}
                onChangeText={setCantidadEdit}
                keyboardType="numeric"
                style={styles.input}
              />
              <Button mode="contained" onPress={handleConfirmarEdicion} style={styles.button}>
                Confirmar
              </Button>
              <Button mode="outlined" onPress={handleCancelarEdicion} style={styles.button}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Text>Descripción: {producto.descripcion}</Text>
              <Text>Precio: {producto.precio}</Text>
              <Text>Cantidad: {producto.cantidad}</Text>
              <Button mode="contained" onPress={() => setEditando(true)} style={styles.button}>
                Editar
              </Button>
              <Button mode="outlined" onPress={handleEliminar} style={styles.button}>
                Eliminar
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default DetallesScreen;