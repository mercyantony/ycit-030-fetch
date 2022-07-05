import React, { useState, useEffect } from "react"
import "../styles.css"

export const Products = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch("https://fakestoreapi.com/products")
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="product-container">
            {loading && (
                <div>
                    {" "}
                    <h1 className="loadingh1">Loading...</h1>
                </div>
            )}

            {data.map((product) => (
                <div key={product.id} className="card">
                    <div>
                        <img src={product.image} alt="#" />
                    </div>
                    <div className="card-description">
                        <h6>{product.title}</h6>
                        <h6>{`Price: $${product.price}`}</h6>
                        <h6>{`Category: ${product.catetory}`}</h6>
                        <button className="btn">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
