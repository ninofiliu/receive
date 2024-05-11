const { address } = Deno.networkInterfaces().find(
  (int) => int.name === "wlo1"
)!;
Deno.serve({ port: 8080, hostname: address }, async (req) => {
  const url = new URL(req.url);
  switch (`${req.method} ${url.pathname}`) {
    case "GET /":
    case "GET /index.html": {
      const file = await Deno.open("./index.html");
      return new Response(file.readable);
    }
    default:
      return new Response(`Not found ${req.method} ${url.pathname}`);
  }
});
