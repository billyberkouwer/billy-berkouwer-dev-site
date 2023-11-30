import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    const route = request.nextUrl.searchParams.get('route');
    const tag = request.nextUrl.searchParams.get('tag');
    
    if (tag) {
        revalidateTag(tag);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    }
}