import React from "react";
import './Header.css'
import { NavLink} from "react-router-dom";





const HeaderShop = () => {

    return (
        <>
        <div className="header">
            <h1 className='heading'>Изысканные Украшения</h1>
                    <div className="logo" >
                        <img src={'https://static.tildacdn.com/tild6431-3661-4430-b735-353863373435/11.svg'}  />
                    </div>
            <h1 className='heading'>Истинных Любителей Блеска</h1>

        </div>
            <div className='content-divider'></div>
            <div>
                <nav style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', padding: 0, }}>
                        <li style={{ margin: '0 10px'}}>
                            <NavLink style={{textDecoration: 'none',color: 'inherit', borderBottom: '2px solid transparent'}} activeStyle={{ borderBottom: '2px solid  black'}}  to="/home">ГЛАВНАЯ</NavLink>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <NavLink style={{textDecoration: 'none',color: 'inherit', borderBottom: '2px solid transparent'}} activeStyle={{ borderBottom: '2px solid black'}} to="/content">ЮВЕЛИРНЫЕ ИЗДЕЛИЯ</NavLink>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <NavLink style={{textDecoration: 'none',color: 'inherit', borderBottom: '2px solid transparent'}} activeStyle={{ borderBottom: '2px solid  black'}} to="/new">НОВИНКИ</NavLink>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <NavLink style={{textDecoration: 'none',color: 'inherit', borderBottom: '2px solid transparent'}} activeStyle={{ borderBottom: '2px solid  black'}} to="/about">О НАС</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )

//



}


export default HeaderShop;