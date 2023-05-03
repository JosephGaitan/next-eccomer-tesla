import { FC } from "react"
import {  ISize } from "../../../interfaces"
import { Box, Button } from "@mui/material";

interface Props{
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                color={selectedSize === size ? 'primary' : 'info'}
                size={'small'} key={size} >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}


