import './Pagination.css'

const Pagination = (props) => {
    const {page, totalPages, previousPage, nextPage, firstPage, lastPage} = props
    return(
        <div className='pagination-container'>
            <button onClick={firstPage}>◀◀</button>
            <button onClick={previousPage}>◀</button>
            <div> {page} de {totalPages} </div>
            <button onClick={nextPage}>▶</button>
            <button onClick={lastPage}>▶▶</button>
        </div>
    )
}

export default Pagination