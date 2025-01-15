import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import ViewCard from "../components/approve/ViewCard";
import api from "../api"; // Import API instance

const ApprovePage = () => {
  const [registrations, setRegistrations] = useState([]); // State for all registrations
  const [pendingRegistrations, setPendingRegistrations] = useState([]); // State for pending
  const [approvedRegistrations, setApprovedRegistrations] = useState([]); // State for approved
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Fetch registrations data
  const fetchRegistrations = async () => {
    try {
      const response = await api.get("/admin/course/register"); // Ensure correct endpoint
      console.log("API Response reg:", response.data); // Debugging

      const registrationsData = response.data; // Assuming response.data is an array

      if (!registrationsData || !Array.isArray(registrationsData)) { // Validation
        console.error("Registrations data is undefined or not an array.");
        setError("Invalid registrations data.");
        return;
      }

      // Fetch course details for each registration
      const coursesPromises = registrationsData.map((reg) =>
        api.get(`/admin/course/${reg.courseId}`) // Ensure correct endpoint
      );
      const coursesResponses = await Promise.all(coursesPromises);
      const coursesData = coursesResponses.map((res) => res.data.course);

      // Combine registration with course details and determine approval status
      const combinedData = registrationsData.map((reg, index) => {
        const course = coursesData[index];
        console.log(`Registration ID: ${reg.courseId}, Status: ${reg.status}`); // Log status for debugging
        const isApproved = reg.status === "Chờ thanh toán"; // Determine approval based on registration status

        return {
          courseId: reg.courseId,
          subject: course.subject,
          grade: course.grade,
          address: course.address,
          salary: course.salary,
          sessions: course.sessions,
          schedule: course.schedule,
          requestCount: reg.tutors.length, // Count based on tutors in registration
          // Combine each tutor with its corresponding registrationId
          registeredTutors: reg.tutors.map((t) => ({
            ...t.tutor,
            registrationId: t.registrationId, // Include registrationId with tutor details
          })),
          tutorIds: reg.tutors.map((t) => t.tutor ? t.tutor._id : null), // Array of tutor IDs
          registrationIds: reg.tutors.map((t) => t.registrationId), // Array of registration IDs
          status: reg.status, // Include status for filtering
          isApproved: isApproved, // Approval status based on registration status
        };
      });

      console.log("Combined Data:", combinedData); // Debugging
      setRegistrations(combinedData);

      // Separate pending and approved registrations
      const pending = combinedData.filter((reg) => reg.status === "Chờ duyệt");
      const approved = combinedData.filter((reg) => reg.status === "Chờ thanh toán");

      setPendingRegistrations(pending);
      setApprovedRegistrations(approved);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError("Failed to load registrations.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Approve"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Phần Lớp Chờ Phê Duyệt */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Classes Pending Approval</h2>
          {pendingRegistrations.length === 0 ? (
            <p>No pending classes.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {pendingRegistrations.map((reg) => (
                <ViewCard
                  key={reg.courseId} // Ensure a unique key, adjust if necessary
                  classId={reg.courseId}
                  tutorIds={reg.tutorIds} // Pass tutorIds array
                  parentId={reg.parentId}
                  subject={reg.subject}
                  grade={reg.grade}
                  address={reg.address}
                  salary={reg.salary}
                  sessions={reg.sessions}
                  schedule={reg.schedule}
                  requestCount={reg.requestCount} // Correctly counts registration requests
                  registeredTutors={reg.registeredTutors} // Pass registeredTutors with registrationId
                  isApproved={false} // Pending approval
                />
              ))}
            </motion.div>
          )}
        </section>

        {/* Phần Lớp Đã Phê Duyệt */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Approved Classes</h2>
          {approvedRegistrations.length === 0 ? (
            <p>No approved classes yet.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {approvedRegistrations.map((reg) => (
                <ViewCard
                  key={reg.courseId}
                  classId={reg.courseId}
                  tutorIds={reg.tutorIds}
                  parentId={reg.parentId}
                  subject={reg.subject}
                  grade={reg.grade}
                  address={reg.address}
                  salary={reg.salary}
                  sessions={reg.sessions}
                  schedule={reg.schedule}
                  requestCount={reg.requestCount}
                  registeredTutors={reg.registeredTutors}
                  isApproved={true} // Approved
                />
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ApprovePage;