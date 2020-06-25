import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routers/index.ts";

const { PORT } = Deno.env.toObject();
const app = new Application();

app.use( async ( ctx, next ) => {
  await(next());
  console.log(`${ctx.request.method} ${ctx.request.url}`)
})



app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: parseInt(PORT) || 8000 });