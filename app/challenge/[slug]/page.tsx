'use client'

import Editor from '@monaco-editor/react'
import ChallengeHeader from '@/app/components/ChallengeHeader'
import TheSelect from '@/app/components/TheSelect'

export default function Challenge({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-3">
      <ChallengeHeader tier={3} title="The Hashtag Generator" />
      <TheSelect
        defaultValue="javascript"
        options={[
          { text: 'javascript', value: 'javascript' },
          { text: 'lua', value: 'lua' },
        ]}
      />

      <div className="the-card space-y-3">
        <p className="font-bold">Description</p>

        <p>
          The marketing team is spending way too much time typing in hashtags.
          <br />
          Let's help them with our own Hashtag Generator!
        </p>
        <p>Here's the deal:</p>
        <ul className="list-inside list-disc">
          <li>It must start with a hashtag (#).</li>
          <li>All words must have their first letter capitalized.</li>
          <li>
            If the final result is longer than 140 chars it must return false.
          </li>
          <li>
            If the input or the result is an empty string it must return false.
          </li>
        </ul>
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Editor</p>
        <Editor
          height="36rem"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
        />
      </div>
    </div>
  )
}
