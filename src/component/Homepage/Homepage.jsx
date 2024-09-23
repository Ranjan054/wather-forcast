import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchStatus } from '../../constant';
import Spinner from '../Spinner/Spinner';
import TodayWeatherCard from './components/TodayWeatherCard';
import ForcastWeatherCard from './components/ForcastWeatherCard';
import SearchModal from './components/SearchModal';
import './homepage.css'


const API_KEY = process.env.REACT_APP_API_KEY || 'check_env_for_api_key';

const { INIT, LOADING, SUCCESS, ERROR } = fetchStatus;

const Homepage = () => {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('London');
    const [unit, setUnit] = useState('celsius');
    const [fetchState, setFetchState] = useState({ status: INIT, error: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchWeather = (cityName) => {
        setFetchState({ status: LOADING, error: '' });
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
            .then(res => {
                setFetchState({ status: SUCCESS, error: '' });

                const forecastData = res.data?.list || [];
                let currentDayData = {};
                const dailyForecast = [];

                if (forecastData.length) {
                    currentDayData = {
                        date: forecastData[0].dt_txt.split(' ')[0],
                        temperature: forecastData[0].main.temp,
                        celsiusTemp: forecastData[0].main.temp - 273.15,
                        fahrenheitTemp: (forecastData[0].main.temp - 273.15) * 9 / 5 + 32,
                        weatherCondition: forecastData[0].weather[0].main,
                        icon: forecastData[0].weather[0].icon,
                    };

                    for (let i = 7; i < forecastData.length; i += 8) {
                        const dailyData = forecastData[i];
                        dailyForecast.push({
                            date: dailyData.dt_txt.split(' ')[0],
                            temperature: dailyData.main.temp,
                            celsiusTemp: forecastData[0].main.temp - 273.15,
                            fahrenheitTemp: (forecastData[0].main.temp - 273.15) * 9 / 5 + 32,
                            weatherCondition: dailyData.weather[0].main,
                            icon: dailyData.weather[0].icon,
                        });
                    }
                }

                setWeather({ currentDay: currentDayData, dailyForcast: dailyForecast });
            })
            .catch(err => {
                setFetchState({ status: ERROR, error: err?.message || 'Something went wrong' });
                console.log(err);
            })
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSelectChange = (e) => {
        setCity(e.target.value);
        toggleModal();
    };

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
    };

    console.log('wather', weather);
    console.log('city', city);


    return (
        <section className='bg-gray-50 py-16 min-h-screen'>
            <div className='container'>
                <div className='mt-6'>
                    {fetchState.status === SUCCESS && Object.keys(weather).length ? (
                        <div>
                            <div className='flex justify-end'>
                                <button onClick={() => toggleModal()} className='bg-blue-600 px-4 py-2 rounded-md shadow'>
                                    <span className='text-white text-base'>Search By City</span>
                                </button>
                            </div>

                            <div>
                                <p className='text-black text-xl font-semibold mt-5'>Today</p>
                                <div className='flex gap-4 flex-wrap justify-between items-start mt-5'>
                                    <TodayWeatherCard weatherDetail={weather?.currentDay} city={city} unit={unit} />

                                    <button onClick={() => toggleUnit()} className='bg-blue-600 px-4 py-2 rounded-md shadow'>
                                        <span className='text-white text-base'>Show in {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className='text-black text-xl font-semibold mt-8'>Next  5 days</p>
                                {weather?.dailyForcast.length ? (
                                    <div className='flex gap-4 flex-wrap mt-5'>
                                        {weather.dailyForcast.map((forcast) => (
                                            <ForcastWeatherCard key={forcast.date} dailyForcast={forcast} unit={unit} />
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                        </div>
                    ) : null}

                    {fetchState.status === LOADING ? (
                        <div className='flex justify-center mt-20'>
                            <Spinner />
                        </div>
                    ) : null}

                    {fetchState.status === ERROR ? (
                        <div className='flex justify-center mt-20'>
                            <p className='text-red-700 text-xl'>{fetchState.error}</p>
                        </div>
                    ) : null}

                </div>
            </div>

            <SearchModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                selectedValue={city}
                handleSelectChange={handleSelectChange}
            />
        </section>
    );
}

export default Homepage;