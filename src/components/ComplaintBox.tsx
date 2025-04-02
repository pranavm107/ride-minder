
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, FileUp, Paperclip, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const complaintSchema = z.object({
  complaintType: z.string({
    required_error: "Please select a complaint type",
  }),
  subject: z.string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject must not exceed 100 characters" }),
  description: z.string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(500, { message: "Description must not exceed 500 characters" }),
  relatedTo: z.string({
    required_error: "Please specify who this complaint is related to",
  }),
  urgency: z.string().optional(),
});

type ComplaintBoxProps = {
  className?: string;
  userType: 'student' | 'driver' | 'admin';
  onSuccess?: () => void;
};

const ComplaintBox = ({ className, userType, onSuccess }: ComplaintBoxProps) => {
  const [files, setFiles] = useState<File[]>([]);
  
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      complaintType: "",
      subject: "",
      description: "",
      relatedTo: "",
      urgency: "medium",
    },
  });

  const onSubmit = (data: z.infer<typeof complaintSchema>) => {
    console.log("Complaint submitted:", data);
    console.log("Files:", files);
    
    toast.success("Complaint submitted successfully", {
      description: "Your complaint has been received and will be reviewed shortly.",
      duration: 5000,
    });
    
    // Reset form
    form.reset();
    setFiles([]);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100', className)}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Submit Complaint or Feedback
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {userType === 'student' 
            ? "Report issues with your bus service or provide feedback to improve your experience" 
            : "Report vehicle issues, student behavior problems, or other concerns"}
        </p>
      </div>
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="complaintType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complaint type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userType === 'student' ? (
                          <>
                            <SelectItem value="punctuality">Bus Punctuality</SelectItem>
                            <SelectItem value="driver_behavior">Driver Behavior</SelectItem>
                            <SelectItem value="bus_condition">Bus Condition</SelectItem>
                            <SelectItem value="route_issue">Route Issue</SelectItem>
                            <SelectItem value="overcrowding">Overcrowding</SelectItem>
                            <SelectItem value="safety_concern">Safety Concern</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="vehicle_maintenance">Vehicle Maintenance</SelectItem>
                            <SelectItem value="student_behavior">Student Behavior</SelectItem>
                            <SelectItem value="route_planning">Route Planning</SelectItem>
                            <SelectItem value="safety_hazard">Safety Hazard</SelectItem>
                            <SelectItem value="scheduling">Scheduling Issue</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relatedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select who this relates to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userType === 'student' ? (
                          <>
                            <SelectItem value="specific_driver">Specific Driver</SelectItem>
                            <SelectItem value="specific_route">Specific Route</SelectItem>
                            <SelectItem value="specific_bus">Specific Bus</SelectItem>
                            <SelectItem value="bus_service">General Bus Service</SelectItem>
                            <SelectItem value="admin">Administration</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="specific_student">Specific Student</SelectItem>
                            <SelectItem value="student_group">Group of Students</SelectItem>
                            <SelectItem value="specific_vehicle">Vehicle</SelectItem>
                            <SelectItem value="route_management">Route Management</SelectItem>
                            <SelectItem value="admin">Administration</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of your complaint" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide detailed information about your complaint" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include specific details like date, time, location, and other relevant information
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low - For your information only</SelectItem>
                      <SelectItem value="medium">Medium - Action needed</SelectItem>
                      <SelectItem value="high">High - Urgent attention required</SelectItem>
                      <SelectItem value="critical">Critical - Safety issue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* File attachment */}
            <div>
              <FormLabel>Attachments (Optional)</FormLabel>
              <div className="mt-1 p-4 border border-dashed border-gray-300 rounded-lg">
                <div className="flex flex-col items-center">
                  <Paperclip className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag & drop files here or click to browse</p>
                  <p className="text-xs text-gray-400 mb-3">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <FileUp size={14} className="mr-1" />
                    Upload Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
              </div>
              
              {/* Display uploaded files */}
              {files.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Paperclip size={14} className="text-gray-500 mr-2" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-500 hover:text-red-500"
                          onClick={() => removeFile(index)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end">
              <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
                <Send size={16} className="mr-2" />
                Submit Complaint
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ComplaintBox;
