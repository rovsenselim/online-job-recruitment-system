import React from "react";
import Hero from "../components/home/hero/Hero";
import HomeCard from "../components/home/homecard/HomeCard";
import SmartSearch from "../components/smartsearch/SmartSearch";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <HomeCard />
            <SmartSearch />
        </div>
    );
};

export default HomePage;
