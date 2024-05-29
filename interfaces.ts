export interface Session {
  id: string;
  username: string;
  email: string;
  role: string;
  image: string;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  image: string;
}

export interface ChangePassword {
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPassword {
  email: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified?: boolean | null;
  role: string;
  password?: string | null;
  image: string;
}

export interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number | null;
  categoryId: string;
  categories: string
  vote: number;
  bestSeller?: boolean | null;
}

export interface FormStateCategory {
  name: string;
  description: string;
}

export interface FormStatePopular {
  name: string;
  description: string;
}

export interface FormStateUser {
  username: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified?: boolean;
};

export interface Course {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number | null;
  vote: number;
  bestSeller?: boolean | null;
  categoryId: string;
  user?: User;
  courseCategory?: Category;
  categories?: string | null;
}

export interface Attachement {
  id: string;
  name: string;
  url: string;
  courseId: string;
  chapterId: string;
  duration: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  courseId: string;
  classes?: number | null;
}

export interface Review {
  rating: number;
  commentary: string;
  image: string;
  courseId: string;
  userId: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryInterface {
  id: string;
  name: string;
  description: string;
}

export interface CourseCategory {
  courseId: string;
  categoryId: string;
  popularTheme: string;
}

export interface CartStore {
  cart: any[];
  addToCart: (course: any) => void;
  removeFromCart: (course: any) => void;
}

export interface StartRatingClick {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export interface StartRating {
  rating: number;
}

export interface CartItemType {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  quantity: number;
  vote: number;
  user?: User;
  courseCategory?: Category;
}

export interface CartType {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
}

export interface ActionTypes {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
}
