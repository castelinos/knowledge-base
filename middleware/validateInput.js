import { createBookSchema, updateBookSchema } from "../data/schema.js";

export default async function validateInput( req, res, next ){

    let url = req.baseUrl;
    if( req.route.path && req.route.path !== '/'){
        url = url.concat(req.route.path);
    }

    if( req.method === 'GET' || req.method !== 'post' ) return next();

    try {
        switch(url){
            case '/books':
                res.body = await createBookSchema.validateAsync(req.body);
            break;
            case '/books/:id':
                if( req.method === 'PATCH' ){
                    res.body = await updateBookSchema.validateAsync(req.body);
                } 
        }

        return next();
        
    } catch (error) {
        res.status(422).send({message:error.message});
    }

}
