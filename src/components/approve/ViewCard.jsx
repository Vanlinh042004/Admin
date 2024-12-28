import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Added framer-motion

const ViewCard = ({
  classId,
  tutorIds,
  parentId, // Updated from tutorId to tutorIds
  subject,
  grade,
  address,
  salary,
  sessions,
  schedule,
  studentInfo,
  requirements,
  teachingMode,
  contact,
  sexTutor,
  fee,
  requestCount,
  registeredTutors, // Destructure registeredTutors from props
  isApproved, 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/approve/${classId}`, {
      state: {
        classId,
        tutorIds, // Pass tutorIds array
        parentId,
        subject,
        grade,
        address,
        salary,
        sessions,
        schedule,
        studentInfo,
        requirements,
        teachingMode,
        contact,
        sexTutor,
        fee,
        requestCount,
        tutors: registeredTutors, // Pass registeredTutors via state
      },
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300 overflow-y-auto ${
        isApproved ? "border-2 border-green-500" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">
        Class ID: {classId}
      </h3>

      <div className="mb-4 text-gray-300">
        <p className="text-sm">Subject: {subject}</p>
        <p className="text-sm">Grade: {grade}</p>
        <p className="text-sm">Address: {address}</p>
        <p className="text-sm">Salary: {salary}</p>
        <p className="text-sm">Sessions: {sessions}</p>
        <p className="text-sm">Schedule: {schedule}</p>
      </div>

      <div className="mt-4">
        {!isApproved && (
          <p className="text-lg font-semibold text-blue-400">
            Requests: {requestCount}
          </p>
        )}
        {isApproved && (
          <p className="text-sm text-green-400">Approved Recently</p>
        )}
      </div>
    </motion.div>
  );
};

export default ViewCard;