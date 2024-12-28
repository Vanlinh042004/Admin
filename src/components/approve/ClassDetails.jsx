import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion"; // Added framer-motion
import api from "../../api"; // Import API instance
import { useNavigate } from "react-router-dom"; // Added useNavigate

const ClassDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Initialized navigate
  const [tutorDetails, setTutorDetails] = useState([]); // Changed to array to store multiple tutors
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (
      state?.tutorIds &&
      Array.isArray(state.tutorIds) &&
      state.tutorIds.length > 0
    ) {
      fetchTutorDetails(state.tutorIds);
    }
    if (state?.classId) {
      fetchCourseDetails(state.classId);
    }
    // Removed fetchRegisteredTutors since data is passed via state
  }, [state]);

  // Fetch tutor details for multiple tutorIds and map registrationIds
  const fetchTutorDetails = async (tutorIds) => {
    try {
      // Fetch details for each tutorId
      const tutorDetailsPromises = tutorIds.map((id) =>
        api.get(`/admin/tutor/${id}`)
      );
      const tutorsResponses = await Promise.all(tutorDetailsPromises);
      const tutorsData = tutorsResponses.map((res) => res.data.tutor);

      // Create a map of tutorId to registrationId from state.tutors
      const registrationMap = {};
      if (state?.tutors && Array.isArray(state.tutors)) {
        state.tutors.forEach((tutor) => {
          registrationMap[tutor._id] = tutor.registrationId;
        });
      }

      // Combine tutor data with registrationId
      const combinedTutors = tutorsData.map((tutor) => ({
        ...tutor,
        registrationId: registrationMap[tutor._id] || null, // Assign registrationId or null
      }));

      setTutorDetails(combinedTutors);
    } catch (err) {
      console.error("Error fetching tutor details:", err);
      setError("Failed to load tutor details.");
    }
  };

  // Fetch course details
  const fetchCourseDetails = async (courseId) => {
    try {
      // Changed the endpoint from /course/${courseId} to /admin/course/${courseId}
      const response = await api.get(`/admin/course/${courseId}`);
      setCourseDetails(response.data.course);
      console.log("Fetched Course Details:", response.data.course); // Added logging
      // Removed fetchRegisteredTutors call
    } catch (err) {
      console.error("Error fetching course details:", err);
      setError("Failed to load course details.");
    }
  };

  // Function to handle approving a tutor
  const approveTutor = async (registrationId) => {
    try {
      console.log("Approving tutor with registrationId:", registrationId); // Added logging
      const response = await api.post("/admin/course/register", { registrationId }); // Call the approveRegister API
      console.log(response.data.message);
      // Optionally, update the UI or state after approval
      setTutorDetails(
        tutorDetails.filter((tutor) => tutor.registrationId !== registrationId)
      ); // Remove approved tutor from the list
      navigate('/approve'); // Redirect after approval
    } catch (error) {
      console.error("Error approving registration:", error);
      // Handle error, e.g., show a notification to the user
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!tutorDetails || !courseDetails) {
    return <div className="text-white">Loading...</div>;
  }

  console.log("Course Details before render:", courseDetails); // Added logging

  return (
    <motion.div
      className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Class ID:</span> {courseDetails._id}
          </p>
          <p>
            <span className="font-semibold">Parent ID:</span>{" "}
            {courseDetails.parent_id}
          </p>
          <p>
            <span className="font-semibold">Subject:</span>{" "}
            {courseDetails.subject}
          </p>
          <p>
            <span className="font-semibold">Grade:</span> {courseDetails.grade}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {courseDetails.address}
          </p>
          <p>
            <span className="font-semibold">Salary:</span>{" "}
            {courseDetails.salary}
          </p>
          <p>
            <span className="font-semibold">Fee:</span> {courseDetails.fee}
          </p>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Sessions:</span>{" "}
            {courseDetails.sessions}
          </p>
          <p>
            <span className="font-semibold">Schedule:</span>{" "}
            {courseDetails.schedule}
          </p>
          <p>
            <span className="font-semibold">Student Info:</span>{" "}
            {courseDetails.studentInfo}
          </p>
          <p>
            <span className="font-semibold">Requirements:</span>{" "}
            {courseDetails.requirements}
          </p>
          <p>
            <span className="font-semibold">Teaching Mode:</span>{" "}
            {courseDetails.teachingMode}
          </p>
          <p>
            <span className="font-semibold">Contact:</span>{" "}
            {courseDetails.contact}
          </p>
          <p>
            <span className="font-semibold">Sex of Tutor:</span>{" "}
            {courseDetails.sexTutor}
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-4 mb-4 text-gray-200">
        Tutor Details:
      </h3>
      <motion.div
        className="bg-gray-800 p-4 rounded-lg shadow-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Specialization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {tutorDetails.map((tutor) => {
              console.log("Tutor Object:", tutor);
              return (
                <tr key={tutor._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {tutor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {tutor.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {tutor.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {tutor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    <button
                      onClick={() => approveTutor(tutor.registrationId)} // Pass registrationId
                      className="text-green-400 hover:text-green-300 mr-2"
                      title="Approve Tutor"
                    >
                      <Check size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ClassDetails;