import { getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido } from '../../models/Pedido.js';
import { ValidationError, AuthorizationError } from '../../../middlewares/errorHandler.js';

export const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await getAllPedidos();
    res.status(200).json({
      status: 'success',
      data: pedidos,
    });
  } catch (error) {
    next(error);
  }
};

export const getPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await getPedidoById(id);

    if (!pedido) {
      throw new ValidationError('Pedido no encontrado');
    }

    res.status(200).json({
      status: 'success',
      data: pedido,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewPedido = async (req, res, next) => {
  try {
    const data = req.body;
    const newPedido = await createPedido(data);

    res.status(201).json({
      status: 'success',
      data: newPedido,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExistingPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedPedido = await updatePedido(id, data);

    if (!updatedPedido) {
      throw new ValidationError('Pedido no encontrado');
    }

    res.status(200).json({
      status: 'success',
      data: updatedPedido,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPedido = await deletePedido(id);

    if (!deletedPedido) {
      throw new ValidationError('Pedido no encontrado');
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};