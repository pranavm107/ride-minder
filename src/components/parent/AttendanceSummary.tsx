import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';

interface AttendanceSummaryProps {
  studentData: any;
}

const AttendanceSummary = ({ studentData }: AttendanceSummaryProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Mock attendance data
  const attendanceData = {
    thisMonth: {
      present: 22,
      absent: 3,
      total: 25,
      percentage: 88
    },
    thisWeek: {
      present: 4,
      absent: 1,
      total: 5,
      percentage: 80
    },
    recentActivity: [
      { date: '2025-01-07', status: 'present', time: '8:15 AM', reason: null },
      { date: '2025-01-06', status: 'absent', time: null, reason: 'Student sick leave' },
      { date: '2025-01-05', status: 'present', time: '8:12 AM', reason: null },
      { date: '2025-01-04', status: 'present', time: '8:18 AM', reason: null },
      { date: '2025-01-03', status: 'present', time: '8:16 AM', reason: null },
    ]
  };

  // Mock calendar data - dates with attendance status
  const attendanceCalendar = {
    '2025-01-07': 'present',
    '2025-01-06': 'absent',
    '2025-01-05': 'present',
    '2025-01-04': 'present',
    '2025-01-03': 'present',
    '2025-01-02': 'present',
    '2025-01-01': 'holiday',
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Absent</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const modifiers = {
    present: Object.keys(attendanceCalendar).filter(date => 
      attendanceCalendar[date as keyof typeof attendanceCalendar] === 'present'
    ).map(date => new Date(date)),
    absent: Object.keys(attendanceCalendar).filter(date => 
      attendanceCalendar[date as keyof typeof attendanceCalendar] === 'absent'
    ).map(date => new Date(date)),
    holiday: Object.keys(attendanceCalendar).filter(date => 
      attendanceCalendar[date as keyof typeof attendanceCalendar] === 'holiday'
    ).map(date => new Date(date))
  };

  const modifiersClassNames = {
    present: 'bg-green-100 text-green-700 rounded-full',
    absent: 'bg-red-100 text-red-700 rounded-full',
    holiday: 'bg-blue-100 text-blue-700 rounded-full'
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">This Month</p>
                <p className="text-2xl font-bold text-green-800">{attendanceData.thisMonth.percentage}%</p>
                <p className="text-xs text-green-600">
                  {attendanceData.thisMonth.present}/{attendanceData.thisMonth.total} days
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">This Week</p>
                <p className="text-2xl font-bold text-blue-800">{attendanceData.thisWeek.percentage}%</p>
                <p className="text-xs text-blue-600">
                  {attendanceData.thisWeek.present}/{attendanceData.thisWeek.total} days
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Today's Status</p>
                <p className="text-lg font-bold text-purple-800">Present</p>
                <p className="text-xs text-purple-600">Boarded at 8:15 AM</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="history">Recent History</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Attendance Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={selectedMonth}
                  onMonthChange={setSelectedMonth}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  className="rounded-md border shadow-sm"
                />
                
                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-100 rounded-full border border-blue-300"></div>
                    <span>Holiday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Days:</span>
                    <Badge variant="outline">{attendanceData.thisMonth.total}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Present:</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {attendanceData.thisMonth.present}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Absent:</span>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      {attendanceData.thisMonth.absent}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Attendance Rate</span>
                    <span className="font-medium">{attendanceData.thisMonth.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${attendanceData.thisMonth.percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData.recentActivity.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-medium">{new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</p>
                        {record.time && (
                          <p className="text-sm text-muted-foreground">Boarded at {record.time}</p>
                        )}
                        {record.reason && (
                          <p className="text-sm text-muted-foreground">{record.reason}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceSummary;