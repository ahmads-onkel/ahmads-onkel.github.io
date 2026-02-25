export default {
  async fetch(request) {
    const url = new URL(request.url);
    const username = url.searchParams.get("user");

    if (!username) {
      return new Response("missing user", { status: 400 });
    }

    try {
      const res = await fetch(`https://guns.lol/api/view/${username}`, {
        method: "POST",
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-length": "0",
          "origin": "https://guns.lol",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "referer": `https://guns.lol/${username}`,
          "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          "username": username
        }
      });
      return new Response(JSON.stringify({ status: res.status }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ status: 500, error: e.message }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}
