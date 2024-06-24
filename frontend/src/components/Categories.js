import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import Service from '../services/service';
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Categories({ setSelectedCategory }) {
  const [species, setSpecies] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);

    let speciesService = new Service();
    speciesService.getSpecies()
      .then(result => {
        setSpecies(result.data);
      })
      .catch(error => {
        console.error("Error fetching species:", error);
        setSpecies([]);
      });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div >
      {isMobile ? (
      
          <Dropdown>
            <DropdownButton id="dropdown-basic-button" title="Kategoriler" className='mb-4 mt-4'>
              <Dropdown.Item onClick={() => setSelectedCategory(null)}>Hepsi</Dropdown.Item>
              {species.map((item) => (
                <Dropdown.Item key={item.speciesId} onClick={() => setSelectedCategory(item.speciesId)}>
                  {item.speciesName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown>
       
      ) : (
       
          <Nav className="flex flex-col items-center mt-20">
            <div className='flex items-center justify-center '>
              <h2 className="text-2xl font-bold mb-4 border-b-4 rounded-sm border-black italic">Kategoriler</h2>
            </div>
            
            <Button className="w-[230px] mb-2 bg-blue-500 text-white" onClick={() => setSelectedCategory(null)}>Hepsi</Button>
            {species.map((item) => (
              <Button key={item.speciesId} className="w-[230px] mb-2 bg-blue-500 text-white" onClick={() => setSelectedCategory(item.speciesId)}>
                {item.speciesName}
              </Button>
            ))}
          </Nav>
      
      )}
    </div>
  );
}
