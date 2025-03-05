export async function GET(request, { params }) {
  const { id } = await params;
  return new Response(JSON.stringify(id), { status: 200 });
}
