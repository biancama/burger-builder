import React from 'react';
import Layout from './components/Layout/Layout';
import BuilderBuilder from './containers/BurgerBuilder/BurgerBuilder';
function App() {
  return (
    <div>
      <Layout>
        <BuilderBuilder></BuilderBuilder>
      </Layout>
    </div>
  );
}

export default App;
