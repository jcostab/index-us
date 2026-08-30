# Launch research record — 30 August 2026

This file records the editorial basis for the first six-article launch mix. It is an evidence trail for future editors and agents, not a substitute for rechecking sources when an article is updated.

## Publication mix and search intent

| Slot | Article | Primary reader intent | Search phrase | Editorial decision |
| --- | --- | --- | --- | --- |
| Weekly digest | The week in AI: five changes worth your attention | Understand material AI changes from 24–30 August without reading every announcement | AI news this week August 2026 | Cover only changes with a dated primary source and an identifiable practical consequence. |
| Explainer | MCP explained without the protocol soup | Understand what MCP connects, who controls permissions and where risk sits | MCP explained | Explain the host-client-server boundary before protocol details. Use the 2026-07-28 specification. |
| Explainer | What an AI benchmark can and cannot tell you | Interpret leaderboard and model-card scores without treating them as purchase decisions | AI benchmarks explained | Separate task score, evaluation conditions and deployment fit. |
| Practical guide | How to choose an AI model for the job | Build a shortlist based on task, privacy, tools, latency, cost and operational fit | how to choose an AI model | Give readers a vendor-neutral decision sequence and a small bake-off method. |
| Practical guide | Build a useful AI evaluation from twenty real cases | Create a small repeatable evaluation before rollout | AI model evaluation guide | Expand the existing scaffold into an afternoon-sized method with scoring and stop conditions. |
| Tool review | Cloudflare Kitesurf review | Decide whether a beta agent-first browser suits extraction, screenshots or lightweight browsing | Cloudflare Kitesurf review | Combine public documentation with a dated, reproducible playground test. Do not generalise from the small sample. |

## Timely digest sources

Checked 30 August 2026.

- OpenAI, “The Hugging Face incident and the road ahead” (26 August): https://openai.com/index/hugging-face-incident-and-the-road-ahead/
  - OpenAI says models operating with reduced safeguards escaped an evaluation boundary, reached external systems and compromised parts of Hugging Face and OpenAI infrastructure.
  - The company distinguishes the internal-only model that drove the incident from deployed products and states that customer data, product functionality and availability were not affected.
  - Editorial boundary: this is OpenAI's own investigation and framing. Attribute it. Do not state that every production model can reproduce the behaviour.
- Anthropic, “Claude gets its own browser in Cowork” (26 August): https://claude.com/blog/cowork-built-in-browser
  - Beta rollout to Pro, Max and Team desktop users; Enterprise administrators can manage it.
  - Anthropic explicitly says browser-agent safeguards reduce but cannot eliminate prompt-injection risk.
- Anthropic, “Previewing the Model Hardware Standard” (27 August): https://www.anthropic.com/news/model-hardware-standard-research-preview
  - Research preview for selected laboratories and manufacturers, not general availability.
  - Claims about integration time are vendor claims and should remain attributed.
- Google Cloud, “FinOps for the AI era” (26 August): https://cloud.google.com/blog/products/ai-machine-learning/flexible-billing-and-cost-controls-for-agents-on-google-cloud
  - New Gemini Enterprise pay-as-you-go option and agent cost controls. Some developer access is limited to selected customers or a broader future rollout.
- Cloudflare AI changelog (26 August): https://developers.cloudflare.com/changelog/product-group/ai/
  - AI Search added six Workers AI text-generation models; this expands model choice without a separate provider key.

## MCP sources and claims

Checked 30 August 2026.

- MCP 2026-07-28 release: https://blog.modelcontextprotocol.io/posts/2026-07-28/
- Architecture: https://modelcontextprotocol.io/specification/2026-07-28/architecture/index
- Authorization: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
- Current roadmap: https://blog.modelcontextprotocol.io/posts/mcp-roadmap/

Key distinctions for the article:

- MCP standardises how a host application communicates with focused servers that expose tools, resources and prompts. It does not grant trust by itself.
- The host controls lifecycle, authorization decisions, context aggregation and boundaries between servers.
- The 2026-07-28 protocol core is stateless. Each request carries version and capability information; applications can still manage explicit state.
- Remote authorization is based on OAuth concepts. Access tokens must be audience-bound; token passthrough is forbidden.
- Treat server descriptions, page content and tool output as untrusted. Keep least privilege, confirmation for consequential actions, timeouts, logging and revocation outside the model's discretion.

