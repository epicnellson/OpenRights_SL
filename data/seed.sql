-- ============================================
-- OpenRights SL — Database Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'creator',
  avatar_url TEXT,
  bio TEXT,
  location TEXT DEFAULT 'Sierra Leone',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can read own profile') THEN
    CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- 2. LICENSES TABLE
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  summary TEXT,
  best_for TEXT,
  commercial BOOLEAN DEFAULT false,
  copyleft BOOLEAN DEFAULT false,
  patent_protection BOOLEAN DEFAULT false,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'licenses' AND policyname = 'Anyone can read licenses') THEN
    CREATE POLICY "Anyone can read licenses" ON public.licenses FOR SELECT USING (true);
  END IF;
END $$;

-- Seed licenses
INSERT INTO public.licenses (key, name, summary, best_for, commercial, copyleft, patent_protection, url)
VALUES
  ('MIT', 'MIT License', 'A permissive license that allows reuse with minimal restrictions. Users must include the original copyright notice.', 'Simple open source projects, libraries, and frameworks that want maximum adoption', true, false, false, 'https://opensource.org/licenses/MIT'),
  ('Apache-2.0', 'Apache License 2.0', 'A permissive license similar to MIT but also provides express grant of patent rights from contributors.', 'Open source projects that need both permissiveness and patent protection', true, false, true, 'https://opensource.org/licenses/Apache-2.0'),
  ('GPL-3.0', 'GNU General Public License v3', 'A strong copyleft license requiring that derivative works be distributed under the same license terms.', 'Projects that want to ensure all derivatives remain open source', true, true, true, 'https://opensource.org/licenses/GPL-3.0'),
  ('CC-BY-4.0', 'Creative Commons Attribution 4.0', 'Allows others to distribute, remix, and adapt your content, even commercially, as long as they credit you.', 'Creative works like articles, images, videos, and educational content', true, false, false, 'https://creativecommons.org/licenses/by/4.0'),
  ('CC-BY-NC-4.0', 'Creative Commons Attribution-NonCommercial 4.0', 'Allows others to remix and adapt your work for non-commercial purposes only, with attribution.', 'Creative works where you want to share but prevent commercial exploitation', false, false, false, 'https://creativecommons.org/licenses/by-nc/4.0')
ON CONFLICT (key) DO NOTHING;

-- 3. REGISTRATIONS TABLE (Creator Registry)
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  creator_name TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'creator',
  license_key TEXT REFERENCES public.licenses(key),
  description TEXT,
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Users can read own registrations') THEN
    CREATE POLICY "Users can read own registrations" ON public.registrations FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Anyone can read public registrations') THEN
    CREATE POLICY "Anyone can read public registrations" ON public.registrations FOR SELECT USING (status = 'registered');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Users can insert own registration') THEN
    CREATE POLICY "Users can insert own registration" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Users can update own registration') THEN
    CREATE POLICY "Users can update own registration" ON public.registrations FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 4. AUTO-CREATE PROFILE ON SIGNUP (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'creator'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
