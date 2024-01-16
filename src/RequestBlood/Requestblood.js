import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from '../data/cities.json';




const RequestBlood = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [counties, setCounties] = useState([]);
    const [selectedTown, setSelectedTown] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [duration, setDuration] = useState('');
    const [email, setEmail] = useState('');
    const [units, setUnits] = useState('');
    const [reason, setReason] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        setCities(citiesData);
      }, []);
    
    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
      };
    
    useEffect(() => {
        const selectedCityObject = cities.find((city) => city.name === selectedCity);
        if (selectedCityObject) {
          setCounties(selectedCityObject.counties);
        } else {
          setCounties([]); 
        }
      }, [selectedCity, cities]);


      const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3001/donor-service/api/request-blood', {
            selectedCity,
            selectedTown,
            bloodType,
            duration,
            email,
            units,
            reason,
          });

      
          console.log('İstek başarıyla gönderildi:', response.data);

        } catch (error) {
          console.error('İstek gönderilirken hata oluştu:', error);
        }
      };



      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label id='page-name-label'  style={{margin:"50px"}}><strong>Request Blood</strong></label>
      
          <div id='left-right-container' style={{ display: 'flex', flexDirection: 'row' }}>
      
            <div id='left-part-container' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', marginLeft: '50px', border: '5px', borderColor: 'grey', borderStyle: 'solid', padding: '20px' }}>
      
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <label htmlFor="blood-type-label" id="blood-type-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>
                  Blood type
                </label>
                <select id="blood-type" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
      
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <label id='email-label' name="email-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>Email</label>
                <input id='email-input' type='email' onChange={(e) => setEmail(e.target.value)} />
              </div>
      
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <label id="units-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>Units</label>
                <input id="units-input"  min={0} type="number" style={{ marginLeft: '20px' }}  onChange={(e) => setUnits(e.target.value)} />
              </div>
      
            </div>
      
            <div id='right-part-container' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', marginLeft: '50px', border: '5px', borderColor: 'grey', borderStyle: 'solid', padding: '20px' }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <label className="city-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>
                  City
                </label>
                <select className="city-select" name="city" onChange={handleCityChange} value={selectedCity}>
                  <option value="">--Select City--</option>
                  {cities.map((gcity, index) => (
                    <option key={index} value={gcity.name}>
                      {gcity.name}
                    </option>
                  ))}
                </select>
              </div>
      
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <label className="county-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>
                  Town
                </label>
                <select className="count-select" name="county" value={selectedTown} onChange={(e) => setSelectedTown(e.target.value)}>
                  <option value="">--Select Town--</option>
                  {counties.map((county, index) => (
                    <option key={index} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </div>
      
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                <label id="duration-of-days-label" style={{ width: '120px', marginRight: '10px', marginLeft: '10px' }}>Duration of Search</label>
                <input id="duration-of-days-input" min={0} type="number" style={{ marginLeft: '20px' }} onChange={(e) => setDuration(e.target.value)} />
                <label style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>Days</label>
              </div>
      
            </div>
          </div>
      
        <div id='reason-container' style={{ marginTop: '30px', marginLeft: '50px', display: 'flex', flexDirection: 'column' }}>
            <label id='reason-label'>Reason</label>
            <textarea name='reason-container' style={{ width: '400px', marginTop: '10px' }} onChange={(e) => setReason(e.target.value)} />
        </div>

        <div>
          <button id='request-blood-button' onClick={handleSubmit} style={{ width: '700px', marginTop: '80px', marginLeft:"50px" }} >REQUEST BLOOD</button>
        </div>

        </div>
      );
      
      
};


export default RequestBlood;
