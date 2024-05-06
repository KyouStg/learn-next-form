import React from "react";
import {NextResponse} from "next/server";
import { Resend } from 'resend';
import {EmailTemplate} from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error} = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["kit115kat624@gmail.com"],
      subject: "SNS開発相談",
      react: EmailTemplate({
        username: "testUser",
        email: "test@gmail.com",
        content:"フォーム開発のご相談です。"
      }) as React.ReactElement,
    });

    if (error) {
      return  NextResponse.json({error});
    }
    return NextResponse.json({data});

  } catch (error) {
    return NextResponse.json({error});
  }
}
