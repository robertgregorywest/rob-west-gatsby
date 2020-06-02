import React from 'react'
import { Link } from 'gatsby'
import * as _ from 'lodash'
import './style.scss'

class Header extends React.Component {
    render() {

        return (
            <header className="header">
                <Link className="header__title-link" to="/">
                    <h1 className="header__title">Rob West</h1>
                </Link>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-list-item">
                            <Link className="header__nav-item-link" to="/about">About</Link>
                        </li>
                        <li className="header__nav-list-item">
                            <Link className="header__nav-item-link" to="/articles">Journal</Link>
                        </li>
                        <li className="header__nav-list-item">
                            <Link className="header__nav-item-link" to="/philosophy">Philosophy</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header