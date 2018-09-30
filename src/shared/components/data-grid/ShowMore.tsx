import * as React from 'react';
import './ShowMore.scss';

export default function ShowMore({size}: {size: string}) {
    return (
        <svg
            className='sicon'
            viewBox='0 0 24 24'
            preserveAspectRatio='xMinYMin meet'
            version='1.1'
            width={size}
            height={size}>
                <path d='M10,17L15,12L10,7V17Z' />
        </svg>
    );
}
