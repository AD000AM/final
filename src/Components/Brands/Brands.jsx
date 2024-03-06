import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Modal from 'react-modal'; // Import the Modal component

export default function Brands() {
  let [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand

  const getBrands = async (queryData) => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    return response.data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery(['brands', page], getBrands);

  const getPages = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleModalClose = () => {
    setSelectedBrand(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 bottom-0 start-0">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container-fluid py-5">
          <div className="row g-3">
            {data?.data.map((element) => (
              <div
                key={element.id} // Add unique key for each brand
                className="col-md-3 border m-5 border-1 rounded wds"
                onClick={() => handleBrandClick(element)} // Set click handler on each div
              >
                <div className="spc">
                  <img src={element.image} className="w-100 spc" alt="" />
                  <h3 className="text-main text-center">{element?.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={selectedBrand !== null} // Show modal only when a brand is selected
        onRequestClose={handleModalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Adjust opacity as needed
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px', // Adjust max width as needed
            padding: '20px',
          },
        }}
      >
        <i onClick={handleModalClose} class="fa-solid fa-x mge"></i>
        
        <div className="d-flex justify-content-between align-items-center">
          <img src={selectedBrand?.image} alt={selectedBrand?.name} />
          <h3 className="text-main text-center me-5">{selectedBrand?.name}</h3>
          
        </div>
        <div className='me-auto mg'><button  onClick={handleModalClose} className="btn bg-main text-white ">
            Close
          </button></div>
      </Modal>
    </>
  );
}
