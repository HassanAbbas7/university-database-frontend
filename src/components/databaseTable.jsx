import React, { useEffect, useState } from "react";
import UniversityCard from "./dataCard";
import CountryAutocomplete from "./countryAutoComplete";
import { BASE_URL } from "../constants/constants";


const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [continentFilter, setContinentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // New state for search query
  const [countries, setCountries] = useState([]);

  const fetchEntries = async (currentPage) => {
    setLoading(true);
    try {
      // Construct the API URL with the selected filters
      let url = `${BASE_URL}/api/entries?page=${currentPage}&page_size=20`;
      if (continentFilter) {
        url += `&continent=${continentFilter}`;
      }
      if (cityFilter) {
        url += `&country=${cityFilter}`;
      }
      if (searchQuery) {
        url += `&search=${searchQuery}`;  // Add search query to the API URL
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0){
        setHasMore(false)
      }
      else{
        setHasMore(true)
      }
      setEntries((prev) => [...prev, ...data]);
    } catch (err) {

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(entries);
  }, [entries])

  useEffect(() => {
    let url = `${BASE_URL}/api/get_countries?continent=${continentFilter}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, [continentFilter])
  useEffect(() => {
    fetchEntries(page);
  }, [page]);  // Add searchQuery as a dependency

  const loadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const handleSearchClick = () => {
    setPage(1);  // Reset to first page when searching
    setEntries([]);  // Clear current entries
    fetchEntries(1);  // Fetch new results based on search query
  };

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Entries</h1>

      {/* Search Bar and Filters Section */}
      <div className="row mb-4">
        {/* Search Bar */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>

        {/* Continent Filter */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={continentFilter}
            onChange={(e) => setContinentFilter(e.target.value)}
          >
            <option value="">Filter by Continent</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Australia">Australia</option>
            <option value="Middle East">Middle East</option>
          </select>
        </div>

        <CountryAutocomplete allCities={countries.map(city => city[0])} setCityFilter={setCityFilter} cityFilter={cityFilter}></CountryAutocomplete>
        {/* <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by City"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
        </div> */}
      </div>

      {/* Entries List */}
      <div className="row">
        {entries.map((entry, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <UniversityCard
                  key={index}
                  name={entry[1]}
                  link={entry[2]}
                  city={entry[3]}
                  summary={entry[5]}
                  country={entry[6]}
                  acedemicStaff={entry[7]}
                  femaleStudents={entry[8]}
                  internationalStudents={entry[9]}
                  mastersScholorships={entry[10]}
                  phdScholorships={entry[11]}
                  bachelorScholorships={entry[12]}
                  students={entry[13]}
                  ranking={entry[14]}
                  id={entry[15]}

                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading and Load More */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {hasMore ? (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <div className="alert alert-info">No more entries</div>
        </div>
      )}
    </div>
  );
};

export default EntriesList;
