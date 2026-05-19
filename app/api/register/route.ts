import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, source } = body;

    // Basic validation
    if (!name || !email) {
      return Response.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('workshop_registrations')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          company: company || null,
          source: source || 'workshop',
          registered_at: new Date().toISOString(),
        },
      ])


    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return Response.json(
          { error: 'This email is already registered' },
          { status: 409 }
        );
      }
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Registration failed. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
