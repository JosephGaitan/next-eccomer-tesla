import { ShopLayout } from "@/components/layout";
import { Typography } from "@mui/material";
import type { NextPage } from "next";

import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "../../../hooks/useProducts";



const WomenPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=women')

  return (
    <ShopLayout
      title={"Teslo - Women"}
      pageDescription={"Encuentra los mejores precios en la tienda de tesla para ellas"}
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ellas
      </Typography>

      {
        isLoading ? <FullScreenLoading/> : <ProductList products={products} />
      }

    </ShopLayout >
  );
};

export default WomenPage;
