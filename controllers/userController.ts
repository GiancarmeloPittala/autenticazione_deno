import { Context, Response } from "https://deno.land/x/oak/mod.ts";
import { User } from '../models/user.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";

const key = Deno.env.get('TOKEN_SECRET') || " Falsekey ";

function errorState(mess : string, res : Response){
  res.status = 403;
  res.body = JSON.stringify({ msg : mess })
  return;
}


const userController = {
  login: async ( ctx : Context ) => {
    const { request : req, response : res}  = ctx;
    const { value : { email, pass } } = await req.body();

    if(!email || !pass){
      return errorState('email e pass obbligatori', ctx.response);
    }

    try {
      const user = await User.where({email : email}).all();

      if(user.length == 0) throw "Account inesistente";

      if( ! await bcrypt.compare(pass, user[0].pass ) ) 
        throw "password errata"
      
      const payload: Payload = {
        iss: JSON.stringify({id: user[0].id}),
        exp: setExpiration(new Date().getTime() + 1000 * 60 * 60 ),
      };
      const header: Jose = {
        alg: "HS256",
        typ: "JWT",
      };

      const token = makeJwt({ header, payload, key })
      
      res.body = JSON.stringify({ msg : "Login effettuato correttamente" , token})

    } catch (error) {
      return errorState(error, ctx.response);
    }

  },
  register : async (ctx : Context) => {
    if(!ctx.request.hasBody) return errorState('nessun body rilevato', ctx.response);
    const { value : { email, pass }} = await ctx.request.body();

    if(!email || !pass){
      return errorState('email e pass obbligatori', ctx.response);
    }
    
    try {
      const existsEmail = await User.where({ email : email}).all();
      if(existsEmail.length > 0) throw "email esistente";
    
      const passHash = await bcrypt.hash(pass);

      await User.create({ email, pass: passHash })

    } catch (error) {
      return errorState(error, ctx.response);
    }


    ctx.response.body = "ok"
  },

  me : async (ctx : Context) => {
    const authorization = await ctx.request.headers.get('Authorization');

    try {
      if(!authorization) throw "Authorization mancante"
      
      const token = authorization.split(" ")[1];
      const jwt = await validateJwt(token, key);
      

      if( !jwt.isValid )
        throw "token non valido"

      const payload = jwt.payload;
      let id = payload?.iss || "{}";
      id = JSON.parse(id).id;

      const user = await User.select("id","name","email","created_at","updated_at").find(id);
 

      ctx.response.status = 203,
      ctx.response.body = JSON.stringify({user})
    } catch (error) {
      console.log(error)
      return errorState(error, ctx.response);
    }

  }  
}

export default userController