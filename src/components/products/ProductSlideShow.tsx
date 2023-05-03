import { FC } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideShow.module.css'
import Image from 'next/image';

interface Props {
    images: string[],
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
    return (
        <Slide
            easing='linear'
            duration={7000}
            indicators
        >
            {
                images.map(image => (
                    <div key={image} className={styles.eachSlide}>
                        <Image src={`/products/${image}`} alt={image}
                            width={650}
                            height={650}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                    </div>
                ))
            }
        </Slide>
    )
}


