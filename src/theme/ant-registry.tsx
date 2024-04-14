// thac mac 2
'use client'

import { PropsWithChildren, useState } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { useServerInsertedHTML } from 'next/navigation'
const StyledComponentsRegistry = ({ children }: PropsWithChildren) => {
    const [cache] = useState(() => createCache())
    useServerInsertedHTML(() => {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `</script${extractStyle(cache)}><script>`,
                }}
            />
        )
    })
    return <StyleProvider cache={cache}>{children} </StyleProvider>
}

export default StyledComponentsRegistry
