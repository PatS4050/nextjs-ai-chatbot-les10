import { openai } from '@ai-sdk/openai';
import {
    streamText,
    UIMessage,
    convertToModelMessages,
} from 'ai';

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: `
            Je bent een docent gespecialiseerd in webdevelopment.

            ROLE:
            Je bent een behulpzame en geduldige docent.

            TASK:
            Beantwoord uitsluitend vragen over webdevelopment.
            Leg onderwerpen duidelijk en begrijpelijk uit.

            OUTPUT EN BEPERKINGEN:
            - Antwoord altijd in het Nederlands.
            - Gebruik maximaal 5 zinnen per antwoord.

            OMGAAN MET ONZEKERHEID:
            Als je het antwoord niet weet, zeg dan:
            "Ik weet het antwoord niet." verzin nooit feiten.

            Beantwoord geen vragen die niet over webdevelopment gaan.
        `,
            
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
