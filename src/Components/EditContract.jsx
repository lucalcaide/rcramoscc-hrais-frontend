import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditContract = () => {

  const { id } = useParams();
  const [employee, setEmployee] = useState({
    contract: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee/' + id)
      .then(result => {
        setEmployee({
          ...employee,
          contract: result.data.Result[0].contract,
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleFileChange = (e) => {
    setEmployee({ ...employee, contract: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('contract', employee.contract);

    axios.put('http://localhost:3000/auth/edit_contract/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(result => {
        if (result.data.Status) {
          alert('Contract updated successfully!');
          navigate('/dashboard/201files/contract');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-2 fontstyle">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '35px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#0b283b' }}>
          EDIT CONTRACT
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 row g-3 w-50 mt-2 scrollable-table-form"
        style={{ border: '5px solid #0b283b', borderRadius: '10px', backgroundColor: '#8b9191' }}
      >
        <div className="col-12">
          <div className="input-group">
            <span className="input-group-text me-1" style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
              Contract:
            </span>
            <input
              type="file"
              className="form-control"
              id="contract"
              autoComplete="off"
              onChange={handleFileChange}
              style={{ fontSize: '20px', fontFamily: 'Montserrat' }}
              required
            />
          </div>
        </div>

        <div className="col-12 mb-2">
          <button type="submit" className="btn w-100 rounded-5 btn-light" style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
            Edit Contract
          </button>
        </div>

        <div className="col-12">
          <button type="reset" className="btn w-100 rounded-5 btn-dark" style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditContract