"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

export default function AboutPage() {
  const [visibleMembers, setVisibleMembers] = useState<number[]>([]);

  useEffect(() => {
    // Animate team members in sequence
    const timer = setTimeout(() => {
      teamMembers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleMembers((prev) => [...prev, index]);
        }, index * 200); // Stagger animation by 200ms
      });
    }, 500); // Start after 500ms

    return () => clearTimeout(timer);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: "Andreas Kevin Sulivan",
      role: "Back-End Developer",
      image: "/amgok.png",
      description:
        "Experienced in developing efficient backend systems and database architecture.",
    },
    {
      name: "Stephanie Caroline Cen",
      role: "Front-End Developer",
      image: "/step.png",
      description:
        "Specializes in creating beautiful and responsive user interfaces.",
    },
    {
      name: "Nikolaus Ray Nathan",
      role: "Front-End Developer",
      image: "/nath.png",
      description:
        "Specializes in creating beautiful and responsive user interfaces.",
    },
    {
      name: "Cinta Chantika Lestari",
      role: "Machine Learning Engineer",
      image: "/cinta.png",
      description:
        "Specializes in creating beautiful and responsive user interfaces.",
    },
    {
      name: "Tok Se Ka",
      role: "Machine Learning Engineer",
      image: "/seka.png",
      description:
        "Skilled developer with expertise in building robust and scalable applications.",
    },
    {
      name: "Chatarina Evangelista Sitorus",
      role: "Machine Learning Engineer",
      image: "/chat.png",
      description:
        "Expert in data analysis and machine learning implementations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <Header />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-emerald-600/30 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-fade-in-up">
            <div className="w-2 h-2 bg-emerald-700 rounded-full animate-pulse"></div>
            <span className="text-emerald-800 font-medium">
              Meet Our Amazing Team
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-700 to-teal-300 mb-6 leading-tight animate-fade-in-up animation-delay-200">
            About Our Team
          </h1>

          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <p className="text-xl md:text-2xl text-emerald-900/90 leading-relaxed mb-8">
              We are a dedicated team of professionals working together to bring
              you the best
              <span className="text-emerald-600 font-semibold">
                {" "}
                fruit identification
              </span>{" "}
              and
              <span className="text-emerald-600 font-semibold">
                {" "}
                information service
              </span>
              .
            </p>
            <p className="text-lg text-emerald-800/80">
              Our mission is to help people learn more about fruits and their
              benefits through innovative technology.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group relative flex flex-col bg-white/60 backdrop-blur-md shadow-md rounded-3xl p-8 items-center transition-all duration-700 hover:scale-105 transform ${
                visibleMembers.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transitionDelay: visibleMembers.includes(index)
                  ? "0ms"
                  : `${index * 200}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-emerald-500/90 group-hover:border-emerald-600 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/30">
                <Image
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="scale-150 group-hover:scale-170 transition-transform duration-700"
                />

                {/* Floating glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              {/* Name with slide-in animation */}
              <h3 className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-800 transition-all duration-300 mb-4 text-center transform group-hover:scale-105">
                {member.name}
              </h3>
              {/* Role Card - Hidden by default, elegant slide-up on hover */}
              <div className="relative mb-4 h-0 group-hover:h-10 transition-all duration-500 ease-out">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100">
                  <div className="bg-gradient-to-r from-emerald-600/90 to-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-emerald-400/50 shadow-xl w-auto whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {member.role}
                    </div>
                  </div>
                </div>
              </div>
              {/* Description with enhanced hover effect */}
              <p className="text-emerald-600/80 leading-relaxed group-hover:text-emerald-800 transition-all duration-300 text-center max-w-xs group-hover:transform group-hover:scale-105">
                {member.description}
              </p>
              {/* Animated hover indicators */}
              <div className="flex gap-1 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <Footer />

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        .animation-delay-1400 {
          animation-delay: 1.4s;
        }
        .animation-delay-1600 {
          animation-delay: 1.6s;
        }
        .animation-delay-1800 {
          animation-delay: 1.8s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes countUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-count-up {
          animation: countUp 0.6s ease-out forwards;
        }

        /* Enhanced hover effects */
        .group:hover .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
