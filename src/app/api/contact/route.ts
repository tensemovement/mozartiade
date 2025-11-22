import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  message: z.string().min(10, '문의 내용은 최소 10자 이상 입력해주세요.'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Log the contact form submission (for debugging)
    console.log('Contact form submission:', {
      name,
      email,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
    });

    // Send email notification
    try {
      const emailSent = await sendContactEmail(name, email, message);

      // 이메일 전송이 실패한 경우 (이메일 설정이 없는 경우)
      if (!emailSent) {
        console.warn('Email configuration not set. Contact form logged but email not sent.');
        return NextResponse.json(
          {
            success: true,
            message: '문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.',
            emailSent: false,
          },
          { status: 200 }
        );
      }

      // 이메일 전송 성공
      return NextResponse.json(
        {
          success: true,
          message: '문의가 성공적으로 전송되었습니다.',
          emailSent: true,
        },
        { status: 200 }
      );
    } catch (emailError) {
      // 이메일 전송 중 오류 발생
      console.error('Failed to send email notification:', emailError);

      return NextResponse.json(
        {
          error: '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          details: emailError instanceof Error ? emailError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
