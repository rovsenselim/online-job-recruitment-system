import React, { useEffect, useRef, useState } from "react";
import "./AboutInfo.css";

const AboutInfo = () => {
    // Sectionlar üçün refs və state-lər
    const sectionsRef = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleSections(prev => {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            }
                            return prev;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const sections = [
        {
            title: "Our Story",
            text1:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat justo nec erat dictum, ac ultrices odio convallis.",
            text2:
                "We started with a dream to innovate and bring the best solutions to our clients, building a strong foundation over the years with dedication and hard work.",
        },
        {
            title: "Our Mission",
            text1:
                "Our mission is to empower businesses with cutting-edge technology and dedicated service, striving to exceed expectations every time.",
            text2:
                "By prioritizing innovation and integrity, we aim to make a meaningful impact in our industry and community.",
        },
        {
            title: "Our Values",
            text1:
                "Integrity, innovation, and customer satisfaction are the pillars of our work culture. We believe in transparency and long-term relationships.",
            text2:
                "Our values guide every decision we make and ensure consistent excellence in all our projects.",
        },
        {
            title: "Meet The Team",
            text1:
                "Our diverse and talented team works collaboratively to achieve excellence. Each member brings unique expertise and passion.",
            text2:
                "Together, we foster creativity, growth, and success in every endeavor we pursue.",
        },
        {
            title: "Our Future",
            text1:
                "We are committed to continuous growth and adaptation, embracing new technologies and methodologies to stay ahead.",
            text2:
                "Our vision is to be a leader in our field, setting benchmarks and inspiring innovation globally.",
        },
    ];

    return (
        <div className="about-container">
            <div className="about-hero">
                <h1>Our Journey</h1>
                <p>Building excellence with passion and innovation.</p>
            </div>

            {sections.map((section, i) => (
                <section
                    key={i}
                    className={`about-section ${i % 2 === 0 ? "slide-in-left" : "slide-in-right"
                        } ${visibleSections.includes(i) ? "visible" : ""}`}
                    ref={el => (sectionsRef.current[i] = el)}
                    data-index={i}
                >
                    <h2>{section.title}</h2>
                    <p>{section.text1}</p>
                    <p>{section.text2}</p>
                </section>
            ))}
        </div>
    );
};

export default AboutInfo;
