import ThreeScene from './components/ThreeScene';
import Model from './components/Model.js';
import React, { Suspense } from 'react';
function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <ThreeScene>
        <color attach="background" args={['#161c24']} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ambientLight />
      </ThreeScene>
    </div>
  );
}

export default App;
