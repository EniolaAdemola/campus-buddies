-- Create a function to get profiles with email addresses
-- This function will be used by admins to see email addresses
CREATE OR REPLACE FUNCTION public.get_profiles_with_emails()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  full_name text,
  email text,
  course text,
  year text,
  interests text[],
  status text,
  group_number integer,
  avatar text,
  description text,
  last_active timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.user_id,
    p.full_name,
    au.email,
    p.course,
    p.year,
    p.interests,
    p.status,
    p.group_number,
    p.avatar,
    p.description,
    p.last_active,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  LEFT JOIN auth.users au ON p.user_id = au.id
  WHERE 
    -- Only allow if user is admin or requesting their own data
    (
      has_role(auth.uid(), 'admin'::app_role) OR 
      p.user_id = auth.uid()
    )
  ORDER BY p.created_at DESC;
$$;