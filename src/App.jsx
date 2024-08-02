
import "./App.css";
import LojaPage from "./ecommerce/LojaPage";
import UpdateTheme from "./ecommerce/UpdateTheme";

import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
   

      <LandingPage />

      {/* <Register /> */}
<div style={{
  marginTop:"20rem"
}}>
  <LojaPage />
  <UpdateTheme />
</div>
    </>
  );
}

export default App;
