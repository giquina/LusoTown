import { NextRequest, NextResponse } from "next/server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SITE_URL } from "@/config/site";

// Email service configuration
const EMAIL_SERVICE_CONFIG = {
  // Using SendGrid as example - replace with your preferred email service
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || "community@lusotown.com",
  fromName: process.env.FROM_NAME || "LusoTown Community",

  // Alternative services can be configured here
  resendApiKey: process.env.RESEND_API_KEY,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  ses: {
    region: process.env.AWS_REGION || "eu-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

interface EmailContent {
  subject: string;
  preheader: string;
  content: string;
  cta: string;
  ctaUrl: string;
  language: "en" | "pt";
}

// Generate HTML email template
function generateEmailHTML(content: EmailContent, userInfo: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const logoUrl = `${baseUrl}/images/lusotown-logo.png`;
  const flagEmoji = content.language === "pt" ? "🇵🇹" : "🇬🇧";

  return `
    <!DOCTYPE html>
    <html lang="${content.language}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${content.subject}</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          color: #374151;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
          background: linear-gradient(135deg, #006633, #FF0000);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }
        .content {
          padding: 32px 24px;
        }
        .content h1 {
          color: #1f2937;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .content h2 {
          color: #1f2937;
          font-size: 20px;
          font-weight: 600;
          margin: 24px 0 12px 0;
        }
        .content h3 {
          color: #374151;
          font-size: 18px;
          font-weight: 600;
          margin: 20px 0 8px 0;
        }
        .content p {
          margin-bottom: 16px;
        }
        .content ul {
          margin-bottom: 16px;
          padding-left: 24px;
        }
        .content li {
          margin-bottom: 8px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 24px 0;
        }
        .cta-button:hover {
          background: linear-gradient(135deg, #b91c1c, #dc2626);
        }
        .footer {
          background-color: #f8fafc;
          padding: 24px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        .footer a {
          color: #dc2626;
          text-decoration: none;
        }
        .unsubscribe {
          margin-top: 16px;
          font-size: 12px;
          color: #9ca3af;
        }
        .unsubscribe a {
          color: #9ca3af;
        }
        @media (max-width: 600px) {
          .container {
            border-radius: 0;
            margin: 0;
          }
          .header, .content, .footer {
            padding: 20px 16px;
          }
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f8fafc; padding: 20px 0;">
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="LusoTown" style="height: 40px; margin-bottom: 16px;">
            <h1>LusoTown Community ${flagEmoji}</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 14px;">${
              content.preheader
            }</p>
          </div>
          
          <div class="content">
            ${content.content}
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${baseUrl}${content.ctaUrl}" class="cta-button">
                ${content.cta}
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>
              <strong>LusoTown</strong> - ${
                content.language === "pt"
                  ? "A Sua Comunidade Portuguesa em Londres"
                  : "Your Portuguese Community in the U.K."
              }
            </p>
            <p>
              ${
                content.language === "pt"
                  ? "Conectando falantes de português em toda Londres"
                  : "Connecting Portuguese speakers across London"
              }
            </p>
            <div style="margin: 16px 0;">
              <a href="${baseUrl}" style="margin: 0 12px;">${
    content.language === "pt" ? "Website" : "Website"
  }</a>
              <a href="${baseUrl}/events" style="margin: 0 12px;">${
    content.language === "pt" ? "Eventos" : "Events"
  }</a>
              <a href="${baseUrl}/matches" style="margin: 0 12px;">${
    content.language === "pt" ? "Matches" : "Matches"
  }</a>
              <a href="${baseUrl}/tv" style="margin: 0 12px;">${
    content.language === "pt" ? "TV Ao Vivo" : "Live TV"
  }</a>
            </div>
            
            <div class="unsubscribe">
              <p>
                ${
                  content.language === "pt"
                    ? "Recebeu este email porque é membro do LusoTown."
                    : "You received this email because you are a LusoTown member."
                }
              </p>
              <p>
                <a href="${baseUrl}/unsubscribe?email=${userInfo.email}">
                  ${
                    content.language === "pt"
                      ? "Cancelar subscrição"
                      : "Unsubscribe"
                  }
                </a> | 
                <a href="${baseUrl}/email/preferences">
                  ${
                    content.language === "pt"
                      ? "Preferências de email"
                      : "Email preferences"
                  }
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Send email using SendGrid (replace with your preferred service)
async function sendEmailWithSendGrid(
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (!EMAIL_SERVICE_CONFIG.sendgridApiKey) {
    console.error("SendGrid API key not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${EMAIL_SERVICE_CONFIG.sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          },
        ],
        from: {
          email: EMAIL_SERVICE_CONFIG.fromEmail,
          name: EMAIL_SERVICE_CONFIG.fromName,
        },
        content: [
          {
            type: "text/html",
            value: htmlContent,
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}

// Alternative: Send email using Resend
async function sendEmailWithResend(
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (!EMAIL_SERVICE_CONFIG.resendApiKey) {
    console.error("Resend API key not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${EMAIL_SERVICE_CONFIG.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${EMAIL_SERVICE_CONFIG.fromName} <${EMAIL_SERVICE_CONFIG.fromEmail}>`,
        to: [to],
        subject: subject,
        html: htmlContent,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Resend email error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      userId,
      emailType,
      subject,
      preheader,
      content,
      cta,
      ctaUrl,
      language = "en",
    } = body;

    // Validate userId matches authenticated user
    if (userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get user profile information
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, first_name, last_name, language_preference")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Use user's preferred language if not specified
    const emailLanguage = language || profile.language_preference || "en";

    // Generate HTML content
    const emailContent: EmailContent = {
      subject,
      preheader,
      content,
      cta,
      ctaUrl,
      language: emailLanguage,
    };

    const htmlContent = generateEmailHTML(emailContent, {
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
    });

    // Try to send email (using SendGrid by default, fallback to Resend)
    let emailSent = false;

    if (EMAIL_SERVICE_CONFIG.sendgridApiKey) {
      emailSent = await sendEmailWithSendGrid(
        profile.email,
        subject,
        htmlContent
      );
    } else if (EMAIL_SERVICE_CONFIG.resendApiKey) {
      emailSent = await sendEmailWithResend(
        profile.email,
        subject,
        htmlContent
      );
    } else {
      console.error("No email service configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Log email send in database
    const { error: logError } = await supabase.from("email_logs").insert({
      user_id: userId,
      email_type: emailType,
      recipient_email: profile.email,
      subject: subject,
      status: "sent",
      sent_at: new Date().toISOString(),
      language: emailLanguage,
    });

    if (logError) {
      console.error("Error logging email send:", logError);
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
