import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      whatsapp,
      role,
      experience_level,
      goal_text,
      content_answer,
      company,
      commit_confirmed,
    } = body;

    // Basic validation
    if (
      !name ||
      !whatsapp ||
      !role ||
      !experience_level ||
      !goal_text ||
      !content_answer ||
      !commit_confirmed
    ) {
      return Response.json(
        { error: 'Please fill in all required fields and confirm you can attend.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('masterclass_applications')
      .insert([
        {
          name,
          whatsapp,
          role,
          experience_level,
          goal_text,
          content_answer,
          company: company || null,
          commit_confirmed,
          batch: 1,
          status: 'pending',
          source: 'aimasterclass',
        },
      ])

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Application failed. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'Application received' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Masterclass API error:', err);
    return Response.json(
      { error: 'Invalid request', details: err instanceof Error ? err.message : String(err) },
      { status: 400 }
    );
  }
}
