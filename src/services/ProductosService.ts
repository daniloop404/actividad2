
import 'firebase/compat/database';
import { firebase } from "../constants/firebaseConfig";
interface ProductoFirebase {
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

export interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

const productosRef = firebase.database().ref('productos');

class ProductosService {
  async obtenerTodos(): Promise<Producto[]> {
    const snapshot = await productosRef.once('value');
    const productos = snapshot.val() as ProductoFirebase;

    if (productos) {
      return Object.entries(productos).map(([id, p]) => ({
        id,
        ...p,
      }));
    } else {
      return [];
    }
  }


  async obtenerPorId(id: string): Promise<Producto | null> {
    const snapshot = await productosRef.child(id).once('value');
    if (snapshot.exists()) {
      return { ...snapshot.val(), id } as Producto; 
    }
    return null;
  }


  async crear(producto: Producto): Promise<void> {
    const nuevoProducto = await productosRef.push();
    await nuevoProducto.set({
      ...producto,
      id: nuevoProducto.key,
    });
  }


  async actualizar(id: string, producto: Producto): Promise<void> {
    await productosRef.child(id).update(producto);
  }


  async eliminar(id: string): Promise<void> {
    await productosRef.child(id).remove();
  }
}

export default new ProductosService();