import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';
import {formatTime} from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  constructor(){
    super();
    setInterval(() => this.forceUpdate(), 1000);
  }

      static propTypes = {
        title: PropTypes.string,
        promoDescription: PropTypes.node,
      }

      state = {
        promoDescription: 'It is your time! Take advantage of Happy Hour! All offers 20% off!',
        happyHour: 'Happy Hour',
      }

      

      getCountdownTime(){
        const currentTime = new Date();
        const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
        if(currentTime.getUTCHours() >= 12){
          nextNoon.setUTCDate(currentTime.getUTCDate()+1);
        }      
        return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
      }

      render() {
        const {title = this.state.happyHour,
          promoDescription = (this.getCountdownTime() / 3600) >= 23
            ? 
            this.state.promoDescription 
            : 
            formatTime(this.getCountdownTime())} = this.props;
        return(
          <div className={styles.component}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.promoDescription}>{promoDescription}</div>
          </div>
        );
      }
}

export default HappyHourAd;