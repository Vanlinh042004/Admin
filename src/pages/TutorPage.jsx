import { useState, useEffect } from "react";
import { CheckCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RequestTable from "../components/tutor/RequestTable";
import TutorTable from "../components/tutor/TutorTable";
import EditTutor from "../components/tutor/EditTutor"; // Import EditTutor component
import api from "../api"; // Import API instance

const TutorPage = () => {
    const [allTutors, setAllTutors] = useState([]);
    const [requestTutors, setRequestTutors] = useState([]);
    const [approvedTutors, setApprovedTutors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTutor, setCurrentTutor] = useState(null);

    useEffect(() => {
        fetchAllTutors();
    }, []);

    // Fetch tất cả gia sư
    const fetchAllTutors = async () => {
        try {
            const response = await api.get(`/admin/tutor`);
            const mappedTutors = response.data.tutors.map(tutor => ({
                id: tutor._id,
                name: tutor.name,
                phoneNumber: tutor.phoneNumber,
                address: tutor.address,
                spec: tutor.specialization,
                intro: tutor.introduction,
                status: tutor.status,
            }));
            setAllTutors(mappedTutors);
            // Lọc theo status sau khi nhận dữ liệu
            const requests = mappedTutors.filter(tutor => tutor.status === 'Chưa duyệt');
            const approved = mappedTutors.filter(tutor => tutor.status === 'Đã duyệt');
            setRequestTutors(requests);
            setApprovedTutors(approved);
        } catch (error) {
            console.error("Error fetching tutors:", error);
            // Xử lý lỗi nếu cần
        }
    };

    // Hàm duyệt gia sư
    const approveTutor = async (id) => {
        try {
            const response = await api.put(`/admin/tutor/${id}/approve`);
            console.log(`Tutor with ID ${id} approved successfully:`, response.data.message);
            // Cập nhật trạng thái gia sư trong allTutors
            const updatedTutors = allTutors.map(tutor =>
                tutor.id === id ? { ...tutor, status: 'Đã duyệt' } : tutor
            );
            setAllTutors(updatedTutors);
            // Lọc lại các danh sách sau khi cập nhật
            const requests = updatedTutors.filter(tutor => tutor.status === 'Chưa duyệt');
            const approved = updatedTutors.filter(tutor => tutor.status === 'Đã duyệt');
            setRequestTutors(requests);
            setApprovedTutors(approved);
        } catch (error) {
            console.error(`Error approving tutor with ID ${id}:`, error);
            // Xử lý lỗi nếu cần
        }
    };

    // Hàm xóa gia sư
    const deleteTutor = async (id) => {
        try {
            await api.delete(`/admin/tutor/${id}`);
            console.log(`Tutor with ID ${id} deleted successfully.`);
            // Cập nhật state sau khi xóa
            const updatedTutors = allTutors.filter(tutor => tutor.id !== id);
            setAllTutors(updatedTutors);
            const requests = updatedTutors.filter(tutor => tutor.status === 'Chưa duyệt');
            const approved = updatedTutors.filter(tutor => tutor.status === 'Đã duyệt');
            setRequestTutors(requests);
            setApprovedTutors(approved);
        } catch (error) {
            console.error(`Error deleting tutor with ID ${id}:`, error);
            // Xử lý lỗi nếu cần
        }
    };

    // Hàm mở modal chỉnh sửa gia sư
    const openEditModal = (tutor) => {
        setCurrentTutor(tutor);
        setIsEditModalOpen(true);
    };

    // Hàm đóng modal chỉnh sửa
    const closeEditModal = () => {
        setCurrentTutor(null);
        setIsEditModalOpen(false);
    };

    // Hàm chỉnh sửa gia sư
    const editTutor = async (updatedTutor) => {
        try {
            await api.put(`/admin/tutor/${updatedTutor.id}`, updatedTutor);
            console.log(`Tutor with ID ${updatedTutor.id} updated successfully.`);
            // Cập nhật state sau khi chỉnh sửa
            const updatedTutors = allTutors.map(tutor =>
                tutor.id === updatedTutor.id ? updatedTutor : tutor
            );
            setAllTutors(updatedTutors);
            const requests = updatedTutors.filter(tutor => tutor.status === 'Chưa duyệt');
            const approved = updatedTutors.filter(tutor => tutor.status === 'Đã duyệt');
            setRequestTutors(requests);
            setApprovedTutors(approved);
            closeEditModal();
        } catch (error) {
            console.error(`Error editing tutor with ID ${updatedTutor.id}:`, error);
            // Xử lý lỗi nếu cần
        }
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allTutors.filter(tutor =>
            tutor.name.toLowerCase().includes(term)
        );
        const requests = filtered.filter(tutor => tutor.status === 'Chưa duyệt');
        const approved = filtered.filter(tutor => tutor.status === 'Đã duyệt');
        setRequestTutors(requests);
        setApprovedTutors(approved);
    };

    return (
        <div className='flex-1 relative z-10 overflow-auto'>
            <Header title={"Tutor"} />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name='Total Tutor'
                        icon={CheckCircle}
                        value={approvedTutors.length}
                        color='#10B981'
                    />
                </motion.div>

                

                <RequestTable 
                    tutors={requestTutors} 
                    approveTutor={approveTutor} 
                    deleteTutor={deleteTutor}
                    openEditModal={openEditModal}
                />
                <TutorTable 
                    tutors={approvedTutors} 
                    deleteTutor={deleteTutor}
                    openEditModal={openEditModal}
                />

                {isEditModalOpen && currentTutor && (
                    <EditTutor 
                        tutor={currentTutor} 
                        onClose={closeEditModal} 
                        onSave={editTutor} 
                    />
                )}
            </main>
        </div>
    );
};
export default TutorPage;