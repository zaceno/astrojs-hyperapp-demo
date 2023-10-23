export const prerender = false

export async function GET({ request }) {
  const p = new URLSearchParams(request.url)
  const response = await fetch(p.get("i"))
  return new Response(await response.arrayBuffer())
}
