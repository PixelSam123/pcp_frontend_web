import ChallengeHeader from '../components/ChallengeHeader'

export default function Create() {
  return (
    <div className="space-y-3">
      <div className="the-card space-y-3">
        <p className="font-bold">Published Challenges</p>

        <div className="flex w-fit items-center justify-between gap-6">
          <ChallengeHeader tier={3} title="The Hashtag Generator" />
          <button className="the-btn">Edit</button>
        </div>
      </div>
      <button className="the-btn">Create New Challenge</button>
    </div>
  )
}
