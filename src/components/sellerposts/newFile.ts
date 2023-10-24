import axios from '../../plugins/axios';
import { defineComponent } from 'vue';
import { formatDate } from '../../helpers/DataHelper';
import type { PostViewModel } from '../../viewmodels/SellerGetByIdViewModel';

export default defineComponent({
components: {},
data() {
return {
baseURL: '' as String,
createdAtString: '' as String,
updatedAtString: '' as String,
imageFullPath: '' as string,
statusstring: '' as string,
status_zero: false as boolean,
status_one: false as boolean,
status_two: false as boolean,
star_one: false as boolean,
star_two: false as boolean,
star_three: false as boolean,
star_fo: false as boolean,
star_five: false as boolean,
postList: {} as PostViewModel,
AvarageStar: 0 as Number
};
},
props: {
id: Number,
fullName: String,
userPhoneNumber: String,
postPhoneNumber: String,
categoryName: String,
title: String,
description: String,
price: Number,
capacity: Number,
capacityMeasure: String,
type: String,
region: String,
district: String,
address: String,
status: Number,
averageStars: Number,
userStars: Number,
createdAt: Date,
updatedAt: Date,
mainImage: String,
},
methods: {
load() {
this.baseURL = axios.defaults.baseURL!;
this.imageFullPath = this.baseURL + '/' + this.mainImage;
this.createdAtString = formatDate(this.createdAt!);
this.updatedAtString = formatDate(this.updatedAt!);
this.AvarageStar = this.averageStars;
if (this.status === 0) {
this.status_zero = true;
} else if (this.status == 1) {
this.status_one = true;
} else if ((this.status = 2)) {
this.status_two = true;
}
console.log(this.averageStars);
if (this.userStars === 0) {
this.star_one = false;
this.star_two = false;
this.star_three = false;
this.star_fo = false;
this.star_five = false;
}
else if (this.userStars == 1) {
this.star_one = true;
this.star_two = false;
this.star_three = false;
this.star_fo = false;
this.star_five = false;
}
else if (this.userStars == 2) {
this.star_one = true;
this.star_two = true;
this.star_three = false;
this.star_fo = false;
this.star_five = false;
}
else if (this.userStars == 3) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = false;
this.star_five = false;
}
else if (this.userStars == 4) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = true;
this.star_five = false;
}
else if (this.userStars == 5) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = true;
this.star_five = true;
}


},
exit() {
localStorage.setItem('sellerById', this.id?.toString() || '');
this.$router.push('sellerinformation');
},
async stars(stars_number) {
const formData = new FormData();
formData.append("PostId", this.id);
formData.append("Stars", stars_number);
console.log(this.id);
const responsetwo = await axios.post("/api/admin/seller/post/star", formData);

var response = await axios.get<PostViewModel>('/api/common/seller/post/' + this.id);
this.postList = response.data || {};
console.log(this.postlist.status);
if (stars_number == 1) {
this.star_one = true;
this.star_two = false;
this.star_three = false;
this.star_fo = false;
this.star_five = false;
this.averageStars = parseInt(this.postlist.averageStars);
}
else if (stars_number == 2) {
this.star_one = true;
this.star_two = true;
this.star_three = false;
this.star_fo = false;
this.star_five = false;
this.averageStars = parseInt(this.postlist.averageStars);
}
else if (stars_number == 3) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = false;
this.star_five = false;
this.averageStars = this.postlist.averageStars;
}
else if (stars_number == 4) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = true;
this.star_five = false;
this.averageStars = this.postlist.averageStars;
}
else if (stars_number == 5) {
this.star_one = true;
this.star_two = true;
this.star_three = true;
this.star_fo = true;
this.star_five = true;
this.averageStars = this.postlist.averageStars;
}


}
},
mounted() {
this.load();
}
});
