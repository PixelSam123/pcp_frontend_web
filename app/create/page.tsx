'use client'

import { Editor } from '@monaco-editor/react'
import ChallengeHeader from '../components/ChallengeHeader'
import TheDialog from '../components/TheDialog'

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
      <TheDialog
        title="Create New Challenge"
        description="Fill in new challenge details"
      >
        <label htmlFor="title" className="block font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="the-input"
          placeholder="Enter challenge title"
        />

        <p className="block font-bold">Description</p>
        <Editor
          height="8rem"
          defaultLanguage="markdown"
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />

        <p className="block font-bold">Initial Code</p>
        <Editor
          height="8rem"
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />

        <p className="block font-bold">Test Cases</p>
        <Editor
          height="8rem"
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />
      </TheDialog>
    </div>
  )
}
