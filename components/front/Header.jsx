import React, { Component } from "react";
import { PUBLIC_IMAGES_URL } from "../../constants/commonconstants";
import { withRouter } from 'next/router';
import Link from 'next/link';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className="header">
                    <h1>Betacus</h1>
                </div>
            </>
        );
    }
}
export default withRouter(Header);