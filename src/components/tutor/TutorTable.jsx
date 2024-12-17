import { motion } from "framer-motion";
import { Search, Check, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

const TutorTable = ({ tutors, deleteTutor, openEditModal }) => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 6; 

    const handleSearch = (e) => { 
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Lọc gia sư dựa trên search term
    const filteredTutors = tutors.filter(tutor => 
        tutor.name.toLowerCase().includes(searchTerm)
    );

    const indexOfLastTutor = currentPage * itemsPerPage;
    const indexOfFirstTutor = indexOfLastTutor - itemsPerPage;
    const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor);
    const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border mb-8 border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Approved Tutor List</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search tutors...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Phone Number
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Address
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Specialization
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Introduction
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide divide-gray-700'>
                        {currentTutors.map((tutor) => (
                            <motion.tr
                                key={tutor.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>
                                    {tutor.id}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>
                                    {tutor.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>
                                    {tutor.phoneNumber}
                                </td>
                                <td className='px-6 py-4 whitespace-normal text-sm text-gray-100 break-words w-[200px]'>
                                    {tutor.address}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {tutor.spec}
                                </td>
                                <td className='px-6 py-4 whitespace-normal text-sm text-gray-300 break-words w-[200px]'>
                                    {tutor.intro}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button 
                                        className='text-blue-400 hover:text-blue-300 mr-2'
                                        onClick={() => openEditModal(tutor)}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button 
                                        className='text-red-400 hover:text-red-300'
                                        onClick={() => deleteTutor(tutor.id)}
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
export default TutorTable;