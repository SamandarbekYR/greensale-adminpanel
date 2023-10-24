export class CategoryDto{
    id:Number;
    name:String;
    createdAt:Date;
    updatedAt:Date;

    constructor() {
        this.id=0;
        this.name="";
        this.createdAt=new Date();
        this.updatedAt=new Date();
    }
}