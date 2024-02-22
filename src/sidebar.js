import React, { useEffect, useState } from 'react';
import eventBus from './eventBus';
import { Button } from 'bootstrap';

const Sidebar = () => {

    const [dataAdded, setDataAdded] = useState(false);

    useEffect(() => {
        const val = localStorage["count"]
        let rsl = []
        console.log("o yeah ", localStorage)

        if (val) {
            for (let x = 0; x < val; x++) {
                if (!localStorage[x] || !localStorage[x].includes("#")) {
                    continue
                }
                const [name, url, id] = localStorage[x].split("#")

                rsl.push(<div class="cart-item">
                    <spam>{name}</spam>
                    <img src={url} class="card-img-top" alt="..." />

                </div>)

            }
        }
        else {
            rsl.push(<p>Add to card man!I am empty here</p>)
        }
        setDataAdded(rsl)
        const handleDataAddedEvent = () => {
            // Update state when data is added

            const val = localStorage["count"]
            let rsl = []
            console.log("o yeah ", localStorage)

            if (val) {
                for (let x = 0; x < val; x++) {
                    if (!localStorage[x] || !localStorage[x].includes("#")) {
                        continue
                    }
                    const values = localStorage[x].split("#")

                    rsl.push(<div class="cart-item">
                        <spam>{values[0]}</spam>
                        <img src={values[1]} class="card-img-top" alt="..." />

                    </div>)

                }
            }
            else {
                rsl.push(<p>Add to card man!I am empty here</p>)
            }
            setDataAdded(rsl)
            //  console.log("func", this.state)
        };

        // Subscribe to the 'dataAdded' event
        eventBus.subscribe('dataAdded', handleDataAddedEvent);

        // Clean up the subscription
        return () => {
            //   eventBus.unsubscribe('dataAdded', handleDataAddedEvent);
        };
    }, []);

    return (<div class="sidebar-right">
        <div class="sidebar">
            <button class="cart-title">CART</button>
            {dataAdded}

        </div>
    </div>)
};

export default Sidebar;