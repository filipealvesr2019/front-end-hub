import { Link } from 'react-router-dom';
import styles from './HeaderSidebar.module.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

export default function HeaderSidebar(){
    return (
        <div className={styles.HeaderSidebar}>
       <div className={styles.iconContainer}>
        
        <Link to={`/loja`} className={styles.icon}>
          <div>
            
          <a href="https://imgur.com/wlzh2cl"><img src="https://i.imgur.com/wlzh2cl.png" title="source: imgur.com" /></a>          </div>
          <a href="https://imgur.com/5LHLHq2"><img src="https://i.imgur.com/5LHLHq2.png" title="source: imgur.com" /></a>
        </Link>
      </div>
        
        </div >
    )
}