import React, { useEffect, useState } from "react";
import { useDriver } from "../context/driverContext";

const Drivers = () => {
  const { getAllDriver, createDriver, updateDriver, deleteDriver } =
    useDriver();
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    name: "",
    currentShiftHours: 0,
    pastWeekHours: 0,
  });
  const [editingDriverId, setEditingDriverId] = useState(null);
  const [editingDriverData, setEditingDriverData] = useState({
    name: "",
    currentShiftHours: 0,
    pastWeekHours: 0,
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const data = await getAllDriver();
    setDrivers(data);
  };

  const handleAdd = async () => {
    await createDriver(newDriver);
    setNewDriver({ name: "", currentShiftHours: 0, pastWeekHours: 0 });
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setEditingDriverId(driver._id);
    setEditingDriverData({
      name: driver.name,
      currentShiftHours: driver.currentShiftHours,
      pastWeekHours: driver.pastWeekHours,
    });
  };

  const handleUpdate = async () => {
    await updateDriver(editingDriverId, editingDriverData);
    setEditingDriverId(null);
    setEditingDriverData({ name: "", currentShiftHours: 0, pastWeekHours: 0 });
    fetchDrivers();
  };

  const handleDelete = async (id) => {
    await deleteDriver(id);
    fetchDrivers();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Drivers</h1>

      {/* Add Driver */}
      <div className="grid grid-cols-4 gap-0 border-b border-gray-300 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newDriver.name}
          onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Current Shift Hours"
          value={newDriver.currentShiftHours}
          onChange={(e) =>
            setNewDriver({ ...newDriver, currentShiftHours: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Past Week Hours"
          value={newDriver.pastWeekHours}
          onChange={(e) =>
            setNewDriver({ ...newDriver, pastWeekHours: e.target.value })
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

      {/* Drivers Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr className="grid grid-cols-4">
            <th className="p-2">Name</th>
            <th className="p-2 ">Current Shift Hours</th>
            <th className="p-2 ">Past Week Hours</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers?.map((d) => (
            <tr key={d._id} className="grid grid-cols-4 items-center">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingDriverId === d._id ? (
                  <input
                    type="text"
                    value={editingDriverData.name}
                    onChange={(e) =>
                      setEditingDriverData({
                        ...editingDriverData,
                        name: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  d.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingDriverId === d._id ? (
                  <input
                    type="number"
                    value={editingDriverData.currentShiftHours}
                    onChange={(e) =>
                      setEditingDriverData({
                        ...editingDriverData,
                        currentShiftHours: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  d.currentShiftHours
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingDriverId === d._id ? (
                  <input
                    type="number"
                    value={editingDriverData.pastWeekHours}
                    onChange={(e) =>
                      setEditingDriverData({
                        ...editingDriverData,
                        pastWeekHours: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  d.pastWeekHours
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingDriverId === d._id ? (
                  <>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => setEditingDriverId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      className="text-blue-600  hover:underline"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(d._id)}
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

export default Drivers;
