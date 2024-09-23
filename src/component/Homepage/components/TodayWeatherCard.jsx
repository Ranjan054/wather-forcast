import React from 'react'

const TodayWeatherCard = ({ weatherDetail, city, unit }) => {
    return (
        <div className='shadow rounded-md p-4 bg-white min-w-64'>
            <div className='flex justify-between gap-2'>
                <img src={`http://openweathermap.org/img/w/${weatherDetail.icon}.png`} alt="weather icon" />
                <div>
                    <p className='text-black text-xl font-semibold'>
                        {
                            unit === 'celsius'
                                ? `${weatherDetail?.celsiusTemp.toFixed(2)} °C`
                                : `${weatherDetail?.fahrenheitTemp.toFixed(2)} °F`
                        }
                    </p>
                    <p className='text-black text-lg'>City: <span className='font-semibold'>{city}</span></p>
                </div>
            </div>
            <p className='text-black text-base mt-1 font-semibold'>{weatherDetail.weatherCondition}</p>
            <p className='text-gray-500 text-base'>{weatherDetail.date}</p>
        </div>
    )
}

export default TodayWeatherCard