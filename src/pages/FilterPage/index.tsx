import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/requests';
import { Car } from '../../types/car';
import CarCard from 'components/CarCard';
import FilterBar from 'components/Filterbar';
import Navbar from 'components/Navbar'
import { Container, Row, Col } from "react-bootstrap";
import { Rental } from 'types/rental';

function Home() {

    const [cars, setCars] = useState<Car[]>([]);
    const [rental, setRental] = useState<Rental>();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/cars`)
            .then(response => {
                const data = response.data as Car[];
                console.log(data)
                setCars(data);
            });
    }, []);



    const RenderCars = (car: Car) => {
    

        if (car.statusAvailability == true) {            
            return (
                <Col key={car.id}>
                    <CarCard car={car} />
                </Col>
            )
        }
    }

    return (
        <>
            <Navbar />
            <Row className='mx-0 vh-100-navbar'>
                <Col md="3" className='px-0'>
                    <FilterBar />
                </Col>
                <Col md="9" className=''>
                    <Container className='my-4'>
                        <Row xs={1} md={3} className="g-1">
                            {cars.map(car => (
                                RenderCars(car)
                            ))}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </>

    )
}

export default Home;