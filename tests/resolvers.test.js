const resolvers = require('../src/resolvers/resolver');
const { Inventory, Shipment, Supplier } = require('../src/models');

jest.mock('../src/models');

describe('Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query', () => {
    test('inventories', async () => {
      Inventory.findAll.mockResolvedValue([{ id: 1, itemName: 'Item1', sku: 'SKU1', quantity: 10, warehouseLocation: 'Location1' }]);
      const result = await resolvers.Query.inventories(null, { offset: 0, limit: 10 });
      expect(result).toEqual([{ id: 1, itemName: 'Item1', sku: 'SKU1', quantity: 10, warehouseLocation: 'Location1' }]);
    });

    test('inventory', async () => {
      Inventory.findByPk.mockResolvedValue({ id: 1, itemName: 'Item1', sku: 'SKU1', quantity: 10, warehouseLocation: 'Location1' });
      const result = await resolvers.Query.inventory(null, { id: 1 });
      expect(result).toEqual({ id: 1, itemName: 'Item1', sku: 'SKU1', quantity: 10, warehouseLocation: 'Location1' });
    });

    test('shipments', async () => {
      Shipment.findAll.mockResolvedValue([{ id: 1, origin: 'Origin1', destination: 'Destination1', status: 'Shipped', estimatedDeliveryDate: '2024-08-01' }]);
      const result = await resolvers.Query.shipments();
      expect(result).toEqual([{ id: 1, origin: 'Origin1', destination: 'Destination1', status: 'Shipped', estimatedDeliveryDate: '2024-08-01' }]);
    });

    test('shipment', async () => {
      Shipment.findByPk.mockResolvedValue({ id: 1, origin: 'Origin1', destination: 'Destination1', status: 'Shipped', estimatedDeliveryDate: '2024-08-01' });
      const result = await resolvers.Query.shipment(null, { id: 1 });
      expect(result).toEqual({ id: 1, origin: 'Origin1', destination: 'Destination1', status: 'Shipped', estimatedDeliveryDate: '2024-08-01' });
    });

    test('suppliers', async () => {
      Supplier.findAll.mockResolvedValue([{ id: 1, supplierName: 'Supplier1', contactPerson: 'Contact1', phoneNumber: '1234567890', emailAddress: 'supplier1@example.com' }]);
      const result = await resolvers.Query.suppliers();
      expect(result).toEqual([{ id: 1, supplierName: 'Supplier1', contactPerson: 'Contact1', phoneNumber: '1234567890', emailAddress: 'supplier1@example.com' }]);
    });

    test('supplier', async () => {
      Supplier.findByPk.mockResolvedValue({ id: 1, supplierName: 'Supplier1', contactPerson: 'Contact1', phoneNumber: '1234567890', emailAddress: 'supplier1@example.com' });
      const result = await resolvers.Query.supplier(null, { id: 1 });
      expect(result).toEqual({ id: 1, supplierName: 'Supplier1', contactPerson: 'Contact1', phoneNumber: '1234567890', emailAddress: 'supplier1@example.com' });
    });
  });

  describe('Mutation', () => {
    test('addInventory', async () => {
      const newInventory = { itemName: 'NewItem', sku: 'NewSKU', quantity: 5, warehouseLocation: 'NewLocation' };
      Inventory.create.mockResolvedValue(newInventory);
      const result = await resolvers.Mutation.addInventory(null, newInventory);
      expect(result).toEqual(expect.objectContaining(newInventory));
    });

    test('updateInventory', async () => {
      const updatedInventory = { id: 1, itemName: 'UpdatedItem' };
      Inventory.findByPk.mockResolvedValue({
        update: jest.fn().mockResolvedValue(updatedInventory)
      });
      const result = await resolvers.Mutation.updateInventory(null, updatedInventory);
      expect(result.itemName).toBe('UpdatedItem');
    });

    test('deleteInventory', async () => {
      Inventory.findByPk.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true)
      });
      const result = await resolvers.Mutation.deleteInventory(null, { id: 1 });
      expect(result).toBe(true);
    });

    test('updateShipmentStatus', async () => {
      const updatedStatus = { id: 1, status: 'Delivered' };
      Shipment.findByPk.mockResolvedValue({
        update: jest.fn().mockResolvedValue(updatedStatus)
      });
      const result = await resolvers.Mutation.updateShipmentStatus(null, updatedStatus);
      expect(result.status).toBe('Delivered');
    });

    test('addShipment', async () => {
      const newShipment = { origin: 'NewOrigin', destination: 'NewDestination', status: 'Pending', estimatedDeliveryDate: '2024-08-01' };
      Shipment.create.mockResolvedValue(newShipment);
      const result = await resolvers.Mutation.addShipment(null, newShipment);
      expect(result).toEqual(expect.objectContaining(newShipment));
    });

    test('deleteShipment', async () => {
      Shipment.findByPk.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true)
      });
      const result = await resolvers.Mutation.deleteShipment(null, { id: 1 });
      expect(result).toBe(true);
    });

    test('addSupplier', async () => {
      const newSupplier = { supplierName: 'NewSupplier', contactPerson: 'NewPerson', phoneNumber: '0987654321', emailAddress: 'new@example.com' };
      Supplier.create.mockResolvedValue(newSupplier);
      const result = await resolvers.Mutation.addSupplier(null, newSupplier);
      expect(result).toEqual(expect.objectContaining(newSupplier));
    });

    test('updateSupplier', async () => {
      const updatedSupplier = { id: 1, supplierName: 'UpdatedSupplier' };
      Supplier.findByPk.mockResolvedValue({
        update: jest.fn().mockResolvedValue(updatedSupplier)
      });
      const result = await resolvers.Mutation.updateSupplier(null, updatedSupplier);
      expect(result.supplierName).toBe('UpdatedSupplier');
    });

    test('deleteSupplier', async () => {
      Supplier.findByPk.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true)
      });
      const result = await resolvers.Mutation.deleteSupplier(null, { id: 1 });
      expect(result).toBe(true);
    });
  });
});
