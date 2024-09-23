import React from 'react';
import { City } from 'country-state-city';
import Spinner from '../../Spinner/Spinner';

const SearchModal = ({ toggleModal, isModalOpen, selectedValue, handleSelectChange }) => {

    const allCities = City.getCitiesOfCountry('IN');

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='flex justify-end'>
                    <button className='w-6 h-6 rounded-full bg-gray-200 flex justify-center items-center' onClick={toggleModal}>
                        <span className='text-black text-base'>x</span>
                    </button>
                </div>

                {allCities.length ? (
                    <div>
                        <h2>Select a City</h2>
                        <select value={selectedValue} onChange={handleSelectChange}>
                            <option value="">-- Select an option --</option>
                            {allCities.slice(500, 1500).map((city, index) => (
                                <option key={city.name + index} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                ) : <Spinner />}
            </div>
        </div>
    )
}

export default SearchModal