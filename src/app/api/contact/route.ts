import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sshakthi1024@gmail.com',
        pass: 'thxs xzwj qzuv ttvb', 
      },
    });

    const mailOptions = {
      from: 'sshakthi1024@gmail.com',
      to: 'sshakthi1024@gmail.com', 
      replyTo: email, 
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0284c7; margin-bottom: 20px;">Contact Form Submission</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; line-height: 1.6;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}