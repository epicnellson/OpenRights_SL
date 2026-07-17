import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const { email } = await req.json()
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { error: dbError } = await supabase.from('verification_codes').upsert(
    { email, code, expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() },
    { onConflict: 'email' }
  )
  if (dbError) {
    console.error('DB upsert error:', dbError)
    return new Response(JSON.stringify({ error: 'Failed to store code' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'OpenRights SL <noreply@openrightssl.org>',
      to: email,
      subject: 'Your verification code for OpenRights SL',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2 style="color: #7c3aed;">OpenRights SL</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #7c3aed; padding: 16px; background: #f5f5f5; border-radius: 8px; text-align: center;">${code}</div>
          <p style="color: #666; margin-top: 16px;">This code expires in 10 minutes.</p>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">If you did not create an account, ignore this email.</p>
        </div>
      `,
    })
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('Resend error:', errText)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
