import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axios';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(
                    `https://fakestoreapi.com/products`
                );
                setData(res.data);
            } catch (error) {
                console.log('error', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='w-screen h-screen'>
            {loading ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                    >
                        <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                        ></circle>
                        <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                    </svg>
                </div>
            ) : (
                <div className='container mx-auto pt-5'>
                    {data?.map((item : any) => (
                        <div key={item.id}>{item.title} - {item.price}$</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
