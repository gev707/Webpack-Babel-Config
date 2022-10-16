export class Post {
    constructor(title,id) {
        this.title = title;
        this.date = new Date();
    }
    toString() {
        return JSON.stringify({
            title:this.title,
            date:this.date
        },null,2)
    }
    get getUpperCase(){
        return this.title.toUpperCase();
    }
}
