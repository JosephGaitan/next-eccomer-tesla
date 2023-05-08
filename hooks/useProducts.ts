import useSWR, { SWRConfiguration } from 'swr'
import { Iproducts } from '../interfaces'

//const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error, isLoading } = useSWR<Iproducts[]>(`/api/${url}`, config)

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}