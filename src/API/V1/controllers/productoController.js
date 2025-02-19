import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } from '../../../models/Producto.js';
import { ValidationError } from '../../../middlewares/errorHandler.js';

export const getProductos = async (req, res, next) => {
  try {
    const productos = await getAllProductos();
    res.status(200).json({
      status: 'success',
      data: productos,
    });
  } catch (error) {
    next(error);
  }
};

export const getProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await getProductoById(id);

    if (!producto) {
      throw new ValidationError('Producto no encontrado');
    }

    res.status(200).json({
      status: 'success',
      data: producto,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewProducto = async (req, res, next) => {
  try {
    const data = req.body;
    const newProducto = await createProducto(data);

    res.status(201).json({
      status: 'success',
      data: newProducto,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExistingProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProducto = await updateProducto(id, data);

    if (!updatedProducto) {
      throw new ValidationError('Producto no encontrado');
    }

    res.status(200).json({
      status: 'success',
      data: updatedProducto,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProducto = await deleteProducto(id);

    if (!deletedProducto) {
      throw new ValidationError('Producto no encontrado');
    }

    res.status(204).json({
      status: 'success',
      message: 'Producto eliminado',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};