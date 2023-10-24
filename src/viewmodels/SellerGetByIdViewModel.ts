// PostViewModel.ts

interface Image {
    sellerPostId: number;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date ;
    id: number;
  }
  
 interface PostViewModel {
    id: number ;
    fullName: string;
    userId: number;
    userPhoneNumber: string;
    postPhoneNumber: string;
    userRegion: string;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    capacity: number;
    capacityMeasure: string;
    type: string;
    region: string;
    district: string;
    updatedAt: Date ;
    createdAt: Date ;
    status: number;
    userStars:number;
    averageStars : number;
    postImages: Image[];
    mainImage: string;
  }
  
  export type {PostViewModel}
  