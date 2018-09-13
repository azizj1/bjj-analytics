import * as React from 'react';
import { IBjjPromotion, BjjBelt } from '~/bjj/models';
import Lock from '~/bjj/components/Icons/Lock';
import * as styles from './Promotions.scss';
import * as cx from 'classnames';

interface IPromotionsProps {
    promotions: IBjjPromotion[];
}

function TapeAndStripes({promotions, color}: {promotions: IBjjPromotion[]; color: BjjBelt}) {
    const relevantPromotions = promotions.filter(c => c.color === color && c.stripes > 0);
    if (relevantPromotions.length === 0)
        return <Lock />;
    return (
        <div>
            {relevantPromotions.map(p => [
                <div className={styles.duration} key={`${color}-${p.stripes}-1`}>
                    <span>{p.timeItTook}</span>
                    <span>{Math.round(p.hoursItTook)}hrs</span>
                </div>,
                !p.isNextPromotion && <div className={cx(styles.stripe)} key={`${color}-${p.stripes}-2`} />
            ])}
        </div>
    );
}

export default class Promotions extends React.PureComponent<IPromotionsProps> {
    render() {
        const { promotions } = this.props;
        if (promotions.length <= 1)
            return null;

        const currentBelt = promotions[promotions.length - 2].color;
        const isColor = (color: BjjBelt) => currentBelt === color;
        return (
            <div className={styles.root}>
                <div className={cx(styles.white, {[styles.selected]: isColor(BjjBelt.White)})}>
                    <span>White Belt</span>
                    <TapeAndStripes promotions={promotions} color={BjjBelt.White} />
                </div>
                <div className={cx(styles.blue, {[styles.selected]: isColor(BjjBelt.Blue)})}>
                    <span>Blue Belt</span>
                    <TapeAndStripes promotions={promotions} color={BjjBelt.Blue} />
                </div>
                <div className={cx(styles.purple, {[styles.selected]: isColor(BjjBelt.Purple)})}>
                    <span>Purple Belt</span>
                    <TapeAndStripes promotions={promotions} color={BjjBelt.Purple} />
                </div>
                <div className={cx(styles.brown, {[styles.selected]: isColor(BjjBelt.Brown)})}>
                    <span>Brown Belt</span>
                    <TapeAndStripes promotions={promotions} color={BjjBelt.Brown} />
                </div>
                <div className={cx(styles.black, {[styles.selected]: isColor(BjjBelt.Black)})}>
                    <span>Black Belt</span>
                    <TapeAndStripes promotions={promotions} color={BjjBelt.Black} />
                </div>
            </div>
        );
    }
}
