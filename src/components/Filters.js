export default function Filters ({filters, setFilters}) {
    const handleChange = (event) => {
        setFilters(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <>
            <div className="filters">
                <div className="filters__item">
                <label htmlFor='search'>Search</label>
                    <input 
                        id='search'
                        name='search'
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search by name"
                        className="filters__text-input"
                    />
                </div>

                <div className="filters__item">
                    <label htmlFor='sortField'>Sort By</label>
                    <select
                        id='sortField'
                        name='sortField'
                        value={filters.sortField}
                        onChange={handleChange}
                        className="filters__drop-down"
                    >
                        <option value='id'>ID</option>
                        <option value='name'>Name</option>
                    </select>
                </div>
            </div>
        </>
    )
}