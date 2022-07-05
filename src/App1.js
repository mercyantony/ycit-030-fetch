import { useEffect, useState } from "react"
import { Product } from "./Product"

const cache = {}

export const App = (props) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [item, setItem] = useState(products)
    const onSubmitHandler = (e) => {
        e.preventDefault()
        props.history.push(`/search/name${products}`)
    }

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                console.log("got products")
                setProducts(data)
            })

        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                console.log("got categories")
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        if (!selectedCategory) {
            return
        }

        if (cache[selectedCategory]) {
            setProducts(cache[selectedCategory])
            return
        }

        // console.log("hello?")
        fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                cache[selectedCategory] = data
            })
    }, [selectedCategory])

    // Get a single product

    // useEffect(() => {
    //     if (!item) {
    //         return
    //     }

    //     if (cache[item]) {
    //         setProducts(cache[item])
    //         return
    //     }
    //     fetch(`https://fakestoreapi.com/products/${item}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("Get a single product")
    //             setProducts(data)
    //             cache[item] = data
    //         })
    // }, [item])

    // return (
    //     <div className="App">
    //         {products.map((product) => {
    //             return <Product title={product.title} image={product.image} /> // This can be tedious if there are many props/properties
    //         })}
    //     </div>
    // )

    return (
        <div className="App">
            <label htmlFor="categories">Choose a category:</label>

            <select
                onChange={(e) => {
                    console.log("taco", e.target.value)
                    setSelectedCategory(e.target.value)
                }}
                value={selectedCategory}
                name="categories"
                id="categories"
            >
                <option value=""></option>
                {categories.map((category) => {
                    return (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )
                })}
            </select>
            <div style={{ padding: 10 }}>
                <form className="search" onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        name="q"
                        id="q"
                        onChange={(e) => setItem(e.target.value)}
                    ></input>
                    {item.map((value, index) => {
                        return <div key={value.id}>{value.name}</div>
                    })}{" "}
                </form>
            </div>

            {/* <div className="ProductGrid">
                {products.map((product) => {
                    return <Product key={product.id} {...product} /> // The compact way using the spread operator (babel understands)
                })}
            </div> */}
        </div>
    )

    //   return (
    //     <div className="App">
    //         {products.map((product) => {
    //             return <Product taco={product} /> // But if you do it this way, you need to make sure you update your destructuring in the child component
    //         })}

    //     </div>
    // )
}
