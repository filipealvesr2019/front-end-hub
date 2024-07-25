import React, { useState } from 'react';
import styles from './SubscriptionPlans.module.css';
import SubscriptionPlan from './SubscriptionPlan';

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
    {isMonthly &&   <SubscriptionPlan />}
    {!isMonthly && 'conteudo Anual'}
    
    </>
  );
};

export default PlanosDeAssinatura;
