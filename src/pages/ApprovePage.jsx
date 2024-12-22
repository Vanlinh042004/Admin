import { useState, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion"; // Added framer-motion

import React from "react";
import Header from "../components/common/Header";
import ViewCard from "../components/approve/ViewCard";
import api from "../api"; // Import API instance

const ApprovePage = () => {
  const [registrations, setRegistrations] = useState([]); // Added state for registrations
  const [classes, setClasses] = useState([]); // Existing state

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Fetch registrations data
  const fetchRegistrations = async () => {
    try {
      const response = await api.get("/admin/course/register"); // Added leading '/'
      console.log("API Response:", response.data); // Added logging for debugging
      const registrationsData = response.data; // Updated based on new API response structure

      if (!registrationsData || !Array.isArray(registrationsData)) { // Added validation
        console.error("Registrations data is undefined or not an array.");
        return;
      }

      // Fetch course details for each registration
      const coursesPromises = registrationsData.map((reg) =>
        api.get(`/admin/course/${reg.courseId}`) // Added leading '/'
      );
      const coursesResponses = await Promise.all(coursesPromises);
      const coursesData = coursesResponses.map((res) => res.data.course);

      // Combine registration with course details and calculate requestCount
      const combinedData = registrationsData.map((reg, index) => ({
        courseId: reg.courseId,
        tutorId: reg.tutors.length > 0 ? reg.tutors[0].tutor._id : null, // Extracting tutorId from registration
        subject: coursesData[index].subject,
        grade: coursesData[index].grade,
        address: coursesData[index].address,
        salary: coursesData[index].salary,
        sessions: coursesData[index].sessions,
        schedule: coursesData[index].schedule,
        requestCount: reg.tutors.length, // Count based on UserId from registration
        registeredTutors: reg.tutors.map(t => t.tutor), // Added registeredTutors field
        tutorIds: reg.tutors.map(t => t.tutor._id), // Add tutorIds array
      }));

      console.log("Combined Data:", combinedData); // Debugging combined data
      setRegistrations(combinedData);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Approve"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {registrations.map((reg) => (
            <ViewCard
              key={reg.courseId}
              classId={reg.courseId}
              tutorIds={reg.tutorIds} // Pass tutorIds array
              subject={reg.subject}
              grade={reg.grade}
              address={reg.address}
              salary={reg.salary}
              sessions={reg.sessions}
              schedule={reg.schedule}
              // ...other props...
              requestCount={reg.requestCount} // Correctly counts registration requests
              registeredTutors={reg.registeredTutors} // Pass registeredTutors to ViewCard
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ApprovePage;