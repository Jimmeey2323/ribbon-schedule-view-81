
import React from 'react';
import Header from '@/components/Header';
import ScheduleWidget from '@/components/ScheduleWidget';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center p-4">
        <ScheduleWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
