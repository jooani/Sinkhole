import React from "react";
// src/components/PageContainer.tsx
import { Helmet } from 'react-helmet';
import { Navbar } from './Navbar';
import type { ReactNode } from 'react';

interface Props { children: ReactNode; pageTitle?: string }

export function PageContainer({ children, pageTitle }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Helmet>
        <title>{pageTitle ?? '싱크홀 제보 센터'}</title>
      </Helmet>

      <Navbar />

      <main className="flex-1 w-full overflow-auto self-stretch">{children}</main>
    </div>
  );
}