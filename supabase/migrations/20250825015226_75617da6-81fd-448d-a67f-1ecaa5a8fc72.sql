-- Create edge function for sending contact emails
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger will be used to send emails when contact form is submitted
  -- The actual email sending will be handled by an edge function
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;