export const mainCategories = [
  'Nike',
  'Adidas',
  'Jordan',
  'Puma',
  'Rebook',
  'Asics',
];
export const subCategories = ['Featured', 'Rising', 'New'];

export type Product = {
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  bgColor?: string;
  promotion?: string;
};

const nikeFeaturedProducts: Product[] = [
  {
    brand: 'NIKE',
    name: 'ZOOMX VAPORFLY',
    price: '$130.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/228c9922-686e-443d-b04b-16857e9af198/zoomx-vaporfly-next-2-racing-shoe-dxSLFw.png',
    bgColor: '#3fe0d0',
  },
  {
    brand: 'NIKE',
    name: 'SB ZOOM BLAZER',
    price: '$210.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/d7cb11e8-7f41-4a58-b846-c1dca4e935f8/sb-zoom-blazer-mid-edge-skate-shoe-Gg1p1L.png',
    bgColor: '#f9b208',
  },
  {
    brand: 'NIKE',
    name: 'INFINITY FLYKNIT 2',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/767b0f87-f47a-4c9b-bb74-6e875e6c5887/react-infinity-run-flyknit-2-running-shoe-hD0Cd2.png',
    bgColor: '#867ae9',
  },
  {
    brand: 'NIKE',
    name: 'AIR-270',
    price: '$159.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/awjogtdnqxniqqk0wpgf/air-max-270-shoe-nnTrqDGR.png',
    bgColor: '#999999',
  },
  {
    brand: 'NIKE',
    name: 'WILDHORSE 7',
    price: '$168.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/0b64a85e-ea97-4b8c-8d0b-cb78932937c0/wildhorse-7-trail-running-shoe-Cx4rCx.png',
    bgColor: '#60654a',
  },
  {
    brand: 'NIKE',
    name: 'AIR ZOOM TERRA',
    price: '$210.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/f638800c-47a4-43ea-bd6b-89b2cf5838cd/air-zoom-terra-kiger-7-trail-running-shoe-8960WB.png',
    bgColor: '#4d4d4d',
  },
];

const nikeTrendingProducts = [
  {
    brand: 'NIKE',
    name: 'AIRMAX 2090',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/da82111e-17e3-4335-88c3-2cc1be3bac7e/air-max-2090-shoe-NGbdqr.png',
    promotion: '20% off',
  },
  {
    brand: 'NIKE',
    name: 'AIR ZOOM REP 2',
    price: '$135.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/01b33da3-d1d0-44e9-b03d-df173f4711e0/air-zoom-superrep-2-hiit-class-shoe-hQxXZ4.png',
    promotion: 'Featured',
  },
  {
    brand: 'NIKE',
    name: 'METCON 6',
    price: '$120.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/e626823a-0999-485c-9243-f43c6d667311/metcon-6-training-shoe-jHPqks.png',
    promotion: 'New',
  },
  {
    brand: 'NIKE',
    name: 'BLAZER MID 77',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/ba95aa69-93ff-47d3-97b9-926e3c92b568/blazer-mid-77-shoe-jg7NGq.png',
    promotion: 'New',
  },
  {
    brand: 'NIKE',
    name: 'AIR MAX 95 ESSENTIAL',
    price: '$200.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/f91719bd-105b-4b9f-badc-f569eb80d6a0/air-max-95-essential-shoe-18JXCv.png',
    promotion: 'New',
  },
];

const nikeMoreProducts = nikeTrendingProducts.slice().reverse();
const nikeNewProducuts = nikeFeaturedProducts.slice().reverse();
const nikeNearingProducts = nikeNewProducuts.slice(1, 5);

export type HomeData = {
  featured: Product[];
  nearing: Product[];
  new: Product[];
  trending: Product[];
  more: Product[];
};

export const initialHomePage: HomeData = {
  featured: [],
  nearing: [],
  new: [],
  trending: [],
  more: [],
};

export const nikeHomePage: HomeData = {
  featured: nikeFeaturedProducts ?? [],
  nearing: nikeNearingProducts ?? [],
  new: nikeNewProducuts ?? [],
  trending: nikeTrendingProducts ?? [],
  more: nikeMoreProducts ?? [],
};
