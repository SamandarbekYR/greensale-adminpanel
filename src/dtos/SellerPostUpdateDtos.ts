export  class SellerPostUpdate{
    title:string;
    postPhoneNumber: string;
    description:string;
    price:string;
    capacity:number;
    capacityMeasure:String;
    type:string;
    region:string;
    district:string;
    status:number
    constructor() {
        this.title="";
        this.postPhoneNumber="";
        this.description="";
        this.price="";
        this.capacity=0;
        this.type="";
        this.region="";
        this.district="";
        this.capacityMeasure="";
        this.status=0;
    }
}