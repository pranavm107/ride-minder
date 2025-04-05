
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, FileDown } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';

const studentAttendance = [
  { id: '2023001', name: 'Alice Johnson', grade: '10th', stop: 'Main Street', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023002', name: 'Bob Williams', grade: '9th', stop: 'Park Avenue', morningStatus: 'Present', afternoonStatus: 'Absent' },
  { id: '2023003', name: 'Charlie Brown', grade: '11th', stop: 'Oak Street', morningStatus: 'Absent', afternoonStatus: 'Present' },
  { id: '2023004', name: 'Diana Miller', grade: '12th', stop: 'Maple Drive', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023005', name: 'Ethan Davis', grade: '10th', stop: 'Pine Lane', morningStatus: 'Absent', afternoonStatus: 'Absent' },
];

const StudentAttendancePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background shapes */}
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      
      <NavBar userType="driver" />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Student Attendance</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand" />
              <h2 className="text-lg font-medium">Today's Attendance</h2>
            </div>
            
            <Button size="sm" variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Stop</th>
                  <th className="px-4 py-3">Morning Status</th>
                  <th className="px-4 py-3">Afternoon Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {studentAttendance.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="px-4 py-3">{student.id}</td>
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.grade}</td>
                    <td className="px-4 py-3">{student.stop}</td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student.morningStatus === 'Present' 
                          ? 'bg-green-100 text-green-700' 
                          : student.morningStatus === 'Absent' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.morningStatus}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student.afternoonStatus === 'Present' 
                          ? 'bg-green-100 text-green-700' 
                          : student.afternoonStatus === 'Absent' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.afternoonStatus}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAttendancePage;
