import React from 'react';
import styles from './DaysToSummer.scss';
import PropTypes from 'prop-types';

class DaysToSummer extends React.Component {

      static propTypes = {
        title: PropTypes.string,
        promoDescription: PropTypes.node,
      }

      getTimeToNextSummer(){
        const currentTime = new Date();
        const summerStart = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 21));
        const summerEnd = new Date(Date.UTC(currentTime.getUTCFullYear(), 8, 23));
        let daysToSummer;
        if(summerStart <= currentTime && summerEnd >= currentTime){
          return 'ENJOY YOUR SUMMER';
        } else if(currentTime > summerEnd){
          const nextYear = currentTime.getUTCFullYear() + 1;
          const nextSummer = new Date(nextYear, 5, 21);
          daysToSummer = Math.floor((nextSummer.getTime() - currentTime.getTime()) / (1000*3600*24)) + ' days to summer';
          return daysToSummer;
        }  else if (currentTime < summerStart) {
          const oneDayLeft = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 20));
          if (currentTime.getTime() === oneDayLeft.getTime()) {
            daysToSummer = '1 day to summer';
          } else {
            daysToSummer = Math.floor((summerStart.getTime() - currentTime.getTime()) / (1000*60*60*24)) + ' days to summer';
          }
        }
        return daysToSummer;
      }

      render() {
        const {promoDescription = (this.getTimeToNextSummer())} = this.props;
        return(
          <div className={styles.component}>
            <h3 className={styles.promoDescription}>{promoDescription}</h3>
          </div>
        );
      }
}

export default DaysToSummer;