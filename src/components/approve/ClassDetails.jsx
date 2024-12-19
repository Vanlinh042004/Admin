import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Check, Trash2, Edit2 } from "lucide-react";

const ClassDetails = () => {
  const { state } = useLocation();
  const requesters = [
    {
      _id: 1,
      name: "Nguyễn Văn A",
      phoneNumber: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      introduction:
        "Tôi là một bác sĩ chuyên khoa nội tiết với hơn 10 năm kinh nghiệm.",
      specialization: "Nội tiết",
      rating: 4.5,
      slug: "nguyen-van-a",
      sex: "Nam",
    },
    {
      _id: 2,
      name: "Trần Thị B",
      phoneNumber: "0987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      introduction:
        "Chuyên gia về tư vấn tâm lý, với nhiều năm kinh nghiệm trong việc giúp đỡ người gặp khó khăn về tâm lý.",
      specialization: "Tâm lý học",
      rating: 4.7,
      slug: "tran-thi-b",
      sex: "Nữ",
    },
    {
      _id: 3,
      name: "Lê Quang C",
      phoneNumber: "0912345678",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      introduction:
        "Kỹ sư công nghệ thông tin, chuyên phát triển phần mềm và hệ thống bảo mật.",
      specialization: "Công nghệ thông tin",
      rating: 4.2,
      slug: "le-quang-c",
      sex: "Nam",
    },
    {
      _id: 4,
      name: "Phạm Minh D",
      phoneNumber: "0976543210",
      address: "321 Đường GHI, Quận 4, TP.HCM",
      introduction:
        "Giáo viên dạy Toán cấp 3 với phương pháp giảng dạy sáng tạo và hiệu quả.",
      specialization: "Toán học",
      rating: 4.8,
      slug: "pham-minh-d",
      sex: "Nam",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const indexOfLastRequester = currentPage * itemsPerPage;
  const indexOfFirstRequester = indexOfLastRequester - itemsPerPage;
  const currentRequesters = requesters.slice(
    indexOfFirstRequester,
    indexOfLastRequester
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(requesters.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-3 bg-white shadow-lg rounded-lg w-full">
      <div className="grid grid-cols-2 gap-2 text-gray-700">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Class ID:</span> {state?.classId}
          </p>
          <p>
            <span className="font-semibold">Parent ID:</span> {state?.parentsId}
          </p>
          <p>
            <span className="font-semibold">Subject:</span> {state?.subject}
          </p>
          <p>
            <span className="font-semibold">Grade:</span> {state?.grade}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {state?.address}
          </p>
          <p>
            <span className="font-semibold">Salary:</span> {state?.salary}
          </p>
          <p>
            <span className="font-semibold">Fee:</span> {state?.fee}
          </p>
        </div>

        <div className="space-y-4">
          <p>
            <span className="font-semibold">Sessions:</span> {state?.sessions}
          </p>
          <p>
            <span className="font-semibold">Schedule:</span> {state?.schedule}
          </p>
          <p>
            <span className="font-semibold">Student Info:</span>{" "}
            {state?.studentInfo}
          </p>
          <p>
            <span className="font-semibold">Requirements:</span>{" "}
            {state?.requirements}
          </p>
          <p>
            <span className="font-semibold">Teaching Mode:</span>{" "}
            {state?.teachingMode}
          </p>
          <p>
            <span className="font-semibold">Contact:</span> {state?.contact}
          </p>
          <p>
            <span className="font-semibold">Sex of Tutor:</span>{" "}
            {state?.sexTutor}
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-1 mb-4 text-gray-800">
        Requester Details:
      </h3>
      {currentRequesters.map((req) => (
        <div
          key={req._id}
          className=" grid grid-cols-2 bg-gray-100 p-4 rounded-lg shadow-md mb-6"
        >
          <div className="flex flex-col space-y-2 w-3/4">
            <p className="font-semibold text-xl text-gray-800">{req.name}</p>
            <p className="text-gray-600">{req.phoneNumber}</p>
            <p className="text-gray-600">{req.address}</p>
            <p className="text-gray-700 italic">{req.introduction}</p>
            <p className="text-gray-600">
              <span className="font-semibold">Specialization:</span>{" "}
              {req.specialization}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rating:</span> {req.rating}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Sex:</span> {req.sex}
            </p>
          </div>

          <div className="flex justify-end items-center space-x-4 bm-20">
            <button className="text-green-400 hover:text-green-300">
              <Check size={32} />
            </button>
            <button className="text-red-400 hover:text-red-300">
              <Trash2 size={32} />
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handlePrevPage}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
