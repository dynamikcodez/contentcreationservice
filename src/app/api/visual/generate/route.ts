import { NextResponse } from 'next/server';
import { GeminiImageProvider } from '@/lib/ai/providers/GeminiImageProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brandDna, creativeConcept, userApiKey, aspectRatio } = body;

    if (!brandDna || !creativeConcept) {
      return NextResponse.json({ success: false, error: 'Missing Brand DNA or Creative Concept' }, { status: 400 });
    }

    const provider = new GeminiImageProvider(userApiKey);
    const result = await provider.generateImage({
      brandDna,
      creativeConcept,
      userApiKey,
      aspectRatio: aspectRatio || '1:1',
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Visual generation failed' }, { status: 500 });
  }
}
