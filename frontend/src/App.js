import { Routers } from "routes/Routers";
import { ScrollToTop } from "@components/Tool/ScrollToTop";
import "./App.css";
function App() {
  return (
    <div>
      <ScrollToTop />
      <Routers />;
    </div>
  );
}

export default App;
