
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileBarChart, FileText, Download, ArrowLeft, Filter } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const reports = [
  { id: 1, name: 'Daily Attendance Summary', date: '2023-10-12', status: 'Generated', type: 'Attendance' },
  { id: 2, name: 'Route Efficiency Report', date: '2023-10-11', status: 'Generated', type: 'Route' },
  { id: 3, name: 'Student Pick-up/Drop-off Times', date: '2023-10-10', status: 'Generated', type: 'Timing' },
  { id: 4, name: 'Vehicle Maintenance Log', date: '2023-10-09', status: 'Generated', type: 'Maintenance' },
  { id: 5, name: 'Fuel Consumption Analysis', date: '2023-10-08', status: 'Generated', type: 'Fuel' },
];

const ReportsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="driver" />
      <main className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-semibold">Reports</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button size="sm">
              <FileBarChart size={16} className="mr-2" /> Generate Report
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Access and download your trip reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent reports</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-brand-500" size={20} /> Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {reports.slice(0, 3).map((report) => (
                  <li key={report.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span>{report.name}</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="text-brand-500" size={20} /> Report Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span>Weekly Attendance Summary</span>
                  <Button variant="outline" size="sm">Generate</Button>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span>Monthly Mileage Report</span>
                  <Button variant="outline" size="sm">Generate</Button>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span>Custom Date Range Report</span>
                  <Button variant="outline" size="sm">Generate</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
