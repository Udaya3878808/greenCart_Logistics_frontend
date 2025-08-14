import React, { useEffect, useState } from "react";
import { useRoute } from "../context/routeContext";

const Routes = () => {
  const { getAllRoutes, createRoute, updateRoute, deleteRoute } = useRoute();

  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    routeId: "",
    distanceKm: 0,
    trafficLevel: "",
    baseTimeMinutes: 0,
  });

  const [editingRouteId, setEditingRouteId] = useState(null);
  const [editingRouteData, setEditingRouteData] = useState({
    routeId: "",
    distanceKm: 0,
    trafficLevel: "",
    baseTimeMinutes: 0,
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const data = await getAllRoutes();
    setRoutes(data);
  };

  const handleAdd = async () => {
    await createRoute(newRoute);
    setNewRoute({
      routeId: "",
      distanceKm: 0,
      trafficLevel: "",
      baseTimeMinutes: 0,
    });
    fetchRoutes();
  };

  const handleEdit = (route) => {
    setEditingRouteId(route._id);
    setEditingRouteData({
      routeId: route.routeId,
      distanceKm: route.distanceKm,
      trafficLevel: route.trafficLevel,
      baseTimeMinutes: route.baseTimeMinutes,
    });
  };

  const handleUpdate = async () => {
    await updateRoute(editingRouteId, editingRouteData);
    setEditingRouteId(null);
    setEditingRouteData({
      routeId: "",
      distanceKm: 0,
      trafficLevel: "",
      baseTimeMinutes: 0,
    });
    fetchRoutes();
  };

  const handleDelete = async (id) => {
    await deleteRoute(id);
    fetchRoutes();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Routes</h1>

      {/* Add Route */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <input
          type="text"
          placeholder="Route ID"
          value={newRoute.routeId}
          onChange={(e) =>
            setNewRoute({ ...newRoute, routeId: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Distance Km"
          value={newRoute.distanceKm}
          onChange={(e) =>
            setNewRoute({ ...newRoute, distanceKm: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Traffic Level"
          value={newRoute.trafficLevel}
          onChange={(e) =>
            setNewRoute({ ...newRoute, trafficLevel: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Base Time (minutes)"
          value={newRoute.baseTimeMinutes}
          onChange={(e) =>
            setNewRoute({ ...newRoute, baseTimeMinutes: e.target.value })
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

      {/* Routes Table */}
      <table className="w-full bg-white dark:bg-gray-900 rounded shadow overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="p-3">Route ID</th>
            <th className="p-3">Distance Km</th>
            <th className="p-3">Traffic Level</th>
            <th className="p-3">Base Time (minutes)</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr
              key={r._id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingRouteId === r._id ? (
                  <input
                    type="text"
                    value={editingRouteData.routeId}
                    onChange={(e) =>
                      setEditingRouteData({
                        ...editingRouteData,
                        routeId: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  r.routeId
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingRouteId === r._id ? (
                  <input
                    type="number"
                    value={editingRouteData.distanceKm}
                    onChange={(e) =>
                      setEditingRouteData({
                        ...editingRouteData,
                        distanceKm: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  r.distanceKm
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingRouteId === r._id ? (
                  <input
                    type="text"
                    value={editingRouteData.trafficLevel}
                    onChange={(e) =>
                      setEditingRouteData({
                        ...editingRouteData,
                        trafficLevel: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  r.trafficLevel
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingRouteId === r._id ? (
                  <input
                    type="number"
                    value={editingRouteData.baseTimeMinutes}
                    onChange={(e) =>
                      setEditingRouteData({
                        ...editingRouteData,
                        baseTimeMinutes: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  r.baseTimeMinutes
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingRouteId === r._id ? (
                  <>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => setEditingRouteId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(r._id)}
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

export default Routes;
