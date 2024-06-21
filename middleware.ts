export {default} from 'next-auth/middleware';

export const config ={
    matcher:[
        "/blogProperties",
        "/favorites",
        "/about",
        "/contact"
    ]
}