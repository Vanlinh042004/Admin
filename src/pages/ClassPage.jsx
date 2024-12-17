import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RequestTable from "../components/class/RequestTable";
import ClassTable from "../components/class/ClassTable";
import api from "../api"; // Import API instance

const ClassPage = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [requestClasses, setRequestClasses] = useState([]);
    const [approvedClasses, setApprovedClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchAllClasses();
    }, []);

    // Fetch tất cả các lớp học
    const fetchAllClasses = async () => {
        try {
            const response = await api.get(`/admin/course`); // Adjust endpoint if necessary
            const mappedClasses = response.data.courses.map(cls => ({
                id: cls._id,
                parentId: cls.parent_id,
                tutorId: cls.tutor_id,
                subject: cls.subject,
                grade: cls.grade,
                address: cls.address,
                salary: cls.salary,
                sessions: cls.sessions,
                schedule: cls.schedule,
                studentInfo: cls.studentInfo,
                requirements: cls.requirements,
                teachingMode: cls.teachingMode,
                contact: cls.contact,
                sexTutor: cls.sexTutor,
                fee: cls.fee,
                status: cls.status,
                slug: cls.slug,
                createdAt: cls.createdAt,
                updatedAt: cls.updatedAt,
            }));
            setAllClasses(mappedClasses);
            // Lọc theo status sau khi nhận dữ liệu
            const requests = mappedClasses.filter(cls => cls.status === 'Chưa duyệt');
            const approved = mappedClasses.filter(cls => cls.status === 'Đã duyệt');
            setRequestClasses(requests);
            setApprovedClasses(approved);
        } catch (error) {
            console.error("Error fetching classes:", error);
            // Handle error if needed
        }
    };

    // Hàm duyệt lớp học
    const approveClass = async (id) => {
        try {
            const response = await api.put(`/admin/course/${id}/approve`); // Adjust endpoint if necessary
            console.log(`Class with ID ${id} approved successfully:`, response.data.message);
            // Cập nhật trạng thái lớp học trong allClasses
            const updatedClasses = allClasses.map(cls =>
                cls.id === id ? { ...cls, status: 'Đã duyệt' } : cls
            );
            setAllClasses(updatedClasses);
            // Lọc lại các danh sách sau khi cập nhật
            const requests = updatedClasses.filter(cls => cls.status === 'Chưa duyệt');
            const approved = updatedClasses.filter(cls => cls.status === 'Đã duyệt');
            setRequestClasses(requests);
            setApprovedClasses(approved);
        } catch (error) {
            console.error(`Error approving class with ID ${id}:`, error);
            // Handle error if needed
        }
    };

    // Hàm xóa khóa học
    const deleteClass = async (id) => {
        try {
            await api.delete(`/admin/course/${id}`); // Adjust endpoint if necessary
            console.log(`Class with ID ${id} deleted successfully.`);
            // Remove the deleted class from allClasses
            const updatedClasses = allClasses.filter(cls => cls.id !== id);
            setAllClasses(updatedClasses);
            // Re-filter classes based on status
            const requests = updatedClasses.filter(cls => cls.status === 'Chưa duyệt');
            const approved = updatedClasses.filter(cls => cls.status === 'Đã duyệt');
            setRequestClasses(requests);
            setApprovedClasses(approved);
        } catch (error) {
            console.error(`Error deleting class with ID ${id}:`, error);
            // Handle error if needed
        }
    };

    // Hàm chỉnh sửa khóa học
    const editClass = (id) => {
        navigate(`/classes/edit/${id}`); // Navigate to the edit page
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allClasses.filter(cls =>
            cls.subject.toLowerCase().includes(term) ||
            cls.grade.toLowerCase().includes(term) ||
            cls.id.toString().includes(term)
        );
        const requests = filtered.filter(cls => cls.status === 'Chưa duyệt');
        const approved = filtered.filter(cls => cls.status === 'Đã duyệt');
        setRequestClasses(requests);
        setApprovedClasses(approved);
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Class' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name='Total Classes'
                        icon={Package}
                        value={approvedClasses.length}
                        color='#6366F1'
                    />
                    {/* Add more StatCards if needed */}
                </motion.div>

                

                <RequestTable
                    classes={requestClasses}
                    approveClass={approveClass}
                    deleteClass={deleteClass}
                    editClass={editClass} // Pass editClass as prop
                />
                <ClassTable
                    classes={approvedClasses}
                    deleteClass={deleteClass}
                />
            </main>
        </div>
    );
};
export default ClassPage;