import Link from 'next/link'
import React from 'react'
import styled from "styled-components"

const Div = styled.div`
    padding: 2rem 4rem;
`

const Header = () => {
    return (
        <Div>
            <Link href={"/"}>Index</Link>
            <Link href={"/home"}>Home</Link>
            <Link href={"/about"}>About</Link>
        </Div>
    )
}

export default Header