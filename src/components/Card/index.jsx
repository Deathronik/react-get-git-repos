import React, {useEffect, useState} from 'react';
import styles from './Card.module.scss'
import {useParams} from 'react-router-dom'
import {getContributors, getCurrentRepo} from "../../actions/repos";

const Card = (props) => {
    const {username, repoName} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        getCurrentRepo(username, repoName, setRepo)
        getContributors(username, repoName, setContributors, setIsFetching)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <button className={styles.btnBack} onClick={() => props.history.goBack()}>Back</button>
            {isFetching === false ? <div>
                    <div className={styles.card}>
                        <img src={repo.owner.avatar_url} alt="Avatar"/>
                        <div className={styles.title}>
                            <div className={styles.name}>{repo.name} </div>
                            <div className={styles.description}>{repo.description}</div>
                        </div>
                        <div className={styles.rightBlock}>
                            <div className={styles.info}>
                                <div>Stars: {repo.stargazers_count}</div>
                                <a href={repo.owner.html_url}>Owner: {repo.owner.login} </a>
                            </div>
                            <a href={repo.html_url}>Link to github</a>
                        </div>
                    </div>
                    <div className={styles.contributors}>
                        <b>Top 10 contributors:</b>
                        {contributors.map((c, index) => <a href={c.html_url} key={index}>{index + 1}. {c.login}</a>)}
                    </div>
                </div> :
                <div className={styles.loader}>
                    <div/>
                    <div/>
                </div>}
        </div>
    );
};

export default Card;