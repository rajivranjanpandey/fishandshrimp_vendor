import { logoutAction } from '@/app/lib/auth/action';
import { NextResponse } from 'next/server';

export async function GET() {
    logoutAction();
}