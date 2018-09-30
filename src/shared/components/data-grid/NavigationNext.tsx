import * as React from 'react';
import './ShowMore.scss';

export default function NavigationNext({size}: {size: string}) {
    return (
        <svg
            className='sicon'
            viewBox='0 0 24 24'
            preserveAspectRatio='xMinYMin meet'
            version='1.1'
            width={size}
            height={size}>
                <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
        </svg>
    );
}
