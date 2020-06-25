import { Context, Response } from "https://deno.land/x/oak/mod.ts";

function errorState(mess : string, res : Response){
  res.status = 403;
  res.body = JSON.stringify({ msg : mess })
  return;
}


const userController = {
  login: async ( ctx : Context ) => {
    const { request : req, response : res}  = ctx
     res.body = "ok"
  },
  register : async (ctx : Context) => {
    if(!ctx.request.hasBody) return errorState('nessun body rilevato', ctx.response);
    const { value : { email, pass }} = await ctx.request.body();

    if(!email || !pass){
      return errorState('email e pass obbligatori', ctx.response);
    }

    

    ctx.response.body = "ok"
  } 
}

export default userController