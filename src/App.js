import './App.css';
import { motion } from 'framer-motion';
import images from './assets'
import { useEffect, useRef, useState } from 'react';
import { Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  pagination: {
    width: '100%',
    '& .MuiPagination-ul li:first-child': {
      margin: '0 auto 0 0'
    },
    '& .MuiPagination-ul li:last-child': {
      margin: '0 0 0 auto'
    }
  }
})

function App() {
  const classes = useStyles();
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  return (
    <div className="App">
      <div style={{ width: '800px', height: '400px' }}>
        <motion.div className='carousel' ref={carousel} whileTap={{ cursor: 'grabbing' }}>
          <motion.div
            drag='x'
            dragConstraints={{ right: 0, left: -width }}
            className='inner-carousel'>
            {images.map((image) => {
              return (
                <motion.div className='item'>
                  <img src={image} alt='img' key={image} />
                </motion.div>
              );
            })
            }
          </motion.div>
        </motion.div>

        <Pagination
          className={classes.pagination}
          count={Math.round(images.length / 3)}
          shape='rounded'
        />
      </div>
    </div>
  );
}

export default App;
