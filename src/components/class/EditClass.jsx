import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api"; // Correct Import Path

const EditClass = () => {
    const { id } = useParams(); // Get class ID from URL
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        subject: "",
        grade: "",
        address: "",
        salary: "",
        sessions: "",
        schedule: "",
        studentInfo: "",
        requirements: "",
        teachingMode: "",
        contact: "",
        sexTutor: "",
        fee: "",
        status: "",
        slug: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClassData();
    }, []);

    const fetchClassData = async () => {
        try {
            const response = await api.get(`/admin/course/${id}`);
            setClassData(response.data.course);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching class data:", err);
            setError("Failed to fetch class data.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/admin/course/${id}`, classData);
            console.log("Class updated successfully.");
            navigate("/class"); // Redirect to class list
        } catch (err) {
            console.error("Error updating class:", err);
            setError("Failed to update class.");
        }
    };

    const handleBack = () => {
        navigate("/class"); // Navigate back to class list
    };

    if (loading) return <p className="text-center text-gray-300">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <motion.div
            className='max-w-5xl mx-auto mt-10 p-4 sm:p-6 lg:p-8 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg overflow-y-auto h-screen'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Subject */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='subject'>Subject</label>
                        <input
                            id='subject'
                            type='text'
                            name='subject'
                            value={classData.subject}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Grade */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='grade'>Grade</label>
                        <input
                            id='grade'
                            type='text'
                            name='grade'
                            value={classData.grade}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='address'>Address</label>
                        <input
                            id='address'
                            type='text'
                            name='address'
                            value={classData.address}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='salary'>Salary</label>
                        <input
                            id='salary'
                            type='number'
                            name='salary'
                            value={classData.salary}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            min="0"
                        />
                    </div>

                    {/* Sessions */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='sessions'>Sessions</label>
                        <input
                            id='sessions'
                            type='text'
                            name='sessions'
                            value={classData.sessions}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            min="0"
                        />
                    </div>

                    {/* Schedule */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='schedule'>Schedule</label>
                        <input
                            id='schedule'
                            type='text'
                            name='schedule'
                            value={classData.schedule}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Student Information */}
                    <div className='md:col-span-2'>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='studentInfo'>Student Information</label>
                        <textarea
                            id='studentInfo'
                            name='studentInfo'
                            value={classData.studentInfo}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Requirements */}
                    <div className='md:col-span-2'>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='requirements'>Requirements</label>
                        <textarea
                            id='requirements'
                            name='requirements'
                            value={classData.requirements}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Teaching Mode */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='teachingMode'>Teaching Mode</label>
                        <input
                            id='teachingMode'
                            type='text'
                            name='teachingMode'
                            value={classData.teachingMode}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='contact'>Contact</label>
                        <input
                            id='contact'
                            type='text'
                            name='contact'
                            value={classData.contact}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Sex of Tutor */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='sexTutor'>Sex of Tutor</label>
                        <select
                            id='sexTutor'
                            name='sexTutor'
                            value={classData.sexTutor}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>

                    {/* Fee */}
                    <div>
                        <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='fee'>Fee</label>
                        <input
                            id='fee'
                            type='number'
                            name='fee'
                            value={classData.fee}
                            onChange={handleChange}
                            className='w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            min="0"
                        />
                    </div>


                </div>

                {/* Submit Buttons */}
                <div className='flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4'>
                    <button
                        type='button'
                        onClick={handleBack}
                        className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    >
                        Back to Classes
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditClass;