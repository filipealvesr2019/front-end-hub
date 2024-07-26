import React from "react";
import styles from "./YearlySubscriptionPlan.module.css";

const YearlySubscriptionPlan = () => {
  return (
    <div>
      <div className={styles.container}>
      <div className={styles.plan}>
          <h2>gratuito</h2>
          <p className={styles.price}>R$0/mês</p>
          <p className={styles.bill}>sem cobrança</p>
          <button className={styles.button}>Comece agora</button>
          <div className={styles.features}>
            <p>
              {" "}
              <b className={styles.b}>✓</b> 10 páginas por mês
            </p>
            <p>
              <b className={styles.b}>✓</b> Cadastro de ate 50 Produtos por mes
            </p>
            <p>
              <b className={styles.b}>✓</b> Suporte básico
            </p>
          </div>
        </div>
        <div className={styles.plan}>
          <h2>Basico</h2>
          <p className={styles.price}>R$10/mês</p>
          <p className={styles.bill}>Cobrado mensalmente</p>
          <button className={styles.button}>Comece agora</button>
          <div className={styles.features}>
            <p>
              {" "}
              <b className={styles.b}>✓</b> 10 páginas por mês
            </p>
            <p>
              <b className={styles.b}>✓</b> Cadastro de Produtos ilimitados
            </p>
            <p>
              <b className={styles.b}>✓</b> Suporte básico
            </p>
          </div>
        </div>
        <div className={styles.plan}>
          <h2>Intermediario</h2>
          <p className={styles.price}>R$59/mês</p>
          <p className={styles.bill}>Cobrado a cada 3 meses</p>
          <button className={styles.button}>Comece agora</button>
          <div className={styles.features}>
            <p>
              <b className={styles.b}>✓</b> 50 páginas por trimestre
            </p>
            <p>
              <b className={styles.b}>✓</b> Cadastro de Produtos ilimitados
            </p>
            <p>
              <b className={styles.b}>✓</b> Suporte prioritário
            </p>
          </div>
        </div>
        <div className={styles.plan}>
          <h2>Avançado</h2>
          <p className={styles.price}>R$199/ano</p>
          <p className={styles.bill}>Cobrado anualmente</p>
          <button className={styles.button}>Comece agora</button>
          <div className={styles.features}>
            <p>
              <b className={styles.b}>✓</b> Páginas ilimitadas
            </p>
            <p>
              <b className={styles.b}>✓</b> Cadastro de Produtos ilimitados
            </p>
            <p>
              <b className={styles.b}>✓</b> Suporte premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySubscriptionPlan;
