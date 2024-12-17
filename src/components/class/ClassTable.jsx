import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";

const ClassTable = ({ classes, deleteClass }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Lọc lớp học dựa trên search term
    const filteredClasses = classes.filter(cls =>
        cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.id.toString().includes(searchTerm)
    );

    const indexOfLastClass = currentPage * itemsPerPage;
    const indexOfFirstClass = indexOfLastClass - itemsPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Approved Class List</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search classes...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            {/* Bảng hiển thị lớp học */}
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Subject
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Grade
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Address
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Salary
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Sessions
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {currentClasses.map(cls => (
                            <motion.tr
                                key={cls.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.id}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.subject}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.grade}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.address}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.salary}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.sessions}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {cls.status}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button
                                        onClick={() => deleteClass(cls.id)} // Added onClick handler
                                        className='text-red-400 hover:text-red-300'
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center mt-4 space-x-2'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${
                        currentPage === 1
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 rounded ${
                            currentPage === number
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};
export default ClassTable;