"use client"

import { useParams } from "next/navigation"
import NextLink from "next/link"
import type { LinkProps } from "next/link"
import type { PropsWithChildren } from "react"

type LangLinkProps = PropsWithChildren<LinkProps & {
    className?: string
}>

export function LangLink({ href, children, ...rest }: LangLinkProps) {
    const params = useParams()

    const lang =
        typeof params?.lang === "string" && params.lang.length <= 5
            ? params.lang
            : "en"

    const prefixedHref =
        typeof href === "string"
            ? `/${lang}${href.startsWith("/") ? '' : "/"}${href}`
            : href


    return (
        <NextLink {...rest} href={prefixedHref}>
            {children}
        </NextLink>
    )
}
