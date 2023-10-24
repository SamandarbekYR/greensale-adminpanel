// PostViewModel.ts

interface buyerPostsImages {
    buyerpostId: number;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date ;
    id: number;
  }
  
 interface BuyerGetByIdPostViewModel {
    id: number ;
    fullName: string;
    userId: number;
    userPhoneNumber: string;
    postPhoneNumber: string;
 //   userRegion: string;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    capacity: number;
    capacityMeasure: string;
    type: string;
    region: string;
    district: string;
    status: number;
    averageStars : number;
    userStars:number;
    updatedAt: Date ;
    createdAt: Date ;
    buyerPostsImages: buyerPostsImages[];
    mainImage: string;
  }
  
  export type {BuyerGetByIdPostViewModel}
  