import React from 'react';
import Header from '@/components/Header';
import ScheduleWidget from '@/components/ScheduleWidget';
import Footer from '@/components/Footer';
const Index = () => {
  return <div className="hidden ">
      <Header />
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        <ScheduleWidget />
      </main>
      <Footer />
    </div>;
};
export default Index;