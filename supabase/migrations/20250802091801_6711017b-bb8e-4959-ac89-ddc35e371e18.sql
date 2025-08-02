-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'driver', 'student', 'parent', 'guest');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_name TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  pickup_coordinates JSONB, -- {lat: number, lng: number}
  drop_coordinates JSONB,
  distance_km DECIMAL(5,2),
  estimated_duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cabs table
CREATE TABLE public.cabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cab_number TEXT UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  route_id UUID REFERENCES public.routes(id) ON DELETE SET NULL,
  total_seats INTEGER NOT NULL DEFAULT 20,
  available_seats INTEGER NOT NULL DEFAULT 20,
  vehicle_type TEXT DEFAULT 'bus',
  registration_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  register_number TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  cab_id UUID REFERENCES public.cabs(id) ON DELETE SET NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  is_regular BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create drivers table
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  license_expiry DATE,
  experience_years INTEGER DEFAULT 0,
  cab_id UUID REFERENCES public.cabs(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  cab_id UUID REFERENCES public.cabs(id) ON DELETE CASCADE NOT NULL,
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pickup_status BOOLEAN DEFAULT false,
  drop_status BOOLEAN DEFAULT false,
  pickup_time TIMESTAMP WITH TIME ZONE,
  drop_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, attendance_date)
);

-- Create live_locations table
CREATE TABLE public.live_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cab_id UUID REFERENCES public.cabs(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  speed DECIMAL(5, 2) DEFAULT 0,
  heading INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sos_alerts table
CREATE TABLE public.sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cab_id UUID REFERENCES public.cabs(id) ON DELETE CASCADE NOT NULL,
  triggered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  alert_type TEXT NOT NULL DEFAULT 'emergency',
  message TEXT,
  location JSONB, -- {lat: number, lng: number}
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create camera_events table
CREATE TABLE public.camera_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cab_id UUID REFERENCES public.cabs(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL, -- 'sos_triggered', 'idle_timeout', 'manual_activation'
  triggered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  camera_password TEXT,
  stream_url TEXT,
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deactivated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create guest_bookings table
CREATE TABLE public.guest_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  register_number TEXT,
  cab_id UUID REFERENCES public.cabs(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  payment_status TEXT DEFAULT 'unpaid', -- 'paid', 'unpaid'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  guest_booking_id UUID REFERENCES public.guest_bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT DEFAULT 'cash',
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  payment_date DATE,
  month_year TEXT, -- Format: 'YYYY-MM'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT payment_reference_check CHECK (
    (student_id IS NOT NULL AND guest_booking_id IS NULL) OR
    (student_id IS NULL AND guest_booking_id IS NOT NULL)
  )
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camera_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create function to get current user profile
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS public.profiles AS $$
  SELECT * FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for routes
CREATE POLICY "Everyone can view routes" ON public.routes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage routes" ON public.routes
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for cabs
CREATE POLICY "Everyone can view cabs" ON public.cabs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Drivers can view assigned cab" ON public.cabs
  FOR SELECT USING (
    driver_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage cabs" ON public.cabs
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for students
CREATE POLICY "Students can view own data" ON public.students
  FOR SELECT USING (user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Parents can view their children" ON public.students
  FOR SELECT USING (parent_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage students" ON public.students
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for drivers
CREATE POLICY "Drivers can view own data" ON public.drivers
  FOR SELECT USING (user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage drivers" ON public.drivers
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for attendance
CREATE POLICY "Students can view own attendance" ON public.attendance
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM public.students WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Parents can view child attendance" ON public.attendance
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM public.students WHERE parent_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Drivers can manage attendance for their cab" ON public.attendance
  FOR ALL USING (
    cab_id IN (
      SELECT cab_id FROM public.drivers WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all attendance" ON public.attendance
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for live_locations
CREATE POLICY "Everyone can view live locations" ON public.live_locations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Drivers can update their cab location" ON public.live_locations
  FOR INSERT USING (
    cab_id IN (
      SELECT cab_id FROM public.drivers WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage live locations" ON public.live_locations
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for sos_alerts
CREATE POLICY "Users can view relevant SOS alerts" ON public.sos_alerts
  FOR SELECT USING (
    -- Users can see alerts they triggered
    triggered_by = (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    -- Parents can see alerts from their child's cab
    cab_id IN (
      SELECT cab_id FROM public.students WHERE parent_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    ) OR
    -- Drivers can see alerts from their cab
    cab_id IN (
      SELECT cab_id FROM public.drivers WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    ) OR
    -- Admins can see all
    public.get_current_user_role() = 'admin'
  );

CREATE POLICY "Users can create SOS alerts" ON public.sos_alerts
  FOR INSERT WITH CHECK (triggered_by = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage SOS alerts" ON public.sos_alerts
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for camera_events
CREATE POLICY "Admins can view all camera events" ON public.camera_events
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Drivers can view their cab camera events" ON public.camera_events
  FOR SELECT USING (
    cab_id IN (
      SELECT cab_id FROM public.drivers WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage camera events" ON public.camera_events
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for guest_bookings
CREATE POLICY "Guests can view their bookings" ON public.guest_bookings
  FOR SELECT USING (guest_email = (SELECT email FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can create guest bookings" ON public.guest_bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage guest bookings" ON public.guest_bookings
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for payments
CREATE POLICY "Students can view own payments" ON public.payments
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM public.students WHERE user_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Parents can view child payments" ON public.payments
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM public.students WHERE parent_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage payments" ON public.payments
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for live tracking
ALTER TABLE public.live_locations REPLICA IDENTITY FULL;
ALTER TABLE public.sos_alerts REPLICA IDENTITY FULL;
ALTER TABLE public.camera_events REPLICA IDENTITY FULL;
ALTER TABLE public.attendance REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.camera_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance;