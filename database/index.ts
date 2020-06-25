import { db } from  './connect.ts'
import { User } from '../models/index.ts'

const connect = async () => {
  
 db.link([User]);
 await db.sync({ drop : false })
}

export { connect } 
