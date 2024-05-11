const { address } = Deno.networkInterfaces().find(
  (int) => int.name === "wlo1"
)!;
Deno.serve({ port: 8080, hostname: address }, async (req) => {
  const url = new URL(req.url);
  switch (`${req.method} ${url.pathname}`) {
    case "GET /":
    case "GET /index.html": {
      const page = await Deno.open("./index.html");
      return new Response(page.readable);
    }
    case "POST /upload": {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      await Deno.writeFile(`./uploads/${file.name}`, file.stream());
      const page = await Deno.open("./ok.html");
      return new Response(page.readable);
    }
    default:
      return new Response(`Not found ${req.method} ${url.pathname}`);
  }
});
