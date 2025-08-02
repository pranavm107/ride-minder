import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

// Specific hooks for each table to avoid TypeScript issues
export const useCabs = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('cabs')
        .select(`
          *,
          driver:driver_id (
            id,
            user_id,
            license_number,
            profiles:user_id (full_name, phone)
          ),
          route:route_id (
            route_name,
            pickup_location,
            drop_location
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(fetchedData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const insert = async (newData: any) => {
    try {
      const { data: insertedData, error } = await supabase
        .from('cabs')
        .insert(newData)
        .select();

      if (error) throw error;
      if (insertedData) {
        setData(prev => [insertedData[0], ...prev]);
      }
      return { success: true, data: insertedData };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const update = async (id: string, updates: any) => {
    try {
      const { data: updatedData, error } = await supabase
        .from('cabs')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      await fetchData(); // Refetch to get updated relations
      return { success: true, data: updatedData };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cabs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { data, loading, error, refetch: fetchData, insert, update, remove };
};

export const useStudents = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('students')
        .select(`
          *,
          profile:user_id (full_name, email, phone),
          parent:parent_id (full_name, email, phone),
          cab:cab_id (cab_number, driver_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(fetchedData || []);
    } catch (err: any) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
};

export const useDrivers = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('drivers')
        .select(`
          *,
          profile:user_id (full_name, email, phone),
          cab:cab_id (cab_number, route_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(fetchedData || []);
    } catch (err: any) {
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
};

export const useRoutes = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('routes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(fetchedData || []);
    } catch (err: any) {
      console.error('Error fetching routes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const insert = async (newData: any) => {
    try {
      const { data: insertedData, error } = await supabase
        .from('routes')
        .insert(newData)
        .select();

      if (error) throw error;
      if (insertedData) {
        setData(prev => [insertedData[0], ...prev]);
      }
      return { success: true, data: insertedData };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { data, loading, refetch: fetchData, insert };
};

// Real-time location tracking hook
export const useLiveLocations = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchLocations = async () => {
      const { data } = await supabase
        .from('live_locations')
        .select(`
          *,
          cabs:cab_id (
            cab_number,
            driver_id,
            profiles:driver_id (full_name)
          )
        `)
        .eq('is_active', true)
        .order('timestamp', { ascending: false });
      
      setLocations(data || []);
      setLoading(false);
    };

    fetchLocations();

    // Set up real-time subscription
    const channel = supabase
      .channel('live_locations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_locations'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setLocations(prev => [payload.new as any, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setLocations(prev => prev.map(loc => 
              loc.id === payload.new.id ? payload.new as any : loc
            ));
          } else if (payload.eventType === 'DELETE') {
            setLocations(prev => prev.filter(loc => loc.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateLocation = async (cabId: string, latitude: number, longitude: number, speed = 0, heading = 0) => {
    try {
      const { data, error } = await supabase
        .from('live_locations')
        .insert({
          cab_id: cabId,
          latitude,
          longitude,
          speed,
          heading,
          timestamp: new Date().toISOString()
        })
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { locations, loading, updateLocation };
};

// SOS alerts hook with real-time updates
export const useSOSAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchAlerts = async () => {
      const { data } = await supabase
        .from('sos_alerts')
        .select(`
          *,
          cabs:cab_id (cab_number),
          triggered_by_profile:triggered_by (full_name)
        `)
        .order('created_at', { ascending: false });
      
      setAlerts(data || []);
      setLoading(false);
    };

    fetchAlerts();

    // Set up real-time subscription
    const channel = supabase
      .channel('sos_alerts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sos_alerts'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAlerts(prev => [payload.new as any, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setAlerts(prev => prev.map(alert => 
              alert.id === payload.new.id ? payload.new as any : alert
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const triggerSOS = async (cabId: string, triggeredBy: string, message?: string, location?: any) => {
    try {
      const { data, error } = await supabase
        .from('sos_alerts')
        .insert({
          cab_id: cabId,
          triggered_by: triggeredBy,
          message,
          location,
          alert_type: 'emergency'
        })
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const resolveAlert = async (alertId: string, resolvedBy: string) => {
    try {
      const { data, error } = await supabase
        .from('sos_alerts')
        .update({
          is_resolved: true,
          resolved_at: new Date().toISOString(),
          resolved_by: resolvedBy
        })
        .eq('id', alertId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { alerts, loading, triggerSOS, resolveAlert };
};

// Camera events hook
export const useCameraEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('camera_events')
        .select(`
          *,
          cabs:cab_id (cab_number)
        `)
        .order('activated_at', { ascending: false });
      
      setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();

    // Real-time subscription
    const channel = supabase
      .channel('camera_events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'camera_events'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setEvents(prev => [payload.new as any, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setEvents(prev => prev.map(event => 
              event.id === payload.new.id ? payload.new as any : event
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activateCamera = async (cabId: string, eventType: string, triggeredBy?: string, password?: string) => {
    try {
      const { data, error } = await supabase
        .from('camera_events')
        .insert({
          cab_id: cabId,
          event_type: eventType,
          triggered_by: triggeredBy,
          camera_password: password,
          is_active: true
        })
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deactivateCamera = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('camera_events')
        .update({
          is_active: false,
          deactivated_at: new Date().toISOString()
        })
        .eq('id', eventId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { events, loading, activateCamera, deactivateCamera };
};

// Attendance tracking hook
export const useAttendance = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('attendance')
        .select(`
          *,
          student:student_id (
            register_number,
            profile:user_id (full_name)
          ),
          cab:cab_id (cab_number)
        `)
        .order('attendance_date', { ascending: false });

      if (error) throw error;
      setData(fetchedData || []);
    } catch (err: any) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markAttendance = async (studentId: string, cabId: string, type: 'pickup' | 'drop') => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Check if attendance record exists for today
      const { data: existingRecord } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_id', studentId)
        .eq('attendance_date', today)
        .maybeSingle();

      const updateData = {
        [`${type}_status`]: true,
        [`${type}_time`]: new Date().toISOString()
      };

      if (existingRecord) {
        const { data, error } = await supabase
          .from('attendance')
          .update(updateData)
          .eq('id', existingRecord.id)
          .select();

        if (error) throw error;
        await fetchData();
        return { success: true, data };
      } else {
        const { data, error } = await supabase
          .from('attendance')
          .insert({
            student_id: studentId,
            cab_id: cabId,
            attendance_date: today,
            ...updateData
          })
          .select();

        if (error) throw error;
        await fetchData();
        return { success: true, data };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return { data, loading, refetch: fetchData, markAttendance };
};