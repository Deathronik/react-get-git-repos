import axios from "axios";
import {setIsFetching, setRepos} from "../reducers/reposReducer";

export const getRepos = (searchQuery = "stars:%3E1", currentPages, perPages) => {
    return async (dispatch) => {
        if (searchQuery === '') {
            searchQuery = "stars:%3E1"
        }
        dispatch(setIsFetching(true))
        const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_pages=${perPages}&page=${currentPages}`)
        dispatch(setRepos(response.data))
    }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
    const response = await axios.get((`https://api.github.com/repos/${username}/${repoName}`))
    setRepo(response.data)
}

export const getContributors = async (username, repoName, setContributors, setIsFetching) => {
    const response = await axios.get((`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`))
    setContributors(response.data)
    setIsFetching(false)
}