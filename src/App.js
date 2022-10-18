import './App.scss';
import Listbox from "react-widgets/Listbox";
import {useState, useEffect} from "react";
import axios from 'axios';

function App() {

  const OPTIONS = [
      { id: 1, value: "Foo"}, {id: 2, value: "Bar"}, {id: 3, value:"Baz"}
  ];

    /**
     *  For displaying data
     */
  const [toggle, setToggle] = useState(false);

    /**
     * List of options
     */
  const [options, setOptions] = useState(OPTIONS);

    /**
     * List of selected
     */
  const [selected, setSelected] = useState([]);

    /**
     * Required state, if user select data into ListBox
     */
  const [required, setRequired] = useState(true);

    /**
     * Http Error, normally, if you don't firewall which block http protocol on your computer.
     */
  const [error, setError] = useState(null);

    /**
     * At start of component, it calls to fake api for retrieve information
     * transform all item of array in javascript array of object
     * and set data into ListBox Component.
     */
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
    }, []);

    /**
     *  Look the selected item, if it was no selected item in ListBox,
     *  the state required pass true and return message and class into the component
     */
    useEffect(
        () => {
            selected.length === 0 ? setRequired(true) : setRequired(false)
        }, [selected]
    )

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
