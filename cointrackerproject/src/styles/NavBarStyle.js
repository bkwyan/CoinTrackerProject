import styled from 'styled-components';
import { Link } from 'react-router-dom';
//const { fontSizes, colors} = theme;

export const Nav = styled.nav`
    font-family: 'Lato';
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    position: sticky;
    top: 0;
    z-index: 999;
`

export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-around;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLinks = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`