import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_ccs_ultra_mock';
    const bodyText = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Paystack HMAC SHA512 signature verification
    if (signature) {
      const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');
      if (hash !== signature && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Invalid Paystack signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(bodyText);

    if (event.event === 'charge.success') {
      const { customer, plan } = event.data;
      console.log(`[Paystack Webhook] Subscription charge successful for customer ${customer?.email}, Plan: ${plan?.name}`);
      // Server-side subscription activation
    }

    return NextResponse.json({ status: 'success' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
