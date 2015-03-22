import React from 'react';
import { Link } from 'react-router';
import Instagram from './../components/Instagram.jsx';

export default class InstagramHandler extends React.Component {

  render() {
    return <div className="content">
      <section>
        <ul className="menu without-search">
          <li className="item">
           <Link to="instagram" activeClassName="active">
            <i className="fap fap-instagram"></i>
            <div className="text">Photos</div>
           </Link>
          </li>
        </ul>

        <Instagram userid="54715992" clientid="4c91ac279d3f4625a07fe93ae8236742"/>

      </section>
    </div>;
  }

}
