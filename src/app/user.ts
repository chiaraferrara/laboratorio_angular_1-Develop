
export class User {
    uid: string;
    username: string;    
    email:string;
    favorites: string[];
    avatar: string;


    constructor(uid:string, username: string, email:string, favorites: string[], avatar:string){
        this.uid = uid;
        this.username = username;        
        this.email = email;
        this.favorites = favorites;
        this.avatar = avatar;
    }
}
