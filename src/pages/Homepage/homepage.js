import React, { useState } from 'react'
import '../../assets/scss/Layout/homepage.scss'


export default function Homepage() {

    let farms = [{ name: 'farm1' }, { name: 'farm2' }, { name: 'farm3' }]

    let [farm, setFarm] = useState("");

    let [firstAccess, setFirstAccess] = useState(true);

    const renderContent = () => {
        if (firstAccess) {
            return <div className="popupFarms">
                <Dropdown.Button onClick={handleButtonClick()} overlay={menu}>
                    Dropdown
                </Dropdown.Button>
            </div>
        }
        else {
            return <div className="showContent">
                <div className="chose__farm">
                </div>
                <div className="content">
                    <p>aaaa</p>
                </div>
            </div>
        }
    }

    return (
        <div className="homepage">
            {renderContent()}
        </div>
    )
}
