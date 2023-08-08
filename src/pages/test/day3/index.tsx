import { createContext, useContext, useState } from 'react';
import AX from './Context';

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <AX.Provider value={theme}>
      <button onClick={()=>{setTheme(theme==="dark"?"dark":"light")}}>你好</button>
     <Panel title={"年"}>
      <h1>年后安全</h1>
     </Panel>
    </AX.Provider>
  )
}


function Panel({ title, children }) {
  const theme = useContext(AX);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
     <h1>Panel组件-----------</h1>
       <h1>{title}
       ----{theme}
       </h1>
      {children}
    </section>
  )
}

function Button() {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
 1
    </button>
  );
}
