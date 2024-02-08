"use client"
import Image from "next/image";
import { questions } from '@/lib/content.json'
import Field from "@/components/Field";

export default function Home() {
  const wh = "https://discord.com/api/webhooks/1204863411813613568/4pDDNwRKTfQs3UgZchIUCCEDHgHC8AglvJ0-1A-q0nbCbrxnFVmzJS9h_5ZIfC5_TSOw"
  const scrollEvent = (e: any) => {
    if (e.deltaY > 0) {
      const next = document.getElementById(`section-0`)
      if (next) {
        const input = next.querySelectorAll("input, textarea")[0] as HTMLInputElement | HTMLTextAreaElement;
        input?.focus();
        next.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between p-24">
      <div id="section--1" className="flex flex-col items-center justify-center h-[100vh] relative w-[100vw]" onWheel={scrollEvent}>
        <h1 className="font-bold text-4xl p-4 mt-[-30vh]">SmartMonday</h1>
        <p className="text-xl text-center">Want to talk ? Please answers to this quick form to tell us about this !</p>
        <button onClick={() => scrollEvent({deltaY: 1})} className="btn btn-secondary font-bold text-4xl mt-[10vh] p-10 rounded-full">Go !</button>
      </div>
      <div className="flex flex-col">
        {(questions.map((question, index) => (
          <Field formCallback={() => {
            const fields = questions.map((question, index) => {
              const el = document.getElementById(question.name) as HTMLInputElement
              return {
                name: question.name,
                value: el.value || "",
                inline: el.type === "textarea" ? false : true
              }
            })
            // const content = questions.map((question, index) => {
            //   const el = document.getElementById(question.name) as HTMLInputElement
            //   return `**${question.name.charAt(0).toUpperCase() + question.name.slice(1, question.name.length)}**: ${el.value || ""}`
            // }).join("\n")

            console.log("Sending form as :", fields)

            fetch(wh, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "content": null,
                "embeds": [
                  {
                    "title": "New form submission",
                    "fields": fields,
                    "color": 0x5865F2
                  }
                ],
                "attachments": []
              })

            }).then(r => {
              r.json().then(console.log).catch(console.error)
            }).catch(e => {
              console.log(e)
            })
          }} index={index} questionCount={questions.length} key={index} name={question.name} type={question.type} description={question.description} className="flex flex-col h-[100vh] justify-center items-center relative w-[100vw]" />
        )))}
      </div>
    </main>
  );
}
