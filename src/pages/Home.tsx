import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cards } from "../data/cards";
import { Card } from "../components/ui/card";
import { PageContainer } from "../components/PageContainer";

const Home = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole("USER");
      return;
    }

    fetch("https://internetprogramming.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("권한 확인 실패");
        return res.json();
      })
      .then((data) => {
        setUserRole(data.role);
      })
      .catch(() => {
        setUserRole("USER");
      });
  }, []);

  if (userRole === null) {
    return <div className="text-center mt-10">로딩 중...</div>;
  }

  const visibleCards = cards.filter((card) => {
    if (card.role && card.role !== userRole) return false;
    return true;
  });

  return (
    <PageContainer>
      <main className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-white py-16 px-8">
        <div className="w-full max-w-7xl text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {visibleCards.map((card) => (
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