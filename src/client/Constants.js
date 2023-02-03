export const authModalContentConstants = {
  LOG_IN: "LOGIN",
  SIGN_UP: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESET_EMAIL_SENT: "RESET_EMAIL_SENT",
};

export const productListSortMenuItems = {
  PRICE_LOW_TO_HIGH: "Price: Low to High",
  PRICE_HIGH_TO_LOW: "Price: High to Low",
  LAST_ADDED: "Last Added",
};

export const addProductFormFields = {
  PRODUCT_NAME: "Product Name",
  PRODUCT_DESCRIPTION: "Product Description",
  CATEGORY: "Category",
  CATEGORIES: {
    ELECTRONICS: "Electronics",
    CLOTHING: "Clothing",
    HOME: "Home",
  },
  PRICE: "Price",
  IN_STOCK_QUANTITY: "In Stock Quantity",
  ADD_IMAGE_LINK: "Add Image Link",
  ADD_PRODUCT: "Add",
  UPDATE_PRODUCT: "Update",
  CANCEL: "Cancel",
  DELETE_PRODUCT: "Delete",
};

export const productObjPlaceholders = [
  {
    _id: "fakeProductId1",
    name: "Meta Quest2 VR headset",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime soluta ipsa debitis necessitatibus odit quis provident iste, consectetur ut consequuntur? In iure excepturi, voluptate dicta minus voluptas autem aperiam?",
    category: "Electronics",
    price: 299,
    quantity: 10,
    image_url:
      "https://i5.walmartimages.com/asr/a3f2ba01-e689-4e38-b062-822d3aeec909.c960f6f5b1d66040c30ac62c61441fde.jpeg",
    createdAt: "1674993807817",
    updatedAt: "1674993807817",
  },
  {
    _id: "fakeProductId2",
    name: "Long Sleeve Jacket",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime soluta ipsa debitis necessitatibus odit quis provident iste, consectetur ut consequuntur? In iure excepturi, voluptate dicta minus voluptas autem aperiam?",
    category: "Clothing",
    price: 25.63,
    quantity: 10,
    image_url:
      "https://i5.walmartimages.com/asr/9a4042e9-7a4c-49dd-8ff9-96379f94b3db_2.df3fc7faa6909311f7f5306763bf312a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    createdAt: "1674993842984",
    updatedAt: "1674993842984",
  },
];

export const AlertTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
  INFO: "info",
};

export const userType = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};
