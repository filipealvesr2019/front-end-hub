import React, { useState } from 'react';
import styles from './SubscriptionPlans.module.css';

const PlanosDeAssinatura = () => {
    const [isMonthly, setIsMonthly] = useState(true);

    
  return (
    <>
         
         <div className={styles.toggleContainer}>
      <div
        className={`${styles.toggleOption} ${isMonthly ? styles.active : ''}`}
        onClick={() => setIsMonthly(true)}
      >
        Mensal
      </div>
      <div
        className={`${styles.toggleOption} ${!isMonthly ? styles.active : ''}`}
        onClick={() => setIsMonthly(false)}
      >
        Anual
      </div>
    </div>
    {isMonthly && 'conteudo mensal'}
    {!isMonthly && 'conteudo Anual'}
    </>
  );
};

export default PlanosDeAssinatura;
