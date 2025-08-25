import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email from:", email, "name:", name);

    const emailResponse = await resend.emails.send({
      from: "LisioBuddy Contact <onboarding@resend.dev>",
      to: ["it.eniolaademola@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
            <p style="line-height: 1.6; color: #334155;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px; font-size: 14px; color: #64748b;">
            <p><strong>Reply to:</strong> ${email}</p>
            <p><strong>Sent via:</strong> LisioBuddy Contact Form</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Also send confirmation email to the user
    await resend.emails.send({
      from: "LisioBuddy Team <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for contacting LisioBuddy! ✨",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Hey ${name}! 👋</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">
            Thanks for reaching out to us! We've received your message and we're super excited to help you out.
          </p>
          <div style="background: linear-gradient(135deg, #4F46E5, #06B6D4); padding: 20px; border-radius: 12px; margin: 20px 0; color: white;">
            <h3 style="margin: 0 0 10px 0;">What happens next?</h3>
            <p style="margin: 0; opacity: 0.9;">Our team will review your message and get back to you within 24 hours. We're here to make your study buddy experience amazing!</p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Built with 💜 by FGD Students 2025<br>
            LisioBuddy Team
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email sent successfully! We'll get back to you soon 🚀" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send message. Please try again later.", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);