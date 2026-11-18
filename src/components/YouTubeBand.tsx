import { brandLogo } from "@/data/images";
import { youtubeLink } from "@/data/site";
import { YouTubeGlyph } from "@/components/SocialIcons";

/** Invitation to the YouTube channel, drawn as a video player so it reads at a glance. */
export function YouTubeBand({ id }: { id?: string }) {
  return (
    <section className="band-yt" id={id}>
      <div className="container-x band-yt__grid">
        <div className="band-yt__copy">
          <h2 className="h2">
            Learn it with us, <span className="mark mark--red">for free.</span>
          </h2>
          <p className="lead">
            We publish useful tutorials on YouTube, made for people who are learning. If you are stuck on a board, a sensor or a sketch, there may already be a video that helps.
          </p>
          <a href={youtubeLink} target="_blank" rel="noreferrer" className="btn btn--yt btn--lg">
            <YouTubeGlyph className="size-5" /> Watch on YouTube
          </a>
        </div>

        <a href={youtubeLink} target="_blank" rel="noreferrer" className="player" aria-label="Open the Dielcha Digilab YouTube channel">
          <span className="player__screen" aria-hidden="true">
            <svg className="player__trace" viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice">
              <path d="M0 70H120L160 110H300L340 70H480" />
              <path d="M0 200H90L130 160H260L300 200H480" />
              <path d="M240 0V60M240 210V270" />
              <circle cx="120" cy="70" r="6" />
              <circle cx="340" cy="70" r="6" />
              <circle cx="90" cy="200" r="6" />
              <circle cx="300" cy="200" r="6" />
            </svg>
            <span className="player__dots"><i /><i /><i /></span>
            <span className="player__play"><YouTubeGlyph className="player__play-glyph" /></span>
            <span className="player__bar"><span /></span>
          </span>
          <span className="player__meta">
            <span className="player__avatar"><img src={brandLogo} alt="" width={40} height={27} /></span>
            <span className="player__who">
              <strong>@DielchaDigilab</strong>
              <span>Tutorials made for learning</span>
            </span>
            <span className="player__chip"><YouTubeGlyph className="size-5" /></span>
          </span>
        </a>
      </div>
    </section>
  );
}
