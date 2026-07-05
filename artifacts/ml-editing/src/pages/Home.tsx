import { Hero } from '@/components/home/Hero';
import { TimelineGraphic } from '@/components/home/TimelineGraphic';
import { TimelineImages } from '@/components/home/TimelineImages';
import { TimelineAccent } from '@/components/home/TimelineAccent';
import { Services } from '@/components/home/Services';
import { Collaborations } from '@/components/home/Collaborations';
import { Portfolio } from '@/components/home/Portfolio';

export function Home() {
  return (
    <div className="w-full overflow-hidden bg-background">
      <Hero />
      <TimelineGraphic />
      <Services />
      <TimelineImages />
      <Collaborations />
      <TimelineAccent />
      <Portfolio />
    </div>
  );
}
