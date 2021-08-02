import styles from './Repo.module.scss'
import {NavLink} from "react-router-dom";

const Repo = ({repo}) => {

    return (
        <div className={styles.repo}>
            <div className={styles.header}>
                <div className={styles.name}>
                    <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>
                        {repo.name}
                    </NavLink>
                </div>
                <div className={styles.stars}>
                    Stars: {repo.stargazers_count}
                </div>
            </div>
            <div className={styles.description}>
                {repo.description}
            </div>
            <div className={styles.lastUpdate}>
                Last update: {repo.updated_at}
            </div>
        </div>
    )
}

export default Repo;