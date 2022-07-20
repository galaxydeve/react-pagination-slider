import './App.css';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import images from './assets'
import { useEffect, useRef, useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles({
  pagination: {
    width: '100%',
    '& .MuiPagination-ul li:first-child': {
      margin: '0 auto 0 0'
    },
    '& .MuiPagination-ul li:last-child': {
      margin: '0 0 0 auto'
    },
    '& .Mui-selected': {
      backgroundColor: '#0052FF !important',
      color: 'white'
    },
  },
  selected: {

  }
})

function App() {
  const classes = useStyles();
  const [width, setWidth] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [location, setLocation] = useState(0);
  const carousel = useRef();
  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])
  const x = useMotionValue(0)
  const spring = useSpring(x);

  useEffect(() => {
    // setInterval(() => {
    //   x.set(x.get() + 10)
    // }, 1000)
    console.log('x=', x.current);
    const pn = Math.floor(x.current / (240 * 3))

    setPageNumber(pn ? pn : 1)
  }, [x])

  return (
    <div className="App">
      <div style={{ width: '800px', height: '400px' }}>
        <motion.div className='carousel' ref={carousel} whileTap={{ cursor: 'grabbing' }}>
          <motion.div
            // drag='x'
            dragConstraints={{ right: 0, left: -width }}
            onChange={(e) => {
              console.log(e);
            }}
            style={{ x: spring }}
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
          page={pageNumber}
          defaultPage={1}
          onChange={(event, page) => {
            setPageNumber(page);
            x.set(-(page - 1) * 3 * 240);
          }}
          renderItem={(item) => {
            // console.log(item);
            return (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )
          }}
        // renderItem={(item) => { <PaginationItem {...item} classes={{selected: classes.selected}}></PaginationItem> }}
        />
      </div>
    </div>
  );
}

export default App;
