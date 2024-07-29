import { Link } from 'react-router-dom';
import styles from './HeaderSidebar.module.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

export default function HeaderSidebar(){
    return (
        <>
       <div className={styles.iconContainer}>
        
        <Link to={`/loja`} className={styles.icon}>
          <div>
            <LocalMallOutlinedIcon />
          </div>
        </Link>
      </div>
        
        </>
    )
}