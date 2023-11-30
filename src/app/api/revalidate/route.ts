import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
    const route = request.nextUrl.searchParams.get('route');
    const tag = request.nextUrl.searchParams.get('tag');
    
    if (tag) {
        revalidateTag(tag);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    }
}