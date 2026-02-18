import About from '@/components/about';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';
import Navbar from '@/components/navbar';
import RequestForm from '@/components/request-form';
import ScheduleViewer from '@/components/schedule-viewer';
import Services from '@/components/services';
import Stats from '@/components/stats';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <HowItWorks />
      <ScheduleViewer />
      <About />
      <RequestForm />
      <Footer />
    </main>
  );
}
