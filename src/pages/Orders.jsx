import React, { useEffect, useState } from "react";
import { useOrder } from "../context/orderContext";
import { useRoute } from "../context/routeContext";
import { toast } from "react-hot-toast";

const Orders = () => {
  const { getAllOrders, createOrder, updateOrder, deleteOrder } = useOrder();
  const { getAllRoutes } = useRoute();

  const [orders, setOrders] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    valueRs: 0,
    assignedRoute: "",
    deliveryTimestamp: "",
  });

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingOrderData, setEditingOrderData] = useState({
    orderId: "",
    valueRs: 0,
    assignedRoute: "",
    deliveryTimestamp: "",
  });

  useEffect(() => {
    fetchOrders();
    fetchRoutes();
  }, []);

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const fetchRoutes = async () => {
    const data = await getAllRoutes();
    setRoutes(data);
  };

  const handleAdd = async () => {
    await createOrder(newOrder);
    setNewOrder({
      orderId: "",
      valueRs: 0,
      assignedRoute: "",
      deliveryTimestamp: "",
    });
    toast.success("Orders successfully added");
    fetchOrders();
  };

  const handleEdit = (order) => {
    setEditingOrderId(order._id);
    setEditingOrderData({
      orderId: order.orderId,
      valueRs: order.valueRs,
      assignedRoute: order.assignedRoute?._id || "",
      deliveryTimestamp: order.deliveryTimestamp?.slice(0, 16) || "",
    });
  };

  const handleUpdate = async () => {
    await updateOrder(editingOrderId, editingOrderData);
    setEditingOrderId(null);
    setEditingOrderData({
      orderId: "",
      valueRs: 0,
      assignedRoute: "",
      deliveryTimestamp: "",
    });
    fetchOrders();
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Add Order */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <input
          type="text"
          placeholder="Order ID"
          value={newOrder.orderId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, orderId: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Value Rs"
          value={newOrder.valueRs}
          onChange={(e) =>
            setNewOrder({ ...newOrder, valueRs: e.target.value })
          }
          className="p-2 border rounded"
        />
        <select
          value={newOrder.assignedRoute}
          onChange={(e) =>
            setNewOrder({ ...newOrder, assignedRoute: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="">Select Route</option>
          {routes.map((r) => (
            <option key={r._id} value={r._id}>
              {r.routeId}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={newOrder.deliveryTimestamp}
          onChange={(e) =>
            setNewOrder({ ...newOrder, deliveryTimestamp: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Orders Table */}
      <table className="w-full bg-white dark:bg-gray-900 rounded shadow overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Value Rs</th>
            <th className="p-3">Assigned Route</th>
            <th className="p-3">Delivery Time</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o._id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingOrderId === o._id ? (
                  <input
                    type="text"
                    value={editingOrderData.orderId}
                    onChange={(e) =>
                      setEditingOrderData({
                        ...editingOrderData,
                        orderId: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  o.orderId
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingOrderId === o._id ? (
                  <input
                    type="number"
                    value={editingOrderData.valueRs}
                    onChange={(e) =>
                      setEditingOrderData({
                        ...editingOrderData,
                        valueRs: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  o.valueRs
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingOrderId === o._id ? (
                  <select
                    value={editingOrderData.assignedRoute}
                    onChange={(e) =>
                      setEditingOrderData({
                        ...editingOrderData,
                        assignedRoute: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  >
                    <option value="">Select Route</option>
                    {routes.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.routeId}
                      </option>
                    ))}
                  </select>
                ) : (
                  o.assignedRoute?.routeId || "-"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingOrderId === o._id ? (
                  <input
                    type="datetime-local"
                    value={editingOrderData.deliveryTimestamp}
                    onChange={(e) =>
                      setEditingOrderData({
                        ...editingOrderData,
                        deliveryTimestamp: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  new Date(o.deliveryTimestamp).toLocaleString()
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingOrderId === o._id ? (
                  <>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => setEditingOrderId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(o)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(o._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
