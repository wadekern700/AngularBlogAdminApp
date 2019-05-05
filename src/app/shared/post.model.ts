export class Posts {

    constructor(public id: number, public title: string, public category: string, public date: string, public img: string, public blogPost: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.date = date;
        this.blogPost = blogPost;
        this.img = img;
    }
}