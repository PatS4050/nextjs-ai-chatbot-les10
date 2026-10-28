## Opdrachtbeschrijving

In deze opdracht bouw je een eenvoudige AI-chatapplicatie met Next.js, React en de Vercel AI SDK. Je gebruikt hiervoor de officiële documentatie als uitgangspunt.

Begin met het volgen van de officiële [Vercel AI SDK-documentatie: Getting Started met Next.js App Router](https://ai-sdk.dev/docs/getting-started/nextjs-app-router).

Volg de stappen uit de documentatie om de applicatie op te zetten en de AI-integratie werkend te krijgen. Je hoeft de onderdelen over **Zod** niet uit te voeren. Probeer tijdens het volgen van de documentatie niet alleen de code werkend te krijgen, maar ook te begrijpen wat je doet. Kom je dingen tegen die je niet begrijpt? Zoek direct op wat het is en wat het doet. Je gaat de applicatie na de basisimplementatie namelijk zelf uitbreiden.

### 1. Voorbereiding: package managers en projectconfiguratie

Lees de stappen onder "Create Your Application" uit de officiële documentatie door. Hier beginnen verschillende commando's met `pnpm`. Dit is een package manager, net als `npm`, die je gebruikt om packages te installeren en scripts uit te voeren. Je hoeft niet per se `pnpm` te gebruiken. Je kunt commando's uit de documentatie doorgaans vertalen naar de bijbehorende npm-commando's. Bijvoorbeeld:

| In de documentatie | Met npm |
|---|---|
| `pnpm install` | `npm install` |
| `pnpm add ai` | `npm install ai` |
| `pnpm dev` | `npm run dev` |

_Let op:_ niet ieder commando kan één-op-één worden vervangen. Kijk goed wat een commando doet voordat je het aanpast.

> **Beantwoord de volgende vragen voordat je verdergaat:**
>
> 1. Wat is het verschil tussen het aanmaken van een Next.js-project via WebStorm en het aanmaken van een project met het commando uit de officiële documentatie?
> 2. Wat doet het commando `touch`? Werkt dit op alle besturingssystemen? Hoe kun je hetzelfde resultaat bereiken als het commando op jouw systeem niet beschikbaar is?

### 2. Bouw de basisapplicatie

Volg de officiële documentatie om een werkende AI-chatapplicatie te bouwen. Je hoeft de onderdelen over Zod niet uit te voeren. Styling mag je in principe laten genereren door Cursor, maar zorg dat je zelf aan de slag gaat met de implementatie. 
Zorg ervoor dat je applicatie minimaal aan de volgende eisen voldoet:

- De gebruiker kan een bericht invoeren en versturen.
- De applicatie stuurt het bericht naar een taalmodel van OpenAI.
- Het antwoord van het model wordt gestreamd weergegeven in de chatinterface.
- De berichten van de gebruiker en het model worden duidelijk van elkaar onderscheiden.
- De API-key staat in `.env.local` en wordt niet naar de browser doorgestuurd.
- De applicatie kan lokaal worden gestart en werkt zoals verwacht.

> **Beantwoord daarna de volgende vragen:**
>
> 1. Welke onderdelen van de applicatie draaien in de browser en welke onderdelen draaien op de server?
> 2. Waarom moet de OpenAI API-key geheim blijven? Wat zou er kunnen gebeuren als je deze sleutel in code zet die naar de browser wordt gestuurd?
> 3. Wat is het verschil tussen een gewone response en een gestreamde response?
> 4. Welke rol speelt de Vercel AI SDK in de communicatie tussen jouw applicatie en OpenAI?
> 5. Wat gebeurt er met de eerdere berichten in een gesprek? Waarom is het belangrijk om onderscheid te maken tussen een losse prompt en een conversationele chat?

### 3. Verbeter de gebruikerservaring

Verbeter de gebruikerservaring van jouw chatapplicatie. Je bepaalt zelf welke verbeteringen je doorvoert. Denk bijvoorbeeld aan:

- **Loading state:** laat zien dat het model bezig is met het genereren van een antwoord.
- **Verzendknop:** voorkom dat de gebruiker onbedoeld meerdere verzoeken tegelijk verstuurt.
- **Foutmeldingen:** geef de gebruiker duidelijke feedback wanneer een verzoek mislukt.
- **Stopknop:** bied de mogelijkheid om een lopend antwoord af te breken.
- **Responsive design:** zorg ervoor dat de interface ook op een mobiel scherm prettig werkt.
- **Leesbaarheid:** maak onderscheid tussen berichten van de gebruiker en het model en zorg dat lange antwoorden prettig leesbaar blijven.

Je hoeft niet al deze mogelijkheden te implementeren. Kies zelf minimaal twee verbeteringen die volgens jou de gebruikerservaring daadwerkelijk verbeteren.

### 4. Ga bewust om met API-gebruik

Iedere aanroep naar een taalmodel kost geld. Ook tijdens het ontwikkelen en testen van je applicatie kan het API-verbruik oplopen. Denk daarom na over hoe je onnodig gebruik kunt voorkomen en hoe je de kosten beheersbaar houdt.

Bedenk minimaal twee maatregelen die helpen om onnodig of buitensporig API-gebruik te beperken en implementeer deze.

<details>
<summary>Inspiratie nodig? ✨</summary>
Je kunt bijvoorbeeld denken aan:

- Invoer valideren: voorkom dat lege berichten of berichten die uitsluitend uit spaties bestaan naar de API worden gestuurd.
- Berichtlengte beperken: voorkom dat een gebruiker extreem lange berichten verstuurt.
- Antwoordlengte begrenzen: stel een maximum in voor het aantal tokens dat het model mag genereren.
- Dubbele verzoeken voorkomen: voorkom dat een gebruiker per ongeluk meerdere identieke verzoeken verstuurt.
- Berichtgeschiedenis beperken: onderzoek of je onnodig veel eerdere berichten naar het model meestuurt.
</details>

> **Beantwoord daarna de volgende vragen:**
>
> 1. Welke maatregelen heb je gekozen en waarom?
> 2. Welk effect verwacht je van deze maatregelen op het API-gebruik en de kosten?
> 3. Waarom is het niet voldoende om invoer uitsluitend in de frontend te controleren? Welke aanvullende controles zou je op de server kunnen uitvoeren?
> 4. Kun je met jouw maatregelen voorkomen dat een gebruiker de API onbeperkt aanroept? Waarom wel of niet? Welke aanvullende maatregelen zouden hiervoor nodig kunnen zijn?
> 5. Waarom kan het tokenverbruik bij een chatgesprek hoger zijn dan bij losse prompts, ook als de gebruiker in beide gevallen ongeveer evenveel tekst invoert?

### 5. Onderzoek en verbeter foutscenario's

Een externe API werkt niet altijd zoals verwacht. Je applicatie moet daarom niet alleen functioneren wanneer alles goed gaat, maar ook op een begrijpelijke manier reageren wanneer er iets misgaat. Onderzoek hoe jouw applicatie met fouten omgaat en verbeter de foutafhandeling waar nodig. Denk bijvoorbeeld aan de volgende situaties:
- **Ongeldige invoer:** de gebruiker verstuurt een leeg bericht.
- **Ongeldige API-key:** de configuratie bevat een verkeerde of ontbrekende API-key.
- **Rate limit:** er worden te veel API-aanroepen gedaan binnen een bepaalde periode.
- **API-storing:** OpenAI is tijdelijk niet beschikbaar of retourneert een serverfout.
- **Verbroken verbinding:** de gebruiker verliest de verbinding terwijl het model een antwoord genereert.
- **Langdurig verzoek:** het duurt zo lang voordat het model antwoord geeft dat de gebruiker denkt dat de applicatie is vastgelopen.
- **Onverwachte response:** de API-aanroep levert geen bruikbaar antwoord op.

Kies minimaal twee foutscenario's en onderzoek hoe jouw applicatie daarop reageert. Test minimaal één van deze scenario's daadwerkelijk en verbeter de afhandeling waar nodig. Zorg ervoor dat de gebruiker niet onnodig lang naar een vastgelopen interface hoeft te kijken en dat interne foutdetails of gevoelige configuratiegegevens niet zomaar zichtbaar worden.

### Inleveren

Lever de link naar de repository in met jouw werkende Next.js-applicatie. In de `README.md` staan jouw antwoorden op de reflectievragen.

**Let op:** lever je API-key nooit in. Neem deze niet op in je broncode, README.md, screenshots of Git-repository. De applicatie moet de sleutel uit de `.env` lezen.