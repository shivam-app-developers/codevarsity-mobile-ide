import nodemailer from 'nodemailer';

// Email transporter configuration
// You need to set up environment variables:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
// Or use a service like SendGrid, AWS SES, etc.

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  // Check if SMTP credentials are provided
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Fallback to test account if no SMTP configured
    console.warn('No SMTP credentials configured. Email notifications are disabled.');
    return null;
  }

  return transporter;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();
    
    if (!transporter) {
      console.log('Email service not configured. Skipping email send.');
      return false;
    }

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@coderkit.shivamappstudio.com',
      ...options,
    });

    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Send contact form confirmation to user
 */
export async function sendContactConfirmation(
  userEmail: string,
  userName: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Thank you for contacting CoderKit!</h2>
      <p>Hi ${escapeHtml(userName)},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p style="color: #666; font-size: 14px; margin-top: 20px;">
        In the meantime, feel free to explore our documentation at <a href="https://coderkit.shivamappstudio.com/docs">https://coderkit.shivamappstudio.com/docs</a>
      </p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'We received your message - CoderKit',
    html,
    text: `Thank you for contacting CoderKit! We've received your message and will get back to you as soon as possible.`,
  });
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotificationToAdmin(
  contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  }
): Promise<boolean> {
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL || 'support@shivamappstudio.com';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(contactData.email)}">${escapeHtml(contactData.email)}</a></p>
        <p><strong>Subject:</strong> ${escapeHtml(contactData.subject)}</p>
        <p><strong>Submitted:</strong> ${contactData.timestamp}</p>
      </div>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #4F46E5;">
        <h3 style="margin-top: 0;">Message:</h3>
        <p>${escapeHtml(contactData.message).replace(/\n/g, '<br>')}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="color: #666; font-size: 14px;">
        <a href="mailto:${escapeHtml(contactData.email)}">Reply directly to sender</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Contact: ${contactData.subject}`,
    html,
    text: `New contact form submission from ${contactData.name} (${contactData.email}):\n\n${contactData.message}`,
  });
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
