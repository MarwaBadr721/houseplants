import React, { useState } from "react";
import "./planthouse.css";
import TotalCost from "./TotalCost";
import { togglehouseSelection } from "./housesSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./cardSlice";
const planthouse = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const cardItems = useSelector((state) => state.card);
    const avItems = useSelector((state) => state.av);
    const housesItems = useSelector((state) => state.houses);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - cardItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (cardItems[index].name === "Auditorium Hall (Capacity:200)" && cardItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (cardItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
    const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
};

const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
};

const handlehouseSelection = (index) => {
    const item = housesItems[index];
    if (item.selected && item.type === "houseForPeople") {
        // Ensure numberOfPeople is set before toggling selection
        const newNumberOfPeople = item.selected ? numberOfPeople : 0;
        dispatch(togglehouseSelection(index, newNumberOfPeople));
    }
    else {
        dispatch(togglehouseSelection(index));
    }
};

const getItemsFromTotalCost = () => {
    const items = [];
    cardItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "card" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    housesItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "houses" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        console.log(items);
        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>
                                    {item.type === "houses" || item.numberOfPeople
                                    ? ` For ${numberOfPeople} people`
                                    : item.quantity}
                                </td>
                                <td>{item.type === "houses" || item.numberOfPeople
                                    ? `${item.cost * numberOfPeople}`
                                    : `${item.cost * item.quantity}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "card") {
            cardItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "houses") {
            housesItems.forEach((item) => {
                if (item.selected) {
                  totalCost += item.cost * numberOfPeople;
                }
              });
        }
    return totalCost;
    };
    const cardTotalCost = calculateTotalCost("card");
const avTotalCost = calculateTotalCost("av");
const housesTotalCost = calculateTotalCost("houses");
    const navigateToProducts = (idType) => {
        if (idType == '#card' || idType == '#addons' || idType == '#houses') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
      }
      const totalCosts = {
        card: cardTotalCost,
        av: avTotalCost,
        houses: housesTotalCost,
    };

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#card" onClick={() => navigateToProducts("#card")} >card</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#houses" onClick={() => navigateToProducts('#houses')}>houses</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="card" className="card_container container_main">
        <div className="text">
 
          <h1>card Room Selection</h1>
        </div>
        <div className="card_selection">
          {cardItems.map((item, index) => (
            <div className="card_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {cardItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={cardItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {cardItems[index].quantity > 0 ? ` ${cardItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={cardItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {cardItems[index].quantity > 0 ? ` ${cardItems[index].quantity}` : "0"}
            </span>
            <button
              className={cardItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${cardTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="card_container container_main">


                                <div className="text">

                                    <h1> Add-ons Selection</h1>

                                </div>
                                <div className="addons_selection">
                                {avItems.map((item, index) => (
    <div className="av_data card_main" key={index}>
        <div className="img">
            <img src={item.img} alt={item.name} />
        </div>
    <div className="text"> {item.name} </div>
    <div> ${item.cost} </div>
        <div className="addons_btn">
            <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
            <span className="quantity-value">{item.quantity}</span>
            <button className=" btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
        </div>
    </div>
))}
                                </div>
<div className="total_cost">Total Cost: {avTotalCost}</div>
                            </div>

                            {/* house Section */}

                            <div id="houses" className="card_container container_main">

                                <div className="text">

                                    <h1>houses Selection</h1>
                                </div>

                                <div className="input-container card_selection">
                                <div className="input-container card_selection">
    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
    <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
        min="1"
    />
</div>
                                </div>
                                <div className="house_selection">
    {housesItems.map((item, index) => (
        <div className="house_item" key={index} style={{ padding: 15 }}>
            <div className="inner">
                <input type="checkbox" id={ `house_${index}` }
                    checked={ item.selected }
                    onChange={() => handlehouseSelection(index)}
                 />
                <label htmlFor={`house_${index}`}> {item.name} </label>
            </div>
            <div className="house_cost">${item.cost}</div>
        </div>
    ))}
</div>
<div className="total_cost">Total Cost: {housesTotalCost}</div>

                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
    <TotalCost totalCosts={ totalCosts } ItemsDisplay={() => <ItemsDisplay items={ items } />} />
</div>
                    )
                }




            </div>
        </>

    );
};

export default planthouse;
