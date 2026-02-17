'use client';
import { useState } from 'react';
import SplashCursor from './components/SplashCursor';
import PartyBuilder from './components/PartyBuilder';

export default function AdventureAwaits() {
  const [splashActive, setSplashActive] = useState(false);

  return (
    <>
      {splashActive && <SplashCursor />}
    <main className="min-h-screen px-6 pt-12 pb-0 md:px-12 md:pt-20 md:pb-0">
      <article className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
            # Come Build the Future
          </h2>
        </header>

        <div className="space-y-6 text-base leading-relaxed">

          {/* --- 1. WHY — THE BELIEF --- */}

          <p>
            In the future, every company will have AI employees — autonomous, always on, working next to humans. Not just tools. Colleagues.
          </p>

          <p>
            OpenClaw proved that people want this. 200K stars in 3 months. People love it because it gives them their own agent. Proactive. Connecting tools and communication. The ability to automate. To program with words.
          </p>

          <p>
            <em>It feels like magic.</em>
          </p>

          <p>
            But it&apos;s built for individuals, not companies. No identity layer. No permissions. No security.
          </p>

          <p>
            We can build this. Give every employee an agent they program with words. Give them magic.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          {/* --- 2. THE TEAM --- */}

          <p>
            For the first time in a long time, I&apos;ve seen a glimpse of the future — and I know how we get there. I want to build and lead this company. And I want to <em>build it with friends</em>. People I&apos;d hang with even when not working. You&apos;re reading this because I count you among them.
          </p>

          <p>
            <strong>Felix:</strong> You once told me your perfect startup would embrace the quirky design taste you so clearly have. Well, here we are. Not quite physical robots — but one step removed. I don&apos;t want a future with soulless agents. I want agents as unique and quirky as Star Wars droids. Witty. Opinionated. Unique. We need your creativity and edginess to stand out. Our brand should be as distinctive as our product. &quot;Trace anatomy.&quot; Fucking amazing. Build a global PLG motion from scratch. And yes, our brand color can be <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: '#ed702e', color: '#ffffff' }}>orange</span>.
          </p>

          <p>
            <strong>Nimar:</strong> Last summer I asked whether I should join LF. Your own words were that the only reason you could think of not to was that I&apos;d be &quot;just working on a SaaS app and not on AI.&quot; Now is the era of agents. Orchestration. Cognition. Memory. These are inherently interesting problems. Do you want to build SaaS for the rest of your life? <em>Or do you want to come with me and change the world?</em>
          </p>

          <p>
            This is no small ask. Four years between PMF and the ideation maze — I know that was painful. But here is an opportunity to catapult past those stages. Fast. Very fast.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          {/* --- 3. WHY NOW --- */}

          <p className="font-semibold">
            Why Now
          </p>

          <p>
            We are early. Clawdbot was written by one developer in 3 months. We are still in the era of exploration and experimentation. With the right team, we can build one of the winning products.
          </p>

          <p>
            I have no doubt companies want this magic in the hands of their employees. But there&apos;s the gap: OpenClaw is built for individuals, not companies.
          </p>

          <p>
            <strong>We can build this.</strong> Secure agents for teams. Virtual employees with OpenClaw&apos;s power — but with security, governance, and multi-tenancy built in.
          </p>

          <p>
            <em>Let&apos;s put an agent on every desk and in every company.</em>
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          {/* --- 4. HOW WE WIN --- */}

          <p className="font-semibold">
            Why This Fits Us
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Global market from day one.</strong> We win by building the best product.
            </li>
            <li>
              <strong>PLG motion.</strong> A product people want to share. Fast sales cycles. High-margin cashflows.
            </li>
            <li>
              <strong>Frontier technology.</strong> Orchestration, cognition, memory at scale. Not another SaaS app. Fun to build.
            </li>
            <li>
              <strong>Excited customers.</strong> We sell to teams that are thrilled about AI and the future — not dragging legacy industries into adoption.
            </li>
            <li>
              <strong>Self-improving.</strong> Our own agents will help us scale. We&apos;ll be proud of our product.
            </li>
            <li>
              <strong>Generational upside.</strong> If we build this right, our past achievements will look small by comparison.
            </li>
          </ul>

          <p>
            <em>Even if we fail — this is a vision so ambitious, I would try it all over again.</em>
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          {/* --- 5. THE FINE PRINT --- */}

          <p className="font-semibold">
            How It Could Work
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Focus:</strong> Build a great company. Aim big. Frighteningly big. Top-of-market comp to de-risk. If we miss → shut it down, not zombie mode.
            </li>
            <li>
              <strong>Team:</strong> Exceptional team. 3 founders, 2 founding engineers with 3-5% real equity.
            </li>
            <li>
              <strong>Equity:</strong> Equal split. 4-year vesting. 1-year cliff.
            </li>
            <li>
              <strong>Salary:</strong> &euro;100K/yr from day one. &euro;150K/yr after significant revenue.
            </li>
            <li>
              <strong>Location:</strong> Predominantly in-person. Munich or Berlin. High trust we figure sth out.
            </li>
            <li>
              <strong>When:</strong> Now. ASAP. Yesterday.
            </li>
          </ul>

          <p>
            This requires speed. Pre-seed from day one to pay an exceptional team. But we should build a company where founders control the ship — not investors. Don&apos;t optimize on valuation. Optimize on deal terms. We control our destiny.
          </p>

          <p>
            <strong>Ideal path:</strong> YC to dictate terms and multiply launch visibility. Then grow revenue fast enough that follow-on is optional.
          </p>

          <p>
            This won&apos;t be 9-5. But it won&apos;t be 996 either. <strong>Growth = Stress + Rest.</strong> Outsized opportunities have velocity because teams tap into the right technology at the right time — not because they grind themselves to death.
          </p>

          <p>
            In a world of AI leverage, we hire outstanding talent that multiplies output. $10M ARR with a team of five is achievable.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          {/* --- 6. WHAT IF WE LOSE --- */}

          <p className="font-semibold">
            What If We Lose
          </p>

          <p>
            We build a useful platform. But competition wins on distribution. The path to $100M+ ARR closes.
          </p>

          <p>
            Competing globally means competing against larger resources. Even then: we will have built frontier technology (asset value) and a business with distribution and margin (cashflow positive optionality).
          </p>

          <p>
            Will we really have lost? We&apos;ll have grown enormously from it. And with you, this journey will have been fun.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold text-lg">
            Adventure awaits. ... Do you accept this quest?
          </p>

          <PartyBuilder onPartyChange={(count) => setSplashActive(count >= 2)} />

        </div>
      </article>
    </main>
    </>
  );
}
