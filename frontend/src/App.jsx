import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  // const [products, error, loading] = customReactQuery('/api/products');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal,
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request Cancel', error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();

    // clean up code
    return () => {
      controller.abort();
    };
  }, [search]);
  if (loading) {
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        <span className="spin"></span>
      </>
    );
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <>
      <div>
        <h1>Api Handling</h1>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h2>Number of Product are : {products.length}</h2>
        <div
          style={{
            display: 'flex',

            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                width: '400px',
                boxShadow: '3px -1px 10px 1px #d2d2d2',
                padding: '10px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}
            >
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <img
                src={product.imageUrl}
                style={{ width: '200px', height: '200px' }}
              />
              <h4>{product.price}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const response = await axios.get(urlPath);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return [products, error, loading];
// };
