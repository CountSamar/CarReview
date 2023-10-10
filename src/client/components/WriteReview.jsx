import React, { useState, useEffect } from 'react';

const make = ['Buick','Chevrolet','Dodge','Ford','Honda','Jeep','Lincoln','Toyota']
const model = {
    Buick: ['LeSabre', 'Regal', 'Encore', 'Cascada'],
    Chevrolet: ['Camaro', 'Corvette', 'Tahoe', 'Blazer', 'Trailblazer', 'Equinox', 'Silverado', ],
    Dodge: ['Challenger', 'Charger', 'Durango', 'Caravan', 'Ramcharger', 'Nitro', 'Space Van',],
    Ford: ['F-150', 'Mustang', 'Ranger', 'Explorer', 'Escape', 'Edge', 'Expedition', 'Bronco', 'Torus'],
    Honda: ['Civic', 'Accord', 'Freed', 'Avancier', 'Passport', 'Pilot', 'N-Van', 'Ridgeline', 'Amaze'],
    Jeep: ['Wagoneer', 'Wrangler', 'Avenger', 'Cherokee', 'Compass', 'Commander', 'Renegade', 'Gladiator'],
    Lincoln: ['Corsair', 'Nautilus', 'Aviator', 'Navigator', 'Blackwood', 'Capri', 'Continental', 'Cosmopolitan'],
    Toyota: ['Corella', 'Camry', 'RAV4', 'Tacoma', 'Supra', 'Tundra', '4Runner', 'Highlander', 'Sequola', 'Avalan', 'Prius']
}
const year = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

const WriteReview = () => {
    const [selectMake, setSelectMake] = useState('')
    const [selectModel, setSelectModel] = useState('')
    const [selectYear, setSelectYear] = useState('')
    const [reviewText, setReviewText] = useState('');
    const [image, setImage] = useState(null);

    const handleSelect = (value, setter) => {
        setter(value);
     
        if (setter === setSelectMake) {
          setSelectModel('');
          setSelectYear('');
        } else if (setter === setSelectModel) {
          setSelectYear('');
        }
      };


  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = () => {
    // Handle the submission of review data (image, text, etc.)
    console.log('Submit Review:', {
      selectMake,
      selectModel,
      selectYear,
      reviewText,
      image
    });
  };

    return (
    <>
         <div className='box'>
                <div className='scroll-item'>
                    <h3>Select a car Make:</h3>
                    <select value={selectMake} onChange={(e) => handleSelect(e.target.value, setSelectMake)}>
                        <option value=''>Select Make</option>
                        {make.map((make) => (
                            <option key={make} value={make}>
                                {make}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='scroll-item'>
                    <h3>Select a car Model:</h3>
                    <select value={selectModel} onChange={(e) => handleSelect(e.target.value, setSelectModel)} disabled={!selectMake}>
                        <option value=''>Select Model</option>
                        {model[selectMake]?.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='scroll-item'>
                    <h3>Select a car Year:</h3>
                    <select value={selectYear} onChange={(e) => handleSelect(e.target.value, setSelectYear)} disabled={!selectModel}>
                        <option value=''>Select Year</option>
                        {year.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='scroll-item'>
                     <h3>Upload an image:</h3>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>

                <div className='scroll-item'>
                <h3>Write your review (max 500 characters):</h3>
                <textarea
                    value={reviewText}
                    onChange={handleReviewTextChange}
                    maxLength={500}
                    rows={5}
                    placeholder="Type your review here..."
                    />
                </div>

            <button onClick={handleSubmit}>Submit Review</button>
            </div>
      </>
    );
}

export default WriteReview;