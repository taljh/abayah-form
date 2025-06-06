import dotenv from 'dotenv';
dotenv.config();

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// التحقق من وجود مفتاح API
if (!process.env.RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // التحقق من صحة الطلب
    if (!request.body) {
      return NextResponse.json(
        { success: false, message: 'لم يتم تقديم أي بيانات' },
        { status: 400 }
      );
    }

    // الحصول على بيانات النموذج
    const formData = await request.json();

    // Log incoming data for debugging
    console.log('Incoming form data:', formData);

    // Clean incoming data by removing empty fields
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value && value.trim() !== '')
    );

    // Only require brandName and phoneNumber as minimum fields
    const minimumFields = ['brandName', 'phoneNumber'];
    const missingFields = minimumFields.filter(field => !cleanedFormData[field]);

    // Log missing fields for debugging
    if (missingFields.length > 0) {
      console.error('Missing minimum required fields:', missingFields);
      return NextResponse.json(
        { success: false, message: `يرجى تقديم البيانات الأساسية: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Crear contenido HTML estructurado para el email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h1 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">تسجيل جديد في تحدي العبايات</h1>
        
        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">اسم البراند:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.brandName}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">رابط المتجر الإلكتروني:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.storeLink}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">رقم الجوال:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.phoneNumber}</p>
        </div>

        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">المبيعات الشهرية تتجاوز 5 آلاف ريال:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.monthlyRevenue === 'yes' ? 'نعم' : 'لا'}</p>
        </div>

        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">عدد العبايات في المتجر:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${
            {
              'less_than_10': 'أقل من 10',
              '10_to_20': '10 إلى 20',
              '20_to_50': '20 إلى 50',
              'more_than_50': 'أكثر من 50'
            }[cleanedFormData.abayasCount] || cleanedFormData.abayasCount
          }</p>
        </div>

        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">الميزانية الشهرية للتسويق:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.marketingBudget}</p>
        </div>

        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">التجربة مع وكالات التسويق:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.agencyExperience}</p>
        </div>

        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">موعد البدء المتوقع:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${cleanedFormData.startDate}</p>
        </div>
        
        <p style="margin-top: 30px; font-size: 13px; color: #777; border-top: 1px solid #f0f0f0; padding-top: 10px;">
          تم إرسال هذا البريد الإلكتروني تلقائيًا عبر نموذج تحدي العبايات.
        </p>
      </div>
    `;

    // إرسال البريد الإلكتروني
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'تحدي العبايات <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 't.aljh98@gmail.com',
      subject: `تسجيل جديد: ${cleanedFormData.brandName}`,
      html: htmlContent,
      rtl: true,
      tags: [{ name: 'category', value: 'brand_registration' }],
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'تم إرسال البيانات بنجاح',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'حدث خطأ أثناء إرسال البيانات',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}