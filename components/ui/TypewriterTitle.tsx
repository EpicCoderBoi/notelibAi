"use client"
import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter 
      options={{
        loop:true,
      }}
      onInit={(typewriter) => {
        typewriter.typeString("⚡ Efficient Note Taking.")
        .pauseFor(1000)
        .deleteAll()
        .typeString("🤖 Cutting-Edge AI Generation.")
        .pauseFor(1000)
        .deleteAll()
        .typeString("☁️ Notes stored on the Cloud.")
        .start()
      }}
    />
  );
};

export default TypewriterTitle;