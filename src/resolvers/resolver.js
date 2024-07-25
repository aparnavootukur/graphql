const { Inventory, Shipment, Supplier, User } = require('../models'); 
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const resolvers = {
  Query: {
    inventories: async (_, { offset = 0, limit = 10 },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Inventory.findAll({ offset, limit });
    },
    inventory: async (_, { id },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Inventory.findByPk(id);
    },
    shipments: async (_, __ ,{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Shipment.findAll();
    },
    shipment: async (_, { id },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Shipment.findByPk(id);
    },
    suppliers: async (_, __,{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Supplier.findAll();
    },
    supplier: async (_, { id },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Supplier.findByPk(id);
    },

    listUsers:async(_, __,{user})=>{
      if (!user) throw new AuthenticationError('You must be logged in');
      return await User.findAll()
    },

    userById:async(_,{id},{user})=>{
      if (!user) throw new AuthenticationError('You must be logged in');
      return await User.findByPk(id)
    }
  },
  Mutation: {
    addInventory: async (_, { itemName, sku, quantity, warehouseLocation },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      // You can add role-based checks here
      return await Inventory.create({ itemName, sku, quantity, warehouseLocation },{user});
    },
    updateInventory: async (_, { id, itemName, sku, quantity, warehouseLocation }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      const inventory = await Inventory.findByPk(id);
      if (!inventory) throw new Error('Inventory not found');
      return await inventory.update({ itemName, sku, quantity, warehouseLocation });
    },
    deleteInventory: async (_, { id },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      const inventory = await Inventory.findByPk(id);
      if (!inventory) throw new Error('Inventory not found');
      await inventory.destroy();
      return true;
    },
    updateShipmentStatus: async (_, { id, status },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      const shipment = await Shipment.findByPk(id);
      if (!shipment) throw new Error('Shipment not found');
      return await shipment.update({ status });
    },
   addShipment: async (_, { shipmentId,origin,destination,status,estimatedDeliveryDate },{user}) => {
    if (!user) throw new AuthenticationError('You must be logged in');
      
    return await Shipment.create({ shipmentId,origin,destination,status,estimatedDeliveryDate },{user});
    },
    deleteShipment:async(_,{id},{user})=>{
      if (!user) throw new AuthenticationError('You must be logged in');
      const shipment=await Shipment.findByPk(id);
      if(!shipment) throw new error('Shipment not fount')
      await shipment.destroy()
      return true
    },

    addSupplier: async (_, { supplierName, contactPerson, phoneNumber, emailAddress },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      return await Supplier.create({ supplierName, contactPerson, phoneNumber, emailAddress });
    },
    updateSupplier: async (_, { id, supplierName, contactPerson, phoneNumber, emailAddress },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      const supplier = await Supplier.findByPk(id);
      if (!supplier) throw new Error('Supplier not found');
      return await supplier.update({ supplierName, contactPerson, phoneNumber, emailAddress });
    },
    deleteSupplier: async (_, { id },{user}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const supplier = await Supplier.findByPk(id);
      if (!supplier) throw new Error('Supplier not found');
      await supplier.destroy();
      return true;
    }
  }
};

module.exports = resolvers;
