import React from 'react';
import {Link} from "react-router-dom";

const SwapLinkPanel = ({linksSwipe,locationPath}) => {
    console.log(linksSwipe)
    return (
        <div style={{marginBottom: 170}}>
            <nav className={'container-fluid mt-5'}>
                <div className="nav nav-tabs">
                    {linksSwipe.map((link, index) => (
                        <Link
                            key={index}
                            className={`${link.className} ${locationPath === link.to ? 'active' : ''}`}
                            to={link.to}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default SwapLinkPanel;