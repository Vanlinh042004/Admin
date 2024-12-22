import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";

import ParentsTable from "../components/parents/ParentsTable";
import EditParent from "../components/parents/EditParent"; // Ensure default import
import api from "../api"; // Import API instance

const ParentPage = () => {
  const [parents, setParents] = useState([]); // State to hold parents data
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParents, setFilteredParents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);

  useEffect(() => {
    fetchParents();
  }, []);

  // Fetch parents data from API
  const fetchParents = async () => {
    try {
      const response = await api.get("/admin/parent");
      setParents(response.data.parents);
      setFilteredParents(response.data.parents);
    } catch (error) {
      console.error("Error fetching parents:", error);
      // ...existing code...
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = parents.filter((parent) =>
      parent.name.toLowerCase().includes(term)
    );
    setFilteredParents(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastParent = currentPage * itemsPerPage;
  const indexOfFirstParent = indexOfLastParent - itemsPerPage;
  const currentParents = filteredParents.slice(indexOfFirstParent, indexOfLastParent);
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete parent handler
  const deleteParent = async (id) => {
    try {
      await api.delete(`/admin/parent/${id}`);
      console.log(`Parent with ID ${id} deleted successfully.`);
      // Update state after deletion
      const updatedParents = parents.filter((parent) => parent._id !== id);
      setParents(updatedParents);
      const filtered = updatedParents.filter((parent) =>
        parent.name.toLowerCase().includes(searchTerm)
      );
      setFilteredParents(filtered);
    } catch (error) {
      console.error(`Error deleting parent with ID ${id}:`, error);
      // ...existing code...
    }
  };

  // Open edit modal
  const openEditModal = (parent) => {
    setCurrentParent(parent);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setCurrentParent(null);
    setIsEditModalOpen(false);
  };

  // Save edited parent
  const saveEditedParent = async (editedParent) => {
    try {
      await api.put(`/admin/parent/${editedParent._id}`, editedParent);
      console.log(`Parent with ID ${editedParent._id} updated successfully.`);
      // Update state after editing
      const updatedParents = parents.map((parent) =>
        parent._id === editedParent._id ? editedParent : parent
      );
      setParents(updatedParents);
      const filtered = updatedParents.filter((parent) =>
        parent.name.toLowerCase().includes(searchTerm)
      );
      setFilteredParents(filtered);
      closeEditModal();
    } catch (error) {
      console.error(`Error editing parent with ID ${editedParent._id}:`, error);
      // ...existing code...
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Parent" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* TABLES */}
        <ParentsTable
          parents={currentParents}
          deleteParent={deleteParent}
          openEditModal={openEditModal}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />

        {isEditModalOpen && currentParent && (
          <EditParent
            parent={currentParent}
            onClose={closeEditModal}
            onSave={saveEditedParent}
          />
        )}
      </main>
    </div>
  );
};
export default ParentPage;
