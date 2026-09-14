---
name: rob-west-article
description: Turn notes or the current session into a robwest.info article in Rob's voice, saved as a Kontent draft.
disable-model-invocation: true
---

# Rob West Article

Turn incomplete source material into the article Rob would write after thinking the subject through: the underlying question, argument, mechanism and implications, with the reasoning visible to the reader. Rob **reasons in public** as an experienced **practitioner**; that is the voice.

Parameters Rob supplies (audience, length, thesis, research, personal context, sources, format) override the defaults here. When absent, infer them from the session and proceed without asking.

## Steps

The planning in these steps stays internal; only the output reaches Rob.

1. **Gather.** Read the session and any supplied notes. Sort each item as evidence, Rob's judgement, usable personal experience, open question, or obsolete intermediate position. Done when every item is sorted. Drop obsolete positions unless the change of mind itself teaches the reader something.

2. **Find the article.** Pin down the trigger, central question, thesis (tentative where Rob's is), mechanism and implications. If the material holds several articles, choose the strongest and leave the rest. Done when each of the five fits in one sentence.

3. **Research.** Verify every claim that is current, quantitative, scientific, historical, technical, attributed to a named researcher or framework, or contested. Prefer primary research, then official documentation, then the framework's original author, then strong secondary analysis. Rob's experience and judgement need no citation; label them as experience or interpretation. Done when each such claim is verified, softened to what the evidence supports, or listed in the editorial note.

4. **Calibrate the voice.** Read the articles in [voice-examples.md](voice-examples.md), favouring those nearest the topic. Read for voice and movement; the content stays theirs.

5. **Build the argument.** Order the reasoning before writing prose. A typical movement: concrete observation, why it matters, the conventional view, what closer examination shows, the mechanism, evidence and counterexamples, implications, considered conclusion. Treat this as a pattern and let the argument set the shape.

6. **Draft** against the Reference below.

7. **Edit.** Re-read the draft against every rule in the Reference. Done when each rule holds, every section advances the argument, the conclusion follows from what precedes it, and every personal detail traces to the source material.

8. **Output** in the Kontent format at the end of this file.

9. **Create the Kontent draft.** Create the article as an unpublished draft item via the Kontent MCP, following [kontent-article.md](kontent-article.md). Done when the variant exists with every element filled and each component in place; report the item ID and anything Kontent rejected. Skip this step if Rob asked for output only or the MCP is unavailable.

## Reference

### Voice

Thoughtful, analytical, curious, precise and conversational. Confident without pretending to certainty, comfortable with technical depth, willing to expose mistakes, occasionally dry or mildly irreverent. First person comes naturally: "I think", "I'd argue", "I've found", "My suspicion is", "In practice".

Strong articles move between levels of abstraction: experience to pattern to mechanism to principle to consequence; technical detail to cognitive or organisational consequence to engineering principle; performance data to subjective experience to physiological or psychological explanation to training implication. Draw on neighbouring domains (engineering leadership, Team Topologies, flow and systems thinking, organisational design, psychology, coaching, neuroscience, philosophy, AI-assisted development, cycling and human performance) where the connection genuinely illuminates the subject.

Frameworks are tools for thinking: explain the useful part, connect it to the problem, test it against experience, note its limits, adapt it where needed. Explain every concept the intended reader may not know.

### Evidence

Keep evidence, inference, interpretation and opinion distinguishable. For every claim that something happens, give the mechanism: what would have to be happening underneath for us to observe this? Where evidence is mixed, say so; where Rob's conclusion is speculative, keep it speculative. Claim exactly as much as the evidence supports. Citations, quotations and findings come only from sources actually read.

### Personal experience

Use experience Rob supplied or that is established in context: what prompted the piece, a mistake or surprise, an engineering situation, a coaching observation, a race, a decision whose consequences taught something. Every conversation, event, emotion, achievement, quotation and opinion attributed to Rob traces to the source material. Where an example is missing, write around the gap. Use a `[A personal example would strengthen this section]` placeholder only when Rob asks for a working draft.

### Prose

- British English.
- Plain, precise language; technical terms where they add precision.
- Mostly medium-length paragraphs; a short paragraph only for real emphasis.
- Headings only where the argument turns, in Title Case.
- Lists only for material with genuine list structure.
- Rhetorical questions only where they advance the reasoning.
- Open on the concrete trigger or the central claim; close on the considered conclusion.
- State the thesis once and let the argument carry it.
- Sound like a person thinking, even at some cost to polish.

Hard guardrails:

- Punctuate with commas, colons, full stops and brackets; em dashes never appear.
- Reserve contrast ("X isn't A, it's B") for real distinctions, never as a rhythm.
- Write the argument's current position cleanly, free of **revision residue** from earlier drafts or discarded positions.

## Output: Kontent Article

One labelled block per element of the Kontent `article` content type:

- **Title**: up to 25 words.
- **URL slug**: lowercase, hyphenated.
- **Summary**: up to 75 words; shown in article listings.
- **Meta description**: up to 50 words.
- **Meta keywords**: up to 20 words, comma-separated.
- **Article topics**: terms from the `article_topics` taxonomy, fetched via the Kontent MCP. If none fits, propose a new term for Rob to create.
- **Body**: Kontent rich-text HTML in a fenced `html` block, the format the Kontent MCP and Management API accept. Use `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<li>`, `<strong>`, `<em>` and `<a href>`. The page template renders the title as `<h1>`, so the body starts at `<h2>`. Quotations and code are Kontent components: mark each with its own `<p>[BLOCKQUOTE] quoted text (source)</p>` or `<p>[CODE: language] code</p>`, where language is one of bash, csharp, cshtml-razor, yaml, javascript, xml. Step 9 turns these into real components.

The limits above mirror the `article` content type. If Kontent rejects a value, re-read the type and correct this section.

After the article, add a short editorial note only for points that need Rob's judgement: an unsupported claim, a missing personal example, two plausible readings of the thesis, a fact to verify before publishing.
