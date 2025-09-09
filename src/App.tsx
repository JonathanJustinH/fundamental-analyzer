import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

import Home from "./pages/home"
import CotData from "./pages/cotData";
import NFPData from "./pages/nfpData";
import CPIData from './pages/cpiData';
import PCEData from './pages/pceData';
import PPIData from './pages/ppiData';
import ReSaData from './pages/reSalesData';
import InitialJobsData from './pages/initialJobData';
import ManuPMIData from './pages/manuPMIData';
import ServPMIData from './pages/servPMIData';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Router>
            <Header onMenuClick={() => setIsOpen(!isOpen)} />
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="page">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cot-data" element={<CotData />} />
                    <Route path="/nfp-data" element={<NFPData />} />
                    <Route path='/cpi-data' element={<CPIData />}/>
                    <Route path='/pce-data' element={<PCEData />}/>
                    <Route path='/ppi-data' element={<PPIData />}/>
                    <Route path='/manufacturing-pmi-data' element={<ManuPMIData />}/>
                    <Route path='/services-pmi-data' element={<ServPMIData />}/>
                    <Route path='/retail-sales-data' element={<ReSaData />}/>
                    <Route path='/initial-jobs-data' element={<InitialJobsData />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