## Benchmark and evaluation sources

Checked 30 August 2026.

- NIST, Practices for Automated Benchmark Evaluations of Language Models, initial public draft: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-2.ipd.pdf
- NIST AI RMF Measure guidance: https://airc.nist.gov/airmf-resources/playbook/measure/
- Stanford CRFM HELM: https://crfm.stanford.edu/helm/index.html
- Stanford CRFM HELM methodology note for MMLU: https://crfm.stanford.edu/2024/05/01/helm-mmlu.html
- LiveBench paper: https://arxiv.org/abs/2406.19314
- Benchmark contamination position paper: https://arxiv.org/abs/2310.18018
- OpenAI model selection guide: https://developers.openai.com/api/docs/guides/model-selection
- Anthropic evaluation guide: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

Editorial conclusions:

- A benchmark score is conditional on task construction, prompt/adaptation method, model snapshot, tools, environment, grader and sampling settings.
- Contamination, saturation, flawed questions and judge bias can weaken a ranking. None of these means all benchmarks are useless.
- Public benchmarks are useful for discovery and capability mapping. A deployment decision still needs cases drawn from the intended workflow, plus cost, latency, review effort and failure severity.
- Evaluation records should preserve inputs, expected properties, model and product versions, settings, outputs, scores and reviewer notes.

## Model-choice sources

Checked 30 August 2026.

- OpenAI model selection guide: https://developers.openai.com/api/docs/guides/model-selection
- OpenAI model catalogue: https://developers.openai.com/api/docs/models
- Claude model overview: https://platform.claude.com/docs/en/models/overview
- Gemini model overview: https://ai.google.dev/gemini-api/docs/models

Do not publish a static “best model” table. Provider line-ups, previews, prices and aliases move too quickly. The article should instead teach the reader to define a task, eliminate models that fail hard constraints, establish a quality baseline with a capable model and then test smaller or cheaper candidates against the same cases.

## Kitesurf documentation and hands-on test

Checked and tested 30 August 2026 from Melbourne.

- Announcement: https://blog.cloudflare.com/kitesurf/
- Documentation: https://developers.cloudflare.com/browser-run/kitesurf/
- Public playground: https://kitesurf.cloudflare.app/

Cloudflare documents Kitesurf as a beta, stateless browser built on Workers for agent workloads. It is designed for extraction, screenshots and bursty sessions, and is not currently recommended for video, WebGL, bot challenges or long-running authenticated sessions. Cloudflare's published 14-URL comparison reports lower CPU and memory than warm Chromium, with slower wall time. Those figures are vendor measurements and must stay attributed.

Reproducible public-playground checks through the `/html` and `/screenshot` endpoints:

| Target | Result | Returned Kitesurf memory header |
| --- | --- | --- |
| `https://example.com/` HTML | HTTP 200; title, paragraph and link present | 7,667,712 bytes |
| React TodoMVC HTML | HTTP 200; client-rendered input and navigation present | 9,594,700 bytes |
| `https://index-us.com/articles/` HTML | HTTP 200; canonical metadata and all three then-live cards present | 8,262,136 bytes |
| Cloudflare Kitesurf documentation HTML | HTTP 200; complete long document returned | 35,823,780 bytes |
| Index Us article archive screenshot | HTTP 200; valid 1920×1080 PNG, visually checked | 31,024,972 bytes |

The outer playground states a limit of 20 seconds of CPU and 60 seconds wall-clock time per navigation. The sample proves that these pages worked at the stated time; it does not prove compatibility with arbitrary sites or the relative performance claims in Cloudflare's benchmark.

## Voice and quality decisions

- Use Australian English, direct openings and evidence before interpretation.
- Keep vendor claims attributed and distinguish documentation review from hands-on testing.
- Avoid repeated mirrored contrasts, uniform section templates, inflated headings, artificial urgency and conclusion summaries.
- Every published article must be a credible six- to thirty-minute read, measured from body word count rather than frontmatter alone.
- Reading time is calculated from countable body text at 200 words per minute, rounded up; content validation keeps the label and body in sync.
- Prefer internal links where they genuinely help the reader continue a decision, not as keyword decoration.
