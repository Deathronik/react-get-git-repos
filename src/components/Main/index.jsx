import styles from './Main.module.scss'
import {useEffect, useState} from "react";
import {getRepos} from "../../actions/repos";
import {useDispatch, useSelector} from "react-redux";
import Repo from './Repo'
import {setCurrentPage} from "../../reducers/reposReducer";
import {createPages} from "../../utils/pagesCreator";
import UpArrow from "../UpArrow";

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const perPage = useSelector(state => state.repos.perPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const [searchValue, setSearchValue] = useState("")
    const [showScroll, setShowScroll] = useState(false)
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)

        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showScroll])

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    function onSearchClickHandler() {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }

    return (
        <div className={styles.main}>
            <div className={styles.searchBlock}>
                <input value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       type="text"
                       placeholder="Input Repo Name"/>
                <button onClick={() => onSearchClickHandler()}>Search</button>
            </div>
            {isFetching === false ? repos.map((repo, index) => <Repo repo={repo} key={index}/>) :
                <div className={styles.loader}>
                    <div/>
                    <div/>
                </div>}
            <div className={styles.pages}>
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage === page ? styles.currentPage : styles.page}
                    onClick={() => dispatch(setCurrentPage(page))}
                >{page}</span>)}
            </div>
            {showScroll && <UpArrow/>}
        </div>
    )
}

export default Main;