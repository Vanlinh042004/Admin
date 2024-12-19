import React from "react";
import Header from "../components/common/Header";
import ViewCard from "../components/approve/ViewCard";

const mockData = [
  {
    classId: 1,
    parent_id: 101,
    tutor_id: 201,
    subject: "Toán học",
    grade: "Lớp 5",
    address: "Hà Nội, Quận Hai Bà Trưng",
    salary: 3000000,
    sessions: "8 buổi/tháng",
    schedule: "Thứ 3 và Thứ 5, 18:00 - 20:00",
    studentInfo: "Học sinh nữ, lớp 5A",
    requirements: "Cần gia sư có kinh nghiệm dạy toán cho học sinh tiểu học.",
    teachingMode: "offline",
    contact: "0123456789",
    sexTutor: "Nữ",
    fee: 500000,
    requestCount: 3,
  },
  {
    classId: 2,
    parent_id: 102,
    tutor_id: 202,
    subject: "Tiếng Anh",
    grade: "Lớp 8",
    address: "Hồ Chí Minh, Quận 1",
    salary: 4500000,
    sessions: "12 buổi/tháng",
    schedule: "Thứ 2 và Thứ 4, 16:00 - 18:00",
    studentInfo: "Học sinh nam, lớp 8B",
    requirements: "Cần gia sư có khả năng giảng dạy tiếng Anh giao tiếp.",
    teachingMode: "online",
    contact: "0987654321",
    sexTutor: "Nam",
    fee: 600000,
    requestCount: 2,
  },
  {
    classId: 3,
    parent_id: 103,
    tutor_id: 203,
    subject: "Lý thuyết máy",
    grade: "Lớp 11",
    address: "Đà Nẵng, Quận Hải Châu",
    salary: 6000000,
    sessions: "10 buổi/tháng",
    schedule: "Thứ 7, Chủ Nhật, 09:00 - 11:00",
    studentInfo: "Học sinh nữ, lớp 11C, cần luyện thi đại học",
    requirements:
      "Yêu cầu gia sư có chuyên môn vững về lý thuyết cơ bản và nâng cao.",
    teachingMode: "offline",
    contact: "0932123456",
    sexTutor: "Nữ",
    fee: 700000,
    requestCount: 5,
  },
];

const ApprovePage = () => {
  return (
    <div className="flex-1 bg-gray-900">
      <Header title="Approve" />
      <main className="mx-auto py-8 px-6 lg:px-10 overflow-auto max-h-screen">
        <div className="grid grid-cols-2 gap-6">
          {mockData.map((data) => (
            <ViewCard
              key={data.id}
              classId={data.classId}
              parentsId={data.parent_id}
              subject={data.subject}
              grade={data.grade}
              address={data.address}
              salary={data.salary}
              sessions={data.sessions}
              schedule={data.schedule}
              studentInfo={data.studentInfo}
              requirements={data.requirements}
              teachingMode={data.teachingMode}
              contact={data.contact}
              sexTutor={data.sexTutor}
              fee={data.fee}
              requestCount={data.requestCount}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApprovePage;
