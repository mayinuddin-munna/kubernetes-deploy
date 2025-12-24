import { Router } from 'express';
import { UsersRoutes } from '../modules/user/user.route';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ShippingRoutes } from '../modules/shipping/shipping.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { SellerStoreRoutes } from '../modules/sellerStore/sellerStore.route';
import { PostRoutes } from '../modules/post/post.route';
import { ManufacturerStoreRoutes } from '../modules/manufacturer/manufacturer.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UsersRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/shipping-address',
    route: ShippingRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/seller-store',
    route: SellerStoreRoutes,
  },
  {
    path: '/manufacturer-store',
    route: ManufacturerStoreRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
