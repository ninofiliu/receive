import { resolve } from "https://deno.land/std@0.224.0/path/resolve.ts";

const port = 8080;
const { address } = Deno.networkInterfaces().find(
  (int) => int.name === "wlo1"
)!;
Deno.serve(
  {
    port,
    hostname: address,
    onListen: async () => {
      const href = `http://${address}:${port}`;
      const cmd = new Deno.Command("qrcode", {
        args: [href],
      });
      const output = await cmd.output();
      console.log(`Listening at ${href}`);
      Deno.stdout.write(output.stdout);
    },
  },
  async (req) => {
    const url = new URL(req.url);
    switch (`${req.method} ${url.pathname}`) {
      case "GET /":
      case "GET /index.html": {
        const page = await Deno.open("./index.html");
        return new Response(page.readable);
      }
      case "POST /upload": {
        if (!req.body)
          return new Response("should post a file", { status: 400 });
        const path = resolve(
          Deno.cwd(),
          `./uploads/${url.searchParams.get("name")}`
        );
        await Deno.writeFile(path, req.body);
        console.log(`received ${path}`);
        const page = await Deno.open("./ok.html");
        return new Response(page.readable);
      }
      default:
        return new Response(`Not found ${req.method} ${url.pathname}`);
    }
  }
);
