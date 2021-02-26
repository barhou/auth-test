import React, { useEffect, useState } from 'react'
import axios from "axios"
import * as XLSX from 'xlsx'
import Tree from 'react-animated-tree'

const treeStyles = {
  position: 'absolute',
  top: 40,
  left: 40,
  color: 'white',
  fill: 'red',
  width: '100%'
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}

const App = () => {


  const [targetData, setTargetData] = useState([])
  useEffect(() => {
    //GET DATA
    renderTargetData()

  }, [])


  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];
        const ws = wb.SheetNames[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d);
    });
  };
  const renderTargetData = async () => {
    await axios
      .get('https://auth-test-4cba1-default-rtdb.firebaseio.com/target.json', { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(response => {
        setTargetData(response.data)
        console.log(response)
      })
      .catch(error => console.log(error))

  }



  const clearRf = () => {
    const firstKeys = Object.keys(targetData)
    return firstKeys.map(el => {
      const firstChildObject = targetData[el]
      const secondKeys = Object.keys(firstChildObject)


      return {
        title: el, values: secondKeys.map(els => {
          const secondObject = firstChildObject[els]
          const secondKeysArray = Object.keys(secondObject)



          return {
            title: els, values: secondKeysArray.map(elz => {
              const thirdObject = secondObject[elz]
              const thirdKeysArray = Object.keys(thirdObject)

              return {
                title: els, values: thirdKeysArray.map(elx => {
                  const forthObject = thirdObject[elx]
                  // const forthKeysArray = Object.keys(forthObject)
                  return { title: elx, values: forthObject.map(elq => elq) }

                })

              }
            })

          }
        })
      }
    })

  }

  const template = () => {
    return clearRf() && clearRf().map(el =>
      <Tree content={el.title}  style={treeStyles} style={{ color: '#63b1de' }}>
        {el.values.map(els => <Tree content={els.title} type={<span style={typeStyles}></span>}>
          {els.values.map(elx => <Tree content={elx.title} type={<span style={typeStyles}></span>}>
            {elx.values.map(elz => <Tree content={elz.title} type={<span style={typeStyles}></span>}>

              {elz.values.map(elo => <DisplayDetails {...elo} />)}

            </Tree>)}
          </Tree>)}
        </Tree>)}

      </Tree>)
  }

  return <div>
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file);
      }
      }


    />
    {template()}

  </div>;

}

const DisplayDetails = ({ Action, param1, param2, param3 }) => {
  return (
    <div>
      <div>--------------------------------</div>
      <div>{Action} </div>
      <div>{param1} </div>
      <div> {param1}</div>
      <div> {param3}</div>
      <div>--------------------------------</div>
    </div>
  )
}

export default App;
