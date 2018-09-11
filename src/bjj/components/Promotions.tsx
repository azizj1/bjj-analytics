import * as React from 'react';
import { IBjjPromotion } from '~/bjj/models';
import * as styles from './Promotions.scss';
import Lock from '~/bjj/components/Icons/Lock';

interface IPromotionsProps {
    promotions: IBjjPromotion[];
}
export default function Promotions({}: IPromotionsProps) {
    return (
        <div className={styles.root}>
            <div className={styles.white}>Test</div>
            <div className={styles.blue}><Lock /></div>
            <div className={styles.purple}><Lock /></div>
            <div className={styles.brown}><Lock /></div>
            <div className={styles.black}><Lock /></div>
        </div>
    );
}
