import items from "./data";
import colors from "./colors";
import Header from "./app/screens/header";
import Footer from "./app/screens/footer";
import RenderItem from "./app/components/product-render";
function App() {
  return (
    <div className="grid-container">
      {<Header />}
      <main>
        <div className="row center items page-size">
          <div className="card">
            <div className="loading">
              <div className="img"></div>
              <div className="name"></div>
              <div className="price"></div>
              <div className="toolskit"></div>
            </div>
          </div>
          {items.map((item) => {
            let color = colors[Math.ceil(Math.random() * (colors.length - 1))];
            return <RenderItem item={item} bgColor={color} />;
          })}
        </div>
      </main>
      {<Footer />}
    </div>
  );
}

export default App;
