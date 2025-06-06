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

    // التحقق من البيانات الأساسية المطلوبة
    if (!formData.brandName || !formData.whatsapp) {
      return NextResponse.json(
        { success: false, message: 'يرجى تقديم جميع البيانات المطلوبة' },
        { status: 400 }
      );
    }

    // Crear contenido HTML estructurado para el email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h1 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">تسجيل جديد في تحدي العبايات</h1>
        
        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">اسم البراند:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.brandName || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">رابط المتجر/الإنستقرام:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.storeLink || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">عدد المنتجات:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.productsCount || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">المبيعات الشهرية:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.monthlySales || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">تجربة الإعلانات:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.adsExperience || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">أكبر تحدي في التسويق:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.marketingChallenge || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">مستعد للمشاركة في فرصة تسويقية بدون دفعات مسبقة:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.readyForMarketing || 'غير محدد'}</p>
        </div>
        
        <div style="margin-top: 15px;">
          <p style="font-weight: bold;">رقم الواتساب للتواصل:</p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.whatsapp || 'غير مقدم'}</p>
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
      subject: `تسجيل جديد: ${formData.brandName}`,
      html: htmlContent,
      rtl: true,
      tags: [{ name: 'category', value: 'brand_registration' }],
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    // إرسال رسالة تأكيد للمستخدم إذا قدم بريدًا إلكترونيًا
    if (formData.email) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'تحدي العبايات <onboarding@resend.dev>',
        to: formData.email,
        subject: 'شكراً لتسجيلك في تحدي العبايات',
        html: `
          <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif;">
            <h2>شكراً ${formData.brandName}!</h2>
            <p>تم استلام تسجيلك في تحدي العبايات بنجاح.</p>
            <p>سنقوم بالتواصل معك قريباً على رقم الواتساب المقدم.</p>
          </div>
        `,
        rtl: true,
      });
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