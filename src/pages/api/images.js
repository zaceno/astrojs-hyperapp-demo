export const prerender = false

export async function GET({ request }) {
  const query = new URL(request.url).search
  const remoteImageURL = new URLSearchParams(query).get("i")
  return new Response(await fetch(remoteImageURL).then(x => x.arrayBuffer()), {
    headers: {
      "Cache-Control":
        "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
    },
  })
}
