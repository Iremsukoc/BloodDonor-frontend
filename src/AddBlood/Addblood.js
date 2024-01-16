import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addblood = ({ userId }) => {
  const [branchName, setBranchName] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donorName, setDonorName] = useState('');
  const [unitsOfBlood, setUnitsOfBlood] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchBranchName();
    }
  }, [userId]);


  const fetchBranchName = async () => {
    try {
      const response = await axios.post('http://localhost:3001/donor-service/api/find-branchname', {
        userId: userId,
      });

      setBranchName(response.data.branchName);
    } catch (error) {
      console.error('Error fetching branchName:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('tr-TR', options);
    return formattedDate;
  };

  const handleAddBlood = async () => {
    try {
      console.log('donorName:', donorName);
      const response = await axios.post('http://localhost:3001/donor-service/api/set-blood-units', {
        donorName: donorName,
        unitsOfBlood: unitsOfBlood,
      });


      console.log(response.data);

      setDonationDate(getCurrentDate());

    } catch (error) {
      console.error('Error fetching branchName:', error);
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label id="branch-name" htmlFor="branch-name-label" style={{ marginTop: '50px', marginBottom: '25px' }}>
        <strong>Add Blood {branchName}</strong>
      </label>

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
        <label id="donor-name-label">Donor Name</label>
        <input
          id="donor-name-input"  value={donorName} onChange={(e) => setDonorName(e.target.value)}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
        <label id="donation-date-label">Donation Date: {donationDate} </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
        <label id="units-label">Units</label>
        <input id="units-input" max={10} min={0} type="number" style={{ marginLeft: '20px' }} onChange={(e) => setUnitsOfBlood(e.target.value)} />
      </div>

      <button id='add-blood' onClick={handleAddBlood}  style={{width:"30%" , marginLeft:"50px", marginTop:"50px"}}>ADD</button>
    </div>
  );
};

export default Addblood;