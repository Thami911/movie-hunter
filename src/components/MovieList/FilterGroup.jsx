import React from 'react';

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
    return (
        <ul className="align-center movie-filter">
            {ratings.map((rate) => (
                <li
                    className={minRating === rate ? "movie-filter-item active" : "movie-filter-item"}
                    key={rate}
                    onClick={() => onRatingClick(rate)}
                >
                    {rate}+ Star
                </li>
            ))}
        </ul>
    );
};

export default FilterGroup;