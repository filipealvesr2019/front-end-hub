import React from "react";
import NavBar from "../components/NavBar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <NavBar />
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
        
            <ul className={styles.ul}>
            <a href="https://imgur.com/eIsbYKG">
              <img
                src="https://i.imgur.com/eIsbYKG.jpg"
                title="source: imgur.com"
                className={styles.img}
              />
            </a>
              <li className={styles.li}>
                <a href="#sobre">Sobre</a>
              </li>
              <li className={styles.li}>
                <a href="#servicos">Serviços</a>
              </li>
              <li className={styles.li}>
                <a href="#contato">Contato</a>
              </li>
            </ul>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <button href="#Login" className={styles.button}>Login</button>
              </li>
              <li className={styles.li}>
                <button href="#Cadastro" className={styles.button}>Cadastro</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <section id="sobre">
          <h2 className={styles.h2}>Transforme Seu Negócio de Moda com Nosso Sistema de Personalização e E-commerce

</h2>
          <p  className={styles.p}>
          Descubra uma nova forma de gerenciar e expandir sua loja de roupas com nosso serviço de assinatura completo. Oferecemos uma plataforma robusta que combina um ERP eficiente com uma solução de e-commerce flexível. Personalize sua loja, gerencie inventário, e ofereça uma experiência única para seus clientes – tudo isso sem complicações.
</p>
        </section>
        <section id="servicos">
          <h2 className={styles.h2}>Principais Recursos:</h2>
          <p  className={styles.p}><b>Personalização Completa: </b> Crie sua própria loja online com nosso intuitivo construtor de sites. Adicione seus produtos, defina preços, e personalize o visual da sua loja para refletir sua marca.</p>

          <p  className={styles.p}><b>Gestão de Inventário: </b> Controle seu estoque com facilidade. Nosso ERP integrado ajuda você a gerenciar pedidos, fornecedores e logística de forma eficiente.
          </p>
        
          <p  className={styles.p}><b>Venda Online: </b> Ofereça uma experiência de compra agradável para seus clientes com nosso sistema de e-commerce fácil de usar. Acompanhe vendas, promova produtos e aumente sua receita.</p>
       <button className={styles.button}>Comece Hoje</button>
        </section>
        <section id="contato">
          <h2 className={styles.h2}>Contato</h2>
          <p>Formulário ou informações de contato.</p>
        </section>
        <section id="sobre">
          <h2 className={styles.h2}>Quem Somos</h2>
          <p>Na [Nome da Empresa], nossa missão é empoderar empreendedores e marcas de moda com ferramentas inovadoras para criar e gerenciar suas lojas de forma eficiente. Combinamos tecnologia de ponta com um suporte excepcional para garantir que você tenha tudo o que precisa para ter sucesso.</p>
          <h2 className={styles.h2}>Nossos Valores:</h2>

          <p  className={styles.p}><b>Inovação: </b>  Estamos sempre em busca de novas soluções para aprimorar sua experiência.
          </p>
        
          <p  className={styles.p}><b>Facilidade de Uso: </b> Nossos produtos são projetados para serem intuitivos e acessíveis a todos.</p>
          <p  className={styles.p}><b>Suporte ao Cliente: </b> Oferecemos suporte dedicado para ajudá-lo em cada etapa do caminho.</p>

        </section>
        <section id="servicos">
          <h2 className={styles.h2}>Serviços</h2>
          <p>Detalhes sobre os serviços oferecidos.</p>
        </section>
        <section id="contato">
          <h2 className={styles.h2}>Contato</h2>
          <p>Formulário ou informações de contato.</p>
        </section>
      </main>
      <footer>
      <p>Copyright © 2024 [Nome da Empresa]. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
