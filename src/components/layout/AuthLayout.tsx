import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"

interface Props {
    title: string
    children: React.ReactNode
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Box alignItems={'center'} height={'calc(100vh - 10px)'} display={'flex'} justifyContent={'center'}>
                    {children}
                </Box>
            </main>
        </>
    )
}

