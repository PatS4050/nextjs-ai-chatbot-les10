import { openai } from '@ai-sdk/openai';
import {
    streamText,
    UIMessage,
    convertToModelMessages,
    createUIMessageStreamResponse,
    toUIMessageStream,
} from 'ai';
import { saveChat } from '@/src/lib/chat/mutations';

export async function POST(req: Request) {
    const { id, messages }: { id: string; messages: UIMessage[] } =
        await req.json();

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

    return createUIMessageStreamResponse({
        stream: toUIMessageStream({
            stream: result.stream,
            originalMessages: messages,
            onEnd: async ({ messages: conversation, outcome }) => {
                if (!id || outcome.status === 'failed') {
                    return;
                }

                await saveChat(id, conversation);
            },
        }),
    });
}
