import React, { useState, useEffect } from 'react';
import noPoster from '../assets/images/no-poster.jpg';

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const apiKey = '1e33068f';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchKeyword}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchKeyword, apiKey]);

  return (
    <div className="container-fluid">
      {apiKey !== '' ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador */}
                <div className="form-group">
                  <label htmlFor="">Buscar por título:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {searchKeyword}</h2>
            </div>
            {/* Listado de películas */}
            {movies.length > 0 &&
              movies.map((movie, i) => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            src={movie.Poster === 'N/A' ? noPoster : movie.Poster}
                            alt={movie.Title}
                            style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                          />
                        </div>
                        <p>{movie.Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
        </>
      ) : (
        <div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
      )}
    </div>
  );
}

export default SearchMovies;