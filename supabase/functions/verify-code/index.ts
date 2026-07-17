import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  const { email, code } = await req.json()
  if (!email || !code) {
    return new Response(JSON.stringify({ error: 'Email and code are required' }), { status: 400 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data, error } = await supabase
    .from('verification_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .gte('expires_at', new Date().toISOString())
    .single()

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Invalid or expired code' }), { status: 400 })
  }

  await supabase.from('verification_codes').delete().eq('email', email)

  const { data: { users } } = await supabase.auth.admin.listUsers()
  const user = users?.find(u => u.email === email)
  if (user) {
    await supabase.auth.admin.updateUserById(user.id, { email_confirm: true })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
})
