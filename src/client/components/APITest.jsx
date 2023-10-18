// import React, { useState, useEffect } from 'react';

// function APITest() {
//     const [data, setData] = useState({ loading: true, message: null, error: null });

//     // Define the base URL for the API
//     const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

//     useEffect(() => {
//         console.log('useEffect triggered. Starting data fetch...');
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             console.log('Starting fetch operation...');
//             const response = await fetch(`${API_BASE_URL}/api/test`);
//             console.log('Received response:', response);
            
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const contentType = response.headers.get("content-type");
//             console.log('Content-Type of the response:', contentType);

//             if (!contentType || !contentType.includes("application/json")) {
//                 throw new TypeError("Received non-JSON response");
//             }

//             const parsedData = await response.json();
//             console.log('Parsed data from response:', parsedData);

//             if (parsedData.message) {
//                 setData({ loading: false, message: parsedData.message, error: null });
//             } else {
//                 setData({ loading: false, message: null, error: "Invalid data structure received" });
//             }

//         } catch (error) {
//             console.error('Exception caught during fetch operation:', error);
//             setData({ loading: false, message: null, error: error.message });
//         }
//     };

//     return (
//         <div>
//             <h1>API Test</h1>
//             {data.loading ? (
//                 <p>Loading...</p>
//             ) : data.error ? (
//                 <div style={{ color: 'red' }}>{data.error}</div>
//             ) : (
//                 <p>{data.message}</p>
//             )}
//         </div>
//     );
// }

// export default APITest;
