import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import {getProducts, getCategories, getFilteredProducts} from './apiCore';
import Card from './Card';
import Checkbox from './Checkbox';
import {prices} from "./FixedPrice";
import RadioBox from "./RadioBox";
import Search from "./Search"

const Shop = () =>{
    const [myFilters, setMyFilters] = useState({
        filters:{category:[], price:[]}
    });
    const [categories, setCategories]=useState([]);
    const [error, setError]=useState(false);
    const [limit, setLimit]=useState(6);
    const [skip, setSkip]=useState(0);
    const [size, setSize]=useState(0);
    const [filteredResults, setFilteredResults]=useState([]);
    


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredProduct = (newFilters) =>{
        //console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    };


    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };


    useEffect(()=>{
        init();
        loadFilteredProduct(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) =>{
       const newFilters={...myFilters};
       newFilters.filters[filterBy]=filters;

       if(filterBy == "price"){
           let priceValues = handlePrice(filters);
           newFilters.filters[filterBy] =priceValues;
       }
       loadFilteredProduct(myFilters.filters)
       setMyFilters(newFilters);
    };

    const handlePrice = value =>{
        const data = prices
        let array =[]

        for (let key in data){
            if(data[key]._id ===parseInt(value)){
                array = data[key].array
            }
        }
        return array
    };



    return(
        <Layout title="Shop Page" description="Ecommerce" className="container-fluid">
       
        <div className="row">
            <div className="col-2">
                <h4>Filter By Categories</h4>
                <ul> 
                    <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters,"category")}/>
                </ul>
                
                <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
            </div>
            <div className="col-8">
               <h2 className="mb-4">Products</h2>
               <div className="row">
               {filteredResults.length === 0 ? (
                  <div className="col text-title text-center">
                    NO PRODUCTS FOUND
                  </div>
                ) : (
                  filteredResults.map((product,i) => {
                    return <div key={i} className= "col-4 mb-3"> 
                    <Card  product={product}/>
                    </div>
                  })
                )}
               </div>
               <hr/>
               {loadMoreButton()}
            </div>
        </div>
        </Layout>
    );  
};

export default Shop;


