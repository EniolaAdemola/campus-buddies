-- Add extended profile fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS course TEXT,
ADD COLUMN IF NOT EXISTS interests TEXT[],
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available',
ADD COLUMN IF NOT EXISTS avatar TEXT,
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS group_number INTEGER,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_group_number ON public.profiles(group_number);