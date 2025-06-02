import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import './MovieList.css'
import MovieCards from './MovieCards'
import FilterGroup from './FilterGroup'

const MovieList = ({type, title, emoji}) => {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState({
        by: "default",
        order: "asc"
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (sort.by !== "default") {
            const sortedMovies = _.orderBy(filteredMovies, [sort.by], [sort.order])
            setFilteredMovies(sortedMovies);
        }
    }, [sort, filteredMovies])

    const fetchMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=c35b01d9205a768c62e71a47e0981794`)
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
        console.log(data)
    }

    const handleFilter = (rate) => {
        if (rate === minRating) {
            setMinRating(0);
            setFilteredMovies(movies);
        } else {
            setMinRating(rate);
            const filtered = movies.filter((movie) => movie.vote_average >= rate);
            setFilteredMovies(filtered);
        }
    }

    const handleSort = (e) => {
        const { name, value } = e.target;
        setSort(prev => ({ ...prev, [name]: value }));
    }

    return (
        <section className="movie-list" id={type}>
            <header className="align-center movie-list-header">
                <h2 className="align-center movie-list-heading">{title} <img className="navbar-emoji" src={emoji} alt={`${emoji} icon`} /></h2>

                <div className="align-center movie-list-fs">
                    <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8, 7, 6]} />
                    <select name="by" id="" onChange={handleSort} value={sort.by} className="movie-sorting">
                        <option value="default">SortBy</option>
                        <option value="release_date">Date</option>
                        <option value="vote_average">Rating</option>
                    </select>
                    <select name="order" id="" onChange={handleSort} value={sort.order} className="movie-sorting">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </header>
            <div className="movie-cards">
                {filteredMovies.map(movie => <MovieCards key={movie.id} movie={movie} />)}
            </div>
        </section>
    )
}

export default MovieList
