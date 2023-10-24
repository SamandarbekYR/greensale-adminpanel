 interface StorageViewModel{
    id:number;
    userId:number ;
    fullName:string ; 
    capacityMeasure:string;
    capacity:string;
    phoneNumber:string ;
    storageName:string ;
    description:string;
    region:string;
    district:string;
    address:string;
    addressLatitude:number;
    addressLongitude:number;
    info:string ;
    averageStars:number ;
    userStars:number;
    imagePath:string ;
    createdAt: Date  ;
    updatedAt: Date ;
}
  
 interface GetSearchStorageViewModel
{
    iteamCount:number;
    item2: StorageViewModel[] ;
}

export type {GetSearchStorageViewModel}