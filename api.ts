import axios from "axios";

export const announcementsAPI = axios.create({
  baseURL: process.env.ANNOUNCEMENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const studentsAPI = axios.create({
  baseURL: process.env.STUDENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const studentRegistrationAPI = axios.create({
  baseURL: process.env.STUDENT_REGISTRATION_API_URL,
  validateStatus: (status) => status < 500,
});

export const serviceRequestsAPI = axios.create({
  baseURL: process.env.SERVICE_REQUESTS_API_URL,
  validateStatus: (status) => status < 500,
});
