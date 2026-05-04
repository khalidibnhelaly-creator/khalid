import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message,
          submitted_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Submission failed. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'Message sent successfully', data },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
