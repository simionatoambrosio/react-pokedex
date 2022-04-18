import './Pagination.css'

const Pagination = (props) => {
    const {page, totalPages, previousPage, nextPage, firstPage, lastPage} = props
    return(
        <div className='pagination-container'>
            <button onClick={firstPage} title="Go to first page">◀◀</button>
            <button onClick={previousPage} title="Previous page">◀</button>
            <div> {page} de {totalPages} </div>
            <button onClick={nextPage} title="Next page">▶</button>
            <button onClick={lastPage} title="Go to last page">▶▶</button>
        </div>
    )
}

export default Pagination