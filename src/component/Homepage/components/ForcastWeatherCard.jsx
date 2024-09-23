import React from 'react'

const ForcastWeatherCard = ({ dailyForcast, unit }) => {
    return (
        <div className='shadow rounded-md p-4 bg-white'>
            <div className='flex items-center gap-2'>
                <p className='text-black text-xl'>{dailyForcast?.date}</p>
                <img src={`http://openweathermap.org/img/w/${dailyForcast?.icon}.png`} alt="weather icon" />
                <p className='text-black text-xl font-semibold'>{dailyForcast?.weatherCondition}</p>
                <p className='text-black text-xl'>
                    {
                        unit === 'celsius'
                            ? `${dailyForcast?.celsiusTemp.toFixed(2)} °C`
                            : `${dailyForcast?.fahrenheitTemp.toFixed(2)} °F`
                    }
                </p>
            </div>
        </div>
    )
}

export default ForcastWeatherCard