export default function Pagination ({cardsPerPage, totalCards, setCurrentPage, currentPage}) {
    const lastPage = Math.ceil(totalCards / cardsPerPage);
    const displayPageNums = [];

    function createButton (value) {
        displayPageNums.push(
            <li className={'page-nav__button ' + (currentPage === value ? 'page-nav__button--selected' : '')} key={value} onClick={() => setCurrentPage(value)}>
                {value}
            </li>
        );
    }

    function decrementPage () {
        if (currentPage === 1) {
            return;
        }
        return setCurrentPage(prev => prev - 1);
    }

    function incrementPage () {
        if (currentPage === lastPage) {
            return;
        }
        return setCurrentPage(prev => prev + 1);
    }

    if (lastPage <= 7) {
        for (let i = 1; i <= lastPage; i++) {
            createButton(i);
        }
    } else {
        if (currentPage - 1 <= 3) {
            for (let i = 1; i <= 5; i++) {
                createButton(i);
            }

            displayPageNums.push(
                <li className="page-nav__button page-nav__button--ellipsis" key='ellipsisButton'>...</li>
            );

            createButton(lastPage);
        } else if (lastPage - currentPage <= 3) {
            createButton(1);

            displayPageNums.push(
                <li className="page-nav__button page-nav__button--ellipsis" key='ellipsisButton'>...</li>
            );

            for (let i = lastPage - 4; i <= lastPage; i++) {
                createButton(i);
            }
        } else {
            createButton(1);

            displayPageNums.push(
                <li className="page-nav__button page-nav__button--ellipsis" key='ellipsisLeft'>...</li>
            );

            createButton(currentPage - 1);
            createButton(currentPage);
            createButton(currentPage + 1);

            displayPageNums.push(
                <li className="page-nav__button page-nav__button--ellipsis" key='ellipsisRight'>...</li>
            );

            createButton(lastPage);
        }
    }

    return (
        <nav className="page-nav">
            <ul className="page-nav__list">
                <li id="prev-page" key="prev-page" className={'page-nav__button page-nav__button--arrow ' + (currentPage === 1 ? 'page-nav__button--invalid' : '')} onClick={decrementPage}>
                    &lt;
                </li>

                {displayPageNums}

                <li id="next-page" key="next-page" className={'page-nav__button page-nav__button--arrow ' + (currentPage === lastPage ? 'page-nav__button--invalid' : '')} onClick={incrementPage}>
                    &gt;
                </li>
            </ul>
        </nav>
    );
}