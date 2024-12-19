import React from "react";
import { useNavigate } from "react-router-dom";

const ViewCard = ({
  classId,
  parentsId,
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
  sexTuror,
  fee,
  requestCount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/approve/${classId}`, {
      state: {
        classId,
        parentsId,
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
        sexTuror,
        fee,
        requestCount,
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="p-6 bg-white border border-gray-300 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-all overflow-y-auto"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Class ID: {classId}
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600">ID: {parentsId}</p>
        <p className="text-sm text-gray-600">Subject: {subject}</p>
        <p className="text-sm text-gray-600">Grade: {grade}</p>
        <p className="text-sm text-gray-600">Address: {address}</p>
        <p className="text-sm text-gray-600">Salary: {salary}</p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold text-white bg-blue-600 px-6 py-3 rounded-lg shadow-lg">
          Requests: {requestCount}
        </p>
      </div>
    </div>
  );
};

export default ViewCard;
