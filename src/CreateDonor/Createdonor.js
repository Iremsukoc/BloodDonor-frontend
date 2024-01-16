import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from '../data/cities.json';


const CreateDonor = ({ userId}) => {
    console.log("CreateDonor rendered. UserId:", userId);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [counties, setCounties] = useState([]);
    const [donorName, setDonorName] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedTown, setSelectedTown] = useState('');
    const [image, setImage] = useState('');
    const [branchName, setBranchName] = useState('');
    const [selectedDonor, setSelectedDonor] = useState([]);
    const [donors, setDonors] = useState([]);

    const navigate = useNavigate();


    const fetchBranchName = async () => {
      try {
        const response = await axios.post('http://localhost:1010/api/find-branchname', {
          userId: userId,
        });
    
        setBranchName(response.data.branchName); 
        console.log(setBranchName);
      } catch (error) {
        console.error('Error fetching branchName:', error);
      }
    };

    useEffect(() => {
      if (!userId) {
        navigate('/login');
      } else{
        fetchBranchName();
        fetchDonors();
      }
    }, [userId, navigate]);

    
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
      const formData = new FormData();
      formData.append('donorName', donorName);
      formData.append('bloodType', bloodType);
      formData.append('city', selectedCity);
      formData.append('town', selectedTown);
      formData.append('phoneNumber', phoneNumber);
      formData.append('userId', userId);
      formData.append('image', image);
  
      try {
        const response = await axios.post('http://localhost:3001/donor-service/api/insert-donor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Server Response:', response.data);
        fetchDonors();
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
      
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];

      if (selectedImage) {
        setImage(selectedImage); 
      }
    };


    const handleRowClick = (selectedDonor) => {
      setSelectedDonor(selectedDonor);
      setDonorName(selectedDonor.donor_name);
      setBloodType(selectedDonor.blood_type);
      setSelectedCity(selectedDonor.city);
      setSelectedTown(selectedDonor.town);
      setPhoneNumber(selectedDonor.phone_number)
    };

    const fetchDonors = async () => {
      try {
        const response = await axios.post('http://localhost:3001/donor-service/api/fetch-donors', {
          userId,
        });
        console.log('API Response:', response.data);
        setDonors(response.data.donorInformation || []);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    const handleDelete = async () => {
      try {
        const deleteEndpoint = 'http://localhost:3001/donor-service/api/delete-donor';
    
        const requestData = {
          phoneNumber: phoneNumber
        };
    
        const response = await axios.post(deleteEndpoint, requestData);
    
        console.log('Delete Response:', response.data);
    
        // Reset form values after successful deletion
        setDonorName('');
        setBloodType('');
        setSelectedCity('');
        setSelectedTown('');
        setPhoneNumber('');
    
        fetchDonors();
      } catch (error) {
        console.error('Error deleting donor:', error);
        console.error('Full Error Object:', error);

      }
    };
    


    return (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <label id='branch-name' htmlFor="branch-name-label" style={{marginTop:'50px', marginBottom:'25px' }}><strong>{branchName}</strong></label>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="information-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <label htmlFor="donor-name-label" id="donor-name-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>
                Donor Name
              </label>
              <textarea id="donor-name-text" name="donor-name" style={{ width: '300px', height: '20px', marginTop: '10px' }} value={donorName} onChange={(e) => setDonorName(e.target.value)} />
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
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
    
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <label htmlFor="phone-number-label" id="phone-number-label" style={{ width: '120px', marginRight: '10px', marginTop: '10px', marginLeft: '10px' }}>
                Phone Number
              </label>
              <input id="phone-number-text" name="phone-number" type="tel" style={{ width: '300px', height: '20px', marginTop: '10px' }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>
    
          <div className="image-container" style={{ marginLeft: '0px' }} >
            <img src={image ? URL.createObjectURL(image) : ''} alt="Selected Image" style={{ width: '300px', height: 'auto' }} />
            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
          </div>
        </div>
    
        <div className="add-button" style={{ marginTop: '50px', marginLeft: '100px' }}>
          <button style={{ width: '400px', height: '30px', backgroundColor: 'cadetblue' }} onClick={handleSubmit}>
            ADD
          </button>
        </div>

        <div className='table-container' style={{ marginTop: '100px', border: '2px', borderColor: 'black', borderStyle: 'solid', width: '50%', marginLeft:"150px" }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#dddddd' }}>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Donor Name</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Blood Type</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>City</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Town</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Phone Number</th>

            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} onClick={() => handleRowClick(donor)} style={{ cursor: 'pointer' }}>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{donor.donor_name}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{donor.blood_type}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{donor.city}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{donor.town}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{donor.phone_number}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='edit-delete-button' style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="edit-button" style={{ marginTop: '50px', marginLeft: '150px' }}>
          <button style={{ width: '200px', height: '30px', backgroundColor: 'grey' }} >
            EDIT
          </button>
        </div>

        <div className="delete-button" style={{ marginTop: '50px', marginLeft: '100px' }}>
          <button style={{ width: '200px', height: '30px', backgroundColor: 'grey' }} onClick={handleDelete}>
            DELETE
          </button>
        </div>

      </div>




      </div>
    );
    
        
};

export default CreateDonor;

