import { NextResponse } from 'next/server';
import { IntakeBriefSchema } from '@/lib/validation/schemas';
import { generateBrandDNA } from '@/lib/ai/brandEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = IntakeBriefSchema.parse(body);
    const brandDna = await generateBrandDNA(validated);
    return NextResponse.json({ success: true, brandDna });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Invalid brief data' }, { status: 400 });
  }
}
