import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000"
            style={{ height: '600px', width: '350px' }}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://cdn.mwallpapers.com/photos/celebrities/nature/fall-nature-background-21319-hd-wallpaper-maps-android-iphone-hd-wallpaper-background-downloadhd-wallpapers-desktop-background-android-iphone-1080p-4k-aikyg.jpg"
            style={{ height: '600px', width: '350px' }}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1357428.jpg"
            style={{ height: '600px', width: '350px' }}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
