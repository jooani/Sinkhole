import React from "react";
import { Link } from "react-router-dom";
import { cards } from "../data/cards";
import { Card } from "../components/ui/card";
import { PageContainer } from "../components/PageContainer";

const Home = () => {
  return (
    <PageContainer>
      <main className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-white py-16 px-8">
        <div className="w-full max-w-7xl text-center">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <Link
                to={card.link}
                key={card.title}
                className="hover:scale-[1.02] transition-transform"
              >
                <Card className="p-6 flex flex-col items-center text-center border hover:border-blue-400 group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {card.emoji}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-500 text-sm">{card.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export default Home;