import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  const googleAuthUrl = `https://byqfgcjsgjgvwrncaxvl.supabase.co/auth/v1/callback`;
  return NextResponse.redirect(googleAuthUrl);
}
