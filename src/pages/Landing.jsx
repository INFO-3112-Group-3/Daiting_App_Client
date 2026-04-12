import { Link,useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useState} from 'react'
import PremiumModal from '../components/PremiumModal';
export default function Landing(props) {

  const [premiumOpen, setPremiumOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () =>
  {
    console.log(props.user.user);
      if (props.user.user && !props.user.user.isPaidUser)
      {
        setPremiumOpen(true);
      }
      else
      {
        navigate('/signup');
      }
  }

  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="label">Luxury Tech Matchmaking</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            We found you a <span className="text-amber-300">perfect match</span> in tech.
          </h1>
          <p className="text-base text-zinc-300">
            Find IT is engineered for builders who want connection with clarity. Match on stacks,
            digital chemistry, and professional ambition.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/discover"
              className="rounded-full border border-amber-300/60 bg-amber-300/15 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
            >
              Find a Match
            </Link>
           <button
              type="button"
              onClick={handleClick}
              className="rounded-full border border-amber-300/60 bg-amber-300/15 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
            >{props.user && !props.user.user.isPaidUser ? "Upgrade To Premium User" : "Create an Account"}</button>
          </div>
        </div>
        <div className="relative">
          <div className="soft-card relative overflow-hidden p-6 animate-float">
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(251,191,36,0.2),transparent_60%),linear-gradient(220deg,rgba(34,197,94,0.14),transparent_60%)]" />
            <div className="relative space-y-4">
              <div className="rounded-2xl border border-border bg-black/60 p-4">
                <p className="text-xs text-zinc-400">Hello, Lassie</p>
                <p className="mt-2 text-sm text-white">Hi. I build with React + AWS.</p>
              </div>
              <div className="rounded-2xl border border-border bg-black/60 p-4">
                <p className="text-xs text-zinc-400">Reviews</p>
                <p className="mt-2 text-sm text-white">5.0 (763+) premium members</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -top-8 -right-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>
      </section>
      <PremiumModal open={premiumOpen} fullUser={props.user || null} onClose={() => setPremiumOpen(false)} />
    </div>
  )
}
