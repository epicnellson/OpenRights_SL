const ProfileManager = {
  _client: () => window._supabase,

  async fetch() {
    const supabase = this._client();
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error && error.code !== 'PGRST116') console.error('Profile fetch error:', error);
    return data || null;
  },

  async save(profile) {
    const supabase = this._client();
    if (!supabase) throw new Error('Supabase not connected');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const payload = {
      id: user.id,
      email: profile.email || user.email,
      full_name: profile.fullName || profile.full_name,
      organisation: profile.organisation || null,
      location: profile.country || profile.location || 'Sierra Leone',
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async clear() {
    const supabase = this._client();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: null,
        organisation: null,
        location: 'Sierra Leone',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    if (error) console.error('Profile clear error:', error);
  }
};
