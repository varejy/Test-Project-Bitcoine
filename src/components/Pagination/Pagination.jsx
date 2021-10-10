import React, { Component } from 'react';

import classNames from 'classnames';
import pagination from './utils/pagination';

import styles from './Pagination.module.css';

const DELIMITER = '...';

class Pagination extends Component {
    handlePaginationClick = i => () => {
        this.props.onChange(i);
    };

    render () {
        const { points, activePoint } = this.props;
        const PAGINATION = pagination(activePoint, points);

        return <div className={styles.pagination}>
            {
                PAGINATION.map((slideNumber, i) => {
                    const isDelimiter = slideNumber === DELIMITER;

                    return <div
                        className={classNames(styles.paginationNumber, {
                            [styles.paginationNumberActive]: !isDelimiter && (slideNumber - 1) === activePoint,
                            [styles.paginationNumberDelimiter]: isDelimiter
                        })}
                        key={i}
                        onClick={!isDelimiter ? this.handlePaginationClick(slideNumber - 1) : undefined}
                    >
                        {isDelimiter ? <div className={styles.delimiter}>
                            <div className={styles.delimiterPoint}>.</div>
                            <div className={styles.delimiterPoint}>.</div>
                        </div> : slideNumber}
                    </div>;
                })
            }
        </div>;
    }
}

export default Pagination;
