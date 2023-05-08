import { ShopLayout } from "@/components/layout";
import { Typography } from "@mui/material";
import type { NextPage } from "next";

import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "../../../hooks/useProducts";



const MenPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=men')

  return (
    <ShopLayout
      title={"Teslo - Men"}
      pageDescription={"Encuentra los mejores precios en la tienda de tesla"}
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ellos
      </Typography>

      {
        isLoading ? <FullScreenLoading/> : <ProductList products={products} />
      }

    </ShopLayout >
  );
};

export default MenPage;
