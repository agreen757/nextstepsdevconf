import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleSpreadsheet } from "google-spreadsheet";


function SheetRows () {

  const [srows, setRows] = useState([]);


  async function fetchData() {

    const doc = new GoogleSpreadsheet('1-TQFUjwj5wMaf6pPAHOx-8ckC96GPRFc9_8fTXSYMQQ');
    var creds = require('./indmusicnetwork-965-3de69e732de7.json');


    
    
    await doc.useServiceAccountAuth(creds);
    
    await doc.useServiceAccountAuth(creds); // configure autentification to access google spreadsheet
    await doc.loadInfo();
    
    const sheet = await doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows(); // grabbing rows
    console.log(rows)



    //placeholder variable
    var r = await rows.map((ele)=>{
      return {
      name :ele._rawData[0].split('/')[ele._rawData[0].split('/').length - 1],
      url: ele._rawData[0],
      followers: ele._rawData[3],
      following: ele._rawData[4],
      profileImg: ele._rawData[5]
      }
    })
    console.log(r)
    setRows(r)
  }
  
  useEffect(()=>{


    fetchData()

  },[])


  //console.log(rows)

  return (
    <div>
      <h1>Twitter Stats</h1>
      <table>
        <tr>
          <td></td>
          <td>Name</td>
          <td>Followers</td>
          <td>Following</td>
        </tr>
      {srows.map((row, i)=>{
        return <tr key={i}><td><img src={row.profileImg} ></img></td><td>{row.name}</td><td>{row.followers}</td><td>{row.following}</td></tr>
      })}
      </table>
    </div>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <SheetRows />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
