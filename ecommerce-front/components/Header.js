import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`;
const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;

`;

export default function Header(){
    const {cartProducts} = useContext(CartContext);
    return(
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>
                    <StyledNav>
                        <NavLink href={''}>Home</NavLink>
                        <NavLink href={'products'}>All products</NavLink>
                        <NavLink href={'categories'}>Categories</NavLink>
                        <NavLink href={'account'}>Account</NavLink>
                        <NavLink href={'cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}