import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Email options type
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// Create SES client
function createSESClient(): SESClient | null {
  const region = process.env.AWS_SES_REGION || process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    console.warn(
      'AWS SES configuration is missing. Emails will not be sent. Please configure AWS_SES_REGION (or AWS_REGION), AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY environment variables.'
    );
    return null;
  }

  return new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

// Send email function using AWS SES
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const sesClient = createSESClient();

  if (!sesClient) {
    console.log('SES client not configured. Skipping email send.');
    console.log('Would have sent email:', {
      to: options.to,
      subject: options.subject,
      replyTo: options.replyTo,
    });
    return false;
  }

  const fromEmail = process.env.AWS_SES_FROM_EMAIL || 'noreply@mozartia.de';

  const command = new SendEmailCommand({
    Source: `Mozartiade <${fromEmail}>`,
    Destination: {
      ToAddresses: [options.to],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: options.subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: options.html,
        },
      },
    },
    ReplyToAddresses: options.replyTo ? [options.replyTo] : undefined,
  });

  try {
    const response = await sesClient.send(command);
    console.log('Email sent successfully via AWS SES:', response.MessageId);
    return true;
  } catch (error) {
    console.error('Error sending email via AWS SES:', error);
    throw error;
  }
}

// Contact form email template
export function createContactEmailTemplate(
  name: string,
  email: string,
  message: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>새로운 문의</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    새로운 문의가 도착했습니다
                  </h1>
                  <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                    Mozartiade Contact Form
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <!-- Sender Info -->
                  <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                          <strong style="color: #333; font-size: 14px;">보낸 사람:</strong>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                          <span style="color: #666; font-size: 14px;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #333; font-size: 14px;">이메일:</strong>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <a href="mailto:${email}" style="color: #8B4513; font-size: 14px; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Message Content -->
                  <div>
                    <h2 style="margin: 0 0 15px; color: #333; font-size: 18px; font-weight: bold;">
                      문의 내용
                    </h2>
                    <div style="background-color: #f9f9f9; border-left: 4px solid #8B4513; border-radius: 4px; padding: 20px; color: #666; font-size: 14px; line-height: 1.6;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0; color: #999; font-size: 12px;">
                    이 메일은 Mozartiade 문의 양식을 통해 자동으로 발송되었습니다.
                  </p>
                  <p style="margin: 10px 0 0; color: #999; font-size: 12px;">
                    답장은 위 이메일 주소로 직접 보내주세요.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Send contact form email
export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  const recipientEmail =
    process.env.CONTACT_EMAIL || 'support@mozartia.de';

  return await sendEmail({
    to: recipientEmail,
    subject: `[Mozartiade 문의] ${name}님의 문의`,
    html: createContactEmailTemplate(name, email, message),
    replyTo: email,
  });
}
