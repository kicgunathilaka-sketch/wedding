import { CustomCursor }  from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Navigation }     from '@/components/layout/Navigation'
import { Hero }           from '@/components/sections/Hero'
import { OurStory }       from '@/components/sections/OurStory'
import { Countdown }      from '@/components/sections/Countdown'
import { EventDetails }   from '@/components/sections/EventDetails'
import { Gallery }        from '@/components/sections/Gallery'
import { RSVP }           from '@/components/sections/RSVP'
import { Location }       from '@/components/sections/Location'
import { Family }         from '@/components/sections/Family'
import { DayTimeline }    from '@/components/sections/DayTimeline'
import { ThankYou }       from '@/components/sections/ThankYou'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main>
        <Hero />
        <OurStory />
        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVP />
        <Location />
        <Family />
        <DayTimeline />
      </main>

      <ThankYou />
    </>
  )
}
