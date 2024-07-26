import React, { useState } from "react";
import styles from "./SubscriptionPlans.module.css";
import MonthlySubscriptionPlan from "./MonthlySubscriptionPlan";
import YearlySubscriptionPlan from "./YearlySubscriptionPlan";
import QuarterlySubscriptionPlan from "./QuarterlySubscriptionPlan";

const PlanosDeAssinatura = () => {
  const [plan, setPlan] = useState(1); // Usando 1 para Mensal, 2 para Trimestral e 3 para Anual

  return (
    <>
      <div className={styles.toggleContainer}>
        <div
          className={`${styles.toggleOption} ${
            plan === 1 ? styles.active : ""
          }`}
          onClick={() => setPlan(1)}
        >
          Mensal
        </div>
        <div
          className={`${styles.toggleOption} ${
            plan === 2 ? styles.active : ""
          }`}
          onClick={() => setPlan(2)}
        >
          trimestral
        </div>
        <div
          className={`${styles.toggleOption} ${
            plan === 3 ? styles.active : ""
          }`}
          onClick={() => setPlan(3)}
        >
          Anual
        </div>
      </div>
      {plan === 1 && <MonthlySubscriptionPlan />}
      {plan === 2 && <QuarterlySubscriptionPlan />}

      {plan === 3 && <YearlySubscriptionPlan />}
    </>
  );
};

export default PlanosDeAssinatura;
