import './App.scss';
import Listbox from "react-widgets/Listbox";
import {useState, useEffect} from "react";
import axios from 'axios';

function App() {

  const OPTIONS = [
      { id: 1, value: "Foo"}, {id: 2, value: "Bar"}, {id: 3, value:"Baz"}
  ];

  const [toggle, setToggle] = useState(false);

  const [options, setOptions] = useState(OPTIONS);
  const [selected, setSelected] = useState([]);
  const [required, setRequired] = useState(true);

  const [error, setError] = useState(null);

    useEffect(
        () => {
            selected.length === 0 ? setRequired(true) : setRequired(false)
        }, [selected]
    )

    useEffect( () => {
        axios.get('http://localhost:3000/options')
            .then( res => {
                console.log(res.data);
                const DATA = res.data.map( (item, number) => {
                    return {
                        id: number + 1,
                        value: item
                    }
                })
                setOptions(DATA);
            })
            .catch(e => setError(e) )
    }, [])

  return (
    <>
      {
          error && (
             <span>{error}</span>
          )
      }

      <section className="demo">
          <div className="module">
              <h2>Replacement Solution</h2>
              <Listbox
                  className={ required ? "listbox dirty" : "listbox"}
                  multiple
                  dataKey="id"
                  textField="value"
                  defaultValue={[]}
                  onChange={ (e) => setSelected(e) }
                  data={options}>
              </Listbox>
              {
                required && (<span className="is-invalid">Field is required</span>)
              }
          </div>
          <div className="toggle-data">
              <h1 className="pointer" onClick={ () => setToggle(!toggle) }>Toggle Data</h1>
              <div className={!toggle ? "cols" : "cols show"} style={{display: toggle ? "block" : "none" }}>
                  <div>
                      <h2>Selected</h2>
                      <pre>
                          {
                              JSON.stringify(selected, null, 2)
                          }
                      </pre>
                  </div>
                  <div>
                      <h2>Hardcoded data</h2>
                      <pre>
                          {
                              JSON.stringify(OPTIONS, null, 2)
                          }
                      </pre>
                  </div>
                  <div>
                      <h2>Remote Data</h2>
                      <pre>
                          {
                              JSON.stringify(options, null, 2)
                          }
                      </pre>
                  </div>
              </div>
          </div>
      </section>

    </>
  );
}

export default App;
