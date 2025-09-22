"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-full py-3 px-4 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg border-t border-orange-500 sticky top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/Logo.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="w-full h-full object-contain overflow"
            />
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-white/95 rounded-full flex items-center justify-center overflow-visible">
            <Image
              src="/national_emblem.svg"
              alt="Logo"
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              YatraBook
            </h1>
            {/* <p className="text-xs sm:text-sm text-orange-600 font-medium font-sans">
              Integrated Tourism Safety & Travel Management
            </p> */}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <Link
            href="#hero"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            About
          </Link>
          <Link
            href="#services"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Features
          </Link>
          <Link
            href="#portal"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Dashboard
          </Link>
          <Link
            href="#demo"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Demo
          </Link>
          <Link
            href="#contact"
            className="text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg border-2 border-orange-500 font-semibold transition-all transform hover:scale-105 font-sans text-xs sm:text-md">
            Login
          </button>
        </div>
      </nav>

      <div className="w-full h-[3px] bg-gradient-to-r from-orange-500 via-gray-300 to-gray-900"></div>
    </>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      title: "Integrated Tourism Safety & Travel Management",
      subtitle: "YatraBook - Complete Travel Solution",
      description:
        "Comprehensive digital platform empowering travelers and tourism authorities with real-time safety features, seamless travel management, and blockchain-secured compliance for Northeast India and beyond.",
      bgImage: "/bg1.jpg", // Add your background images
      fgImage: "/LoraWatch.jpg", // Add your foreground images
    },
    {
      title: "Advanced Emergency Safety System",
      subtitle: "AI-Powered SOS & LoRa Mesh Technology",
      description:
        "Automated emergency response with GPS tracking, multi-channel alerts via app, WhatsApp, and SMS. Extended coverage through LoRa mesh networks for remote areas.",
      bgImage: "/bg2.jpg",
      fgImage: "/LoraWatch.jpg",
    },
    {
      title: "Blockchain-Secured Travel Compliance",
      subtitle: "Tamper-Proof Permit & Trip Management",
      description:
        "Every trip, permit, and emergency event securely logged on blockchain for verifiable audit trails, enhanced trust, and seamless compliance management.",
      bgImage: "/bg3.jpg",
      fgImage: "/LoraWatch.jpg",
    },
    {
      title: "Smart Authority Dashboard",
      subtitle: "Real-time Monitoring & Response Coordination",
      description:
        "Advanced web interface for tourism departments to monitor movements, receive alerts, track permit compliance, and coordinate rapid emergency responses.",
      bgImage: "/bg4.jpg",
      fgImage: "/LoraWatch.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Determine if current slide should have image on right (even indices) or left (odd indices)
  const isImageOnRight = currentIndex % 2 === 0;

  return (
    <section
      id="hero"
      className="relative h-[calc(100vh-70px)] w-full overflow-hidden"
    >
      {/* Background Images with Blur */}
      {slides.map((slide, index) => (
        <div
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.bgImage}
            alt={`Background for ${slide.title}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-orange-600/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div
              className={`text-white col-span-2 ${
                isImageOnRight
                  ? "order-1 lg:order-1"
                  : "order-2 lg:order-2 lg:col-start-2"
              }`}
            >
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-lg lg:text-xl text-orange-200 font-medium font-sans tracking-wide">
                  {slides[currentIndex].subtitle}
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl italic md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight font-sans">
                {slides[currentIndex].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-8 sm:mb-10 text-gray-100 leading-relaxed font-sans font-light">
                {slides[currentIndex].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 lg:px-6 py-1 sm:py-2 lg:py-2 rounded-md font-semibold transition-all transform hover:scale-105 shadow-xl border border-orange-500 text-sm lg:text-lg font-sans">
                  Explore Platform
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.yatrabook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white hover:bg-white hover:text-gray-900 text-white px-4 sm:px-2 lg:px-3 py-1 sm:py-2 lg:py-2 rounded-full font-semibold transition-all text-xs lg:text-sm font-sans text-center flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.523,7.969c0.154,0.138,0.309,0.277,0.463,0.415c0.771,0.691,1.156,1.729,1.156,2.846c0,1.117-0.385,2.154-1.156,2.846c-0.154,0.138-0.309,0.277-0.463,0.415l-4.477,4.015c-0.844,0.757-2.008,1.171-3.277,1.171s-2.433-0.414-3.277-1.171l-4.477-4.015c-0.154-0.138-0.309-0.277-0.463-0.415C0.378,13.384,0,12.347,0,11.23s0.378-2.154,1.152-2.846c0.154-0.138,0.309-0.277,0.463-0.415l4.477-4.015C7.637,2.979,8.801,2.565,10.07,2.565s2.433,0.414,3.277,1.171L17.523,7.969z M13.269,6.026L10.07,3.75c-0.844-0.757-2.008-1.171-3.277-1.171s-2.433,0.414-3.277,1.171L0.314,6.757C-0.112,7.179-0.112,7.854,0.314,8.276s1.111,0.422,1.537,0l3.277-2.934c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447L4.167,9.576c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0L8.982,8.05c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447L7.221,12.43c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0l3.278-2.934c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447l-3.278,2.934c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0l3.278-2.934c0.844-0.757,1.304-1.795,1.304-2.946s-0.46-2.189-1.304-2.946L13.269,6.026z" />
                    </svg>
                    Download for Android
                  </a>
                  <a
                    href="https://apps.apple.com/app/yatrabook/id123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white hover:bg-white hover:text-gray-900 text-white px-4 sm:px-2 lg:px-3 py-1 sm:py-2 lg:py-2 rounded-full font-semibold transition-all text-xs lg:text-sm font-sans text-center flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    Download for iOS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foreground Image - Positioned to extend and get cut */}
        <div
          className={`absolute w-1/3 h-2/3 top-1/2 overflow-hidden transform -translate-y-1/2 z-30 transition-all duration-1000 ease-in-out ${
            isImageOnRight
              ? "right-0 rounded-l-full order-2 lg:order-2 animate-slide-in-right"
              : "left-0 rounded-r-full order-1 lg:order-1 animate-slide-in-left"
          }`}
          key={`image-container-${currentIndex}`}
        >
          <div className="relative">
            {slides.map((slide, index) => (
              <div
                key={`fg-${index}`}
                className={`transition-opacity bg-white duration-1000 overflow-hidden ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <Image
                  src={slide.fgImage}
                  alt={`Feature image for ${slide.title}`}
                  width={700}
                  height={700}
                  className="object-contain drop-shadow-2xl"
                  style={{
                    transform: isImageOnRight
                      ? "translateX(0%)"
                      : "translateX(0%)",
                  }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REMOVE Slide Indicators */}
      {/* <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex space-x-2 sm:space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full transition-colors ${
              index === currentIndex ? "bg-orange-500" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            About YatraBook
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-orange-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Comprehensive digital solution for tourism safety and travel
            management
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              YatraBook is a comprehensive digital solution designed to empower
              travelers and tourism authorities with real-time safety features
              and seamless travel management. Our platform is especially focused
              on tourism in sensitive regions like Northeast India, where
              safety, compliance, and connectivity pose unique challenges.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              Through innovative features like role-adaptive mobile apps,
              AI-powered guides, blockchain-enabled security, and LoRa mesh
              network integration, YatraBook ensures travelers can explore
              confidently while authorities maintain comprehensive oversight and
              rapid response capabilities.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-orange-500 to-gray-900 rounded-xl mb-3 sm:mb-4 flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base lg:text-lg font-sans">
                  📱 Role-Adaptive Mobile App
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-center text-base sm:text-lg font-sans">
                Smart Travel Companion
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 text-center font-sans">
                Switches to Tourist Mode with enhanced safety features
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-gray-900 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 flex items-center font-sans">
                <span className="mr-3 sm:mr-4 text-3xl sm:text-4xl lg:text-5xl">
                  🛡️
                </span>
                Safety & Security Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Emergency SOS System",
                  "Blockchain Security",
                  "LoRa Mesh Network",
                  "AI Travel Assistant",
                  "Permit Management",
                  "Real-time Monitoring",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-3 sm:mr-4"></span>
                    <span className="text-sm sm:text-base font-sans">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-gray-200 to-white rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
                  <span className="text-gray-900 font-semibold text-sm sm:text-base font-sans">
                    🖥️ Authority Dashboard
                  </span>
                </div>
                <h4 className="font-bold text-center text-base sm:text-lg font-sans">
                  Command & Control Center
                </h4>
                <p className="text-xs sm:text-sm text-center mt-2 sm:mt-3 opacity-90 font-sans">
                  Real-time monitoring and emergency response coordination
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: "🚨",
      title: "Emergency SOS System",
      desc: "Manual or automatic SOS triggers with live GPS location, voice descriptions, and multi-channel alerts via app, WhatsApp, and SMS to contacts and authorities.",
      border: "border-orange-500",
      bg: "bg-orange-100",
    },
    {
      icon: "🤖",
      title: "AI-Powered Travel Guide",
      desc: "Multilingual AI assistant providing real-time local insights, cultural tips, destination information, and personalized itinerary recommendations.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
    {
      icon: "⛓️",
      title: "Blockchain Security",
      desc: "Every trip, permit, and emergency event securely logged on blockchain for tamper-proof verification and enhanced trust in tourism management.",
      border: "border-orange-500",
      bg: "bg-orange-100",
    },
    {
      icon: "📡",
      title: "LoRa Mesh Network",
      desc: "Extended coverage through LoRa-based devices and wearable watches for emergency signals and location data in remote areas without cellular coverage.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
    {
      icon: "📱",
      title: "Role-Adaptive App",
      desc: "Personalized experience that switches to 'Tourist Mode' when entering geofenced regions, activating enhanced safety features and compliance tools.",
      border: "border-orange-500",
      bg: "bg-orange-100",
    },
    {
      icon: "📋",
      title: "Permit Management",
      desc: "Automated management of travel documents like Inner Line Permits with QR-based scanning for checkpoint simplicity and compliance tracking.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
  ];

  return (
    <section
      id="services"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            Platform Features
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-orange-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Comprehensive features designed for safe and seamless travel
            experiences
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 ${service.border}`}
            >
              <div className="text-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                >
                  <span className="text-xl sm:text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 font-sans">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 flex items-center font-sans">
                <span className="mr-3 sm:mr-4 text-3xl sm:text-4xl lg:text-5xl">
                  🌐
                </span>
                Network Infrastructure
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans font-light">
                Our advanced LoRa mesh network provides seamless connectivity
                across remote tourist destinations, ensuring safety and
                communication continuity.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    99.9% Network Uptime
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    15km Range Coverage
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    Low Power Consumption
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-orange-500 to-gray-900 rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/LoraMesh2.png"
                  alt="LoRa Network Infrastructure Map showing wireless sensors and mesh gateways"
                  width={400}
                  height={300}
                  className="w-full h-full object-fit rounded-lg sm:rounded-xl"
                />
              </div>
              <h4 className="font-bold text-gray-900 text-center font-sans text-base sm:text-lg">
                Network Visualization
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 text-center font-sans">
                Real-time network status and coverage mapping
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortalSection = () => {
  const workflowSteps = [
    {
      icon: "📱",
      title: "Smart Registration",
      desc: "Travelers register and switch to Tourist Mode in geofenced areas",
      color: "bg-orange-100",
    },
    {
      icon: "🛡️",
      title: "Safety Monitoring",
      desc: "Real-time tracking with AI guide assistance and permit compliance",
      color: "bg-gray-100",
    },
    {
      icon: "🚨",
      title: "Emergency Response",
      desc: "Automatic SOS triggers with multi-channel alerts to authorities",
      color: "bg-orange-100",
    },
    {
      icon: "⛓️",
      title: "Blockchain Logging",
      desc: "All activities securely recorded for verification and audit trails",
      color: "bg-gray-100",
    },
  ];

  const wearableFeatures = [
    "Emergency SOS Button",
    "GPS Location Tracking",
    "Mesh Network Relay",
    "Health Monitoring",
  ];

  return (
    <section
      id="portal"
      className="py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            Authority Dashboard
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-orange-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Advanced web interface for tourism departments and law enforcement
            agencies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-sans">
              LoRa Safety Wearables
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans font-light">
              LoRa-enabled safety watches and devices provide tourists with
              emergency communication capabilities even in remote locations,
              ensuring help is always within reach through mesh network
              connectivity.
            </p>
            <div className="space-y-4 sm:space-y-5">
              {wearableFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="w-full h-60 sm:h-72 lg:h-80 bg-gradient-to-br from-orange-500 to-gray-900 rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg lg:text-xl font-sans">
                  📊 Real-time Dashboard
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-center text-lg sm:text-xl font-sans">
                Comprehensive Monitoring
              </h3>
              <p className="text-sm text-gray-600 mt-2 sm:mt-3 text-center font-sans">
                Instant access to tourist data and emergency alerts
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans">
              How YatraBook Works
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              A comprehensive four-step process ensuring traveler safety and
              administrative oversight
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${step.color} border border-gray-200`}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 font-sans">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DemoSection = () => {
  return (
    <section
      id="demo"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            See YatraBook in Action
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-orange-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Experience our integrated tourism safety and travel management
            platform
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="relative w-full aspect-video">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4">
                  ▶️
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 font-sans">
                  Platform Demo
                </h3>
                <p className="text-sm sm:text-base opacity-90 font-sans">
                  YatraBook Complete Solution Overview
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans">
              Experience the Future of Safe Travel
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              This comprehensive demo showcases our role-adaptive mobile app,
              emergency response system, blockchain security, authority
              dashboard, and LoRa mesh integration working together seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.yatrabook"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-xl text-sm sm:text-base font-sans text-center flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.523,7.969c0.154,0.138,0.309,0.277,0.463,0.415c0.771,0.691,1.156,1.729,1.156,2.846c0,1.117-0.385,2.154-1.156,2.846c-0.154,0.138-0.309,0.277-0.463,0.415l-4.477,4.015c-0.844,0.757-2.008,1.171-3.277,1.171s-2.433-0.414-3.277-1.171l-4.477-4.015c-0.154-0.138-0.309-0.277-0.463-0.415C0.378,13.384,0,12.347,0,11.23s0.378-2.154,1.152-2.846c0.154-0.138,0.309-0.277,0.463-0.415l4.477-4.015C7.637,2.979,8.801,2.565,10.07,2.565s2.433,0.414,3.277,1.171L17.523,7.969z M13.269,6.026L10.07,3.75c-0.844-0.757-2.008-1.171-3.277-1.171s-2.433,0.414-3.277,1.171L0.314,6.757C-0.112,7.179-0.112,7.854,0.314,8.276s1.111,0.422,1.537,0l3.277-2.934c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447L4.167,9.576c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0L8.982,8.05c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447L7.221,12.43c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0l3.278-2.934c0.446-0.4,1.071-0.4,1.517,0s0.446,1.047,0,1.447l-3.278,2.934c-0.426,0.382-0.426,1.025,0,1.407s1.111,0.382,1.537,0l3.278-2.934c0.844-0.757,1.304-1.795,1.304-2.946s-0.46-2.189-1.304-2.946L13.269,6.026z" />
                </svg>
                Download for Android
              </a>
              <a
                href="https://apps.apple.com/app/yatrabook/id123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all text-sm sm:text-base font-sans text-center flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                Download for iOS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-500 text-white py-8 sm:py-12 lg:py-16 min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 tracking-tight font-sans">
            Ready to Transform Tourism Safety?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Join tourism authorities and travelers who trust YatraBook for safe,
            secure, and seamless travel experiences. Contact us today to explore
            our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all transform hover:scale-105 border-2 border-orange-500 text-sm sm:text-base font-sans">
              Get Started
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-600">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              📞 Contact YatraBook
            </h3>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📧 contact@yatrabook.com
            </p>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📞 +91-99999-99999
            </p>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📞 +91-99999-99999
            </p>
            <p className="text-gray-300 font-sans text-xs sm:text-sm">
              🏢 YatraBook, New Delhi, India - 000000
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              🔗 Quick Links
            </h3>
            <div className="space-y-1">
              <a
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                About YatraBook
              </a>
              <a
                href="#services"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Platform Features
              </a>
              <a
                href="/mobile-app"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Mobile App
              </a>
              <a
                href="/authority-portal"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Authority Portal
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              📋 Platform Info
            </h3>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="text-gray-300 font-sans">
                • Integrated tourism safety platform
              </p>
              <p className="text-gray-300 font-sans">
                • Blockchain-secured compliance
              </p>
              <p className="text-gray-300 font-sans">
                • LoRa mesh network support
              </p>
              <p className="text-gray-300 font-sans">
                • AI-powered travel assistance
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-600">
          <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
            © 2025 YatraBook. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-sans">
            Empowering safe travel through innovative technology | Privacy
            Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen font-sans antialiased overflow-x-hidden">
      <style jsx global>{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%) translateY(0%);
            opacity: 0;
          }
          100% {
            transform: translateX(0%) translateY(0%);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          0% {
            transform: translateX(100%) translateY(0%);
            opacity: 0;
          }
          100% {
            transform: translateX(0%) translateY(0%);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-in-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-in-out;
        }
      `}</style>
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <PortalSection />
      <DemoSection />
      <ContactSection />
    </main>
  );
}
