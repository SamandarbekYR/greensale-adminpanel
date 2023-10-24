
 interface PostViewModel {
    id: number ;
    fullName: string;
    userId: number;
    info:string;
    phoneNumber: string;
    storageName: string;
    categoryId: string;
    description: string;
    addressLatitude:number;
    addressLongitude:number;
    region: string;
    district: string;
    updatedAt: Date ;
    createdAt: Date ;
    status: number;
    userStars:number;
    averageStars : number;
    imagePath: string;
  }
  
  export type {PostViewModel}