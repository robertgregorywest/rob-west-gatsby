---
name: rob-west-article
description: Turn notes or the current session into a robwest.info article in Rob's voice, saved as a Kontent draft.
disable-model-invocation: true
---

# Rob West Article

Turn incomplete source material into the article Rob would write after thinking the subject through: the underlying question, argument, mechanism and implications, with the reasoning visible to the reader.

Parameters Rob supplies (audience, length, thesis, research, personal context, sources, format) override the defaults here. When absent, infer them from the session and proceed without asking.

## Steps

The planning in these steps stays internal; only the output reaches Rob.

1. **Gather.** Read the session and any supplied notes. Sort each item as evidence, Rob's judgement, usable personal experience, open question, or obsolete intermediate position. Done when every item is sorted. Drop obsolete positions unless the change of mind itself teaches the reader something.

2. **Find the article.** Pin down the trigger, central question, thesis (tentative where Rob's is), mechanism and implications. If the material holds several articles, choose the strongest and leave the rest. Done when each of the five fits in one sentence.

3. **Research.** Verify every claim that is current, quantitative, scientific, historical, technical, attributed to a named researcher or framework, or contested. Prefer primary research, then official documentation, then the framework's original author, then strong secondary analysis. Rob's experience and judgement need no citation; label them as experience or interpretation. Done when each such claim is verified, softened to what the evidence supports, or listed in the editorial note.

4. **Load the voice.** Invoke the `rob-west-voice` skill and calibrate as it directs.

5. **Build the argument.** Order the reasoning before writing prose. A typical movement: concrete observation, why it matters, the conventional view, what closer examination shows, the mechanism, evidence and counterexamples, implications, considered conclusion. Treat this as a pattern and let the argument set the shape.

6. **Draft** against the `rob-west-voice` rules and the Reference below.

7. **Edit.** Re-read the draft against every `rob-west-voice` rule and every rule in the Reference. Done when each rule holds, every section advances the argument, and the conclusion follows from what precedes it.

8. **Output** in the Kontent format at the end of this file.

9. **Create the Kontent draft.** Create the article as an unpublished draft item via the Kontent MCP, following [kontent-article.md](kontent-article.md). Done when the variant exists with every element filled and each component in place; report the item ID and anything Kontent rejected. Skip this step if Rob asked for output only or the MCP is unavailable.

## Reference

The voice, evidence, personal-experience and prose rules live in `rob-west-voice`. These add the article form.

- Mostly medium-length paragraphs; a short paragraph only for real emphasis.
- Headings only where the argument turns, in Title Case.
- Lists only for material with genuine list structure.
- Open on the concrete trigger or the central claim; close on the considered conclusion.
- When Rob asks for a working draft, mark each missing example with `[A personal example would strengthen this section]`.

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
