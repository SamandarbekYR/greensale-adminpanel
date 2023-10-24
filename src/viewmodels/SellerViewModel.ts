export class SellerAnnouncementViewModel{
    id:number = 0;
    fullName: string = "";
    userPhoneNumber: string = "";
    postPhoneNumber: string="";
    categoryId: number = 0;
    title: string = "";
    description: string = "";
    price: number = 0;
    capacity: number = 0;
    capacityMeasure: string = "";
    type: string = "";
    region:string = "";
    district: string = "";
    address: string = "";
    status: number = 0;
    averageStars : number=0;
    userStars:number=0;
    createdAt: Date=new Date();
    updatedAt: Date=new Date();
    mainImage: string = "";
}
