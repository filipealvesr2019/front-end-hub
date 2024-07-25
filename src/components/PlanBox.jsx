import React from 'react';
import styles from './PlanBox.module.css';

const PlanBox = ({ title, price, features, popular }) => {
  return (
    <div className={`${styles.planBox} ${popular ? styles.popular : ''}`}>
      {popular && <div className={styles.popularBadge}>POPULAR</div>}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.price}>${price}/mo</p>
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={feature.available ? styles.available : styles.notAvailable}>
            {feature.name}
          </li>
        ))}
      </ul>
      <button className={styles.button}>Choose This Plan</button>
    </div>
  );
};

export default PlanBox;
