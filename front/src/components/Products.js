import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from '../Redux/actions/productActions';
import Loader from './FrontEndUtils/Loader';
import ProductCard from './FrontEndUtils/ProductCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import AlertComp from './AlertComp';

function Products({ categories }) {

  const [openAlert, setOpenAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const [backdrop, setBackdrop] = useState(!(window.innerWidth < 800));
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceValue, setPriceValue] = useState(priceRange);
  const { loading, error, product, resultPerPage, resultAfterFilter } = useSelector(state => state.products);


  const BackDropWhenFilter = () => {// this function is used for the mobile to use filter fumction
    setBackdrop(!backdrop);
  }

  function pageChangeHandler(event, pageNumber = 1) {
    setPage(pageNumber)
  }

  const onApplyFilter = () => {
    setBackdrop(!backdrop)
    setPriceValue(priceRange);
  }
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const onSearch = () => {
    if(keyword===""){
      setPriceValue([0,0]);
    }
    setKeyword(value);
  }
  const run = (event) => {
    if (event.key === "Enter") {
      setKeyword(value);
    }
  }

  useEffect(() => {
    
    window.scrollTo({top:0});
    if (error) {
      setMsg(error);
      setMsgType("error");
      setOpenAlert(true);
      dispatch(clearErrors());
    }
    dispatch(getProduct(priceValue, keyword, filter, page));

  }, [dispatch, error, keyword, page, priceValue, filter]);

  const handler = (e) => {
    setValue(e.target.value)
  }


  return (
    <>
      {openAlert && <AlertComp message={msg} msgType={msgType} openAlert={setOpenAlert} />}
      <>
        <div className="findbest" id="find">
          <p>Find All product</p>
          <input type="text" value={value} onChange={handler} className="searchBox" onKeyDown={(e) => run(e)} placeholder="search..." />
          <Button onClick={onSearch} className="searchBtn" >Search</Button>
        </div>
        <div className="filter">
          <Button variant="outlined" onClick={BackDropWhenFilter}>Filter</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: 2 }}
            open={backdrop}
            onClick={() => setBackdrop(!backdrop)}
          >
          </Backdrop>
        </div>
        <div className="container">
          <div className="filterBox" style={{ display: window.innerWidth < 600 ? backdrop ? "block" : "none" : "block" }}>
            <h3>Filters</h3>
            <div className="sliderBox">
              <input type="number" name="priceRange0" onChange={(e) => setPriceRange([e.target.value, priceRange[1]])} value={priceRange[0]} id="" />
              <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={0}
                max={1000000}
              />
              <input type="number" name="priceRange2" onChange={(e) => setPriceRange([priceRange[0], e.target.value])} value={priceRange[1]} id="" />
            </div>
            <Button variant="contained" color="success" size="small" sx={{ margin: "0.5rem 0", width: "100%" }} onClick={onApplyFilter}>Apply</Button>

            {categories.map((item, i) =>
              <Button key={i} color="primary" size="small" onClick={() => {
                setFilter(item)
                setBackdrop(!backdrop)
              }} sx={{ margin: "0.1rem 0", width: "100%" }} >{item}</Button>
            )}
            <Button color="error" size="small" onClick={() => {
              setFilter("")
              setPriceRange([0,0]);
              setBackdrop(!backdrop)
            }} sx={{ margin: "0.1rem 0", width: "100%" }} >Remove filter</Button>
          </div>
          {loading ? <Loader /> : <div className="productDisplayBox">
            {product && product.length > 0 ? <div className="displayProducts">
              {
                product && product.map((product, i) =>
                  <ProductCard key={i} product={product} />
                )
              }
            </div> : <h1 className='whenNothingPreview'>no products to found {keyword && "named "+keyword}</h1>}
          </div>
          }
        </div>

      </>
      <div className='pagination'>
        <Stack spacing={2}>
          <Pagination count={resultAfterFilter < 8 ? 0 : resultPerPage} size={window.innerWidth > 700 ? "large" : "small"} color="primary" onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </>
  )
}

export default Products;