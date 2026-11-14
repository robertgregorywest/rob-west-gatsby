---
name: linkedin-post
description: Draft a LinkedIn post in Rob's voice, for a robwest.info article or anything else, and hand it to him ready to paste and publish.
disable-model-invocation: true
---

# LinkedIn Post

Rob publishes by hand: this skill drafts the post, puts the approved text on his clipboard and opens LinkedIn. Rob makes the final click.

## Steps

1. **Gather the source.**
   - **Article:** find it with the Kontent MCP (`search-content-item-variants`, then `get-content-item-variant`) and take its title, summary, slug and body. The link is `https://robwest.info/articles/<slug>/`. Confirm `curl -sI` returns 200: an unpublished article would post a dead link. Read the body, because the post sells the argument and the summary alone is too thin for that.
   - **Anything else:** Rob's notes or the session. Include a link only if Rob gives one.

   Done when you can state in one sentence what the post is about and why a reader would care.

2. **Draft.** Invoke the `rob-west-voice` skill and calibrate as it directs, then write to its rules and the LinkedIn shape:
   - The opening two lines carry the post. LinkedIn folds after about 200 characters, so lead with the observation, tension or question, never with "I've written a new article".
   - Plain text only. LinkedIn renders no Markdown, so separate paragraphs with blank lines and get emphasis from the wording.
   - Short paragraphs.
   - For an article: give the core argument and one concrete detail, then invite the reader to the full piece. Put the article URL on its own line after the invitation; LinkedIn builds the link card from it.
   - Up to three hashtags on the last line, only where they name a real topic community (`#EngineeringLeadership`, `#TeamTopologies`).

   Done when every `rob-west-voice` rule holds, the hook lands within the first 200 characters, and the draft is 100 to 250 words and under 3,000 characters.

3. **Review.** Show Rob the draft exactly as it will be pasted. Revise until he approves that exact version.

4. **Hand over.** Write the approved text to a file in the scratchpad, then run `pbcopy < <file>` and `open https://www.linkedin.com/feed/`. Tell Rob to click **Start a post**, paste, wait for the link card to appear, and post. Once the card shows he can delete the URL line from the text if he prefers.
