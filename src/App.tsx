import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [value, setValue] = useState({ value: ""});
  let updatedCountry = value.value;
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  

  const fetchApi = () => {
    updatedCountry = value.value;
    if(value.value === ""){
      updatedCountry = "Argentina";
    }
    try {
      fetch(`http://universities.hipolabs.com/search?country=${updatedCountry}`)
      .then(response => response.json())
      .then(data => {
        setDataArray(data);
        showUnis();
      })
    }
      catch (error) {
        console.error("Error occured while fetching json data from Web API:", error);
      }
      
  }

  useEffect(() => {
    showUnis();
  }, [dataArray]);


  const showUnis = () => {
    let universityName : any = "";
    let universityWebsite : any = "";  
    let uniNumber : number = 0;
    if (tableBodyRef.current) {
      const tableBody = tableBodyRef.current;
      tableBody.innerHTML = "";
      for (let i = 0; i < dataArray.length; i++) {
        uniNumber = i;
        universityName = dataArray[i].name;
        universityWebsite = dataArray[i].web_pages[0];
        //console.log(uniNumber + " " + universityName + " " + universityWebsite);
        tableBody.innerHTML += "<tr><td>" + uniNumber + "</td><td>" + universityName + "</td><td>" + universityWebsite + "</td></tr>";
      }
    }
    
  }


  const updateCountry = (event: ChangeEvent<{ value: string }>) => {
    setValue({ value: event?.currentTarget?.value });
  }


  return (
    <>
    <div className="Main">
      <div className="Content">
      <h1>University Finder</h1>
      <form>
        <label>Select Country: </label>
        <select id="selectedCountry" onChange={ event => {updateCountry(event)}}>
          <option value="Argentina">Argentina</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Belgium">Belgium</option>
          <option value="Brazil">Brazil</option>
          <option value="Canada">Canada</option>
          <option value="China">China</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Ireland">Ireland</option>
          <option value="Italy">Italy</option>
          <option value="Japan">Japan</option>
          <option value="Netherlands">Netherlands</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Norway">Norway</option>
          <option value="Philippines">Philippines</option>
          <option value="Russian Federation">Russia</option>
          <option value="Singapore">Singapore</option>
          <option value="Spain">Spain</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Thailand">Thailand</option>
          <option value="United Kingdom">United Kingdom</option>
          {/* <option value="United States">USA</option> */}
        </select>
      </form>
      <div className="buttonDiv">
        <button onClick={() => { fetchApi(); }}>Show Universities</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>University #</th>
            <th>University Name</th>
            <th>University Website</th>
          </tr>
        </thead>
        <tbody ref={tableBodyRef} className="tableBody">
          
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default App
