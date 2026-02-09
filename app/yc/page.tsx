export default function YCApplication() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 md:py-20">
      <article className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
            # Building Virtual Employees
          </h2>
          <p className="text-lg opacity-60">
            Clawdbot but for teams and enterprises
          </p>
        </header>

        <div className="space-y-6 text-base leading-relaxed">

          <p className="font-semibold">
            AI agents have arrived — and they are not built for enterprise.
          </p>

          <p>
            In January 2026, an open-source project called OpenClaw went viral — 180,000 GitHub stars in three weeks, endorsed by Andrej Karpathy and dozens of prominent technologists. OpenClaw revealed something profound about how people want to use AI: not through a dedicated chat window, but through an agent that operates on the messaging surfaces where communication already happens — Slack, WhatsApp, Teams — connected to the data sources and tools they already use, and capable of turning recurring tasks into reusable, automated skills.
          </p>

          <p>
            Users gave their OpenClaw agent access to email, calendar, files, code, and CRM. They built custom skills — everything from booking flights to sorting inboxes to writing investment memos. The agent became a colleague you could message, not a tool you had to switch to. For individuals, it is genuinely transformative.
          </p>

          <p>
            However, OpenClaw&apos;s architecture is fundamentally not designed for companies. There is no identity layer, no multi-user access model, no permission boundaries, no governance, and no audit trail. API keys are stored in plaintext configuration files accessible to any skill. Every user shares the same credentials. There is no concept of &quot;who is asking&quot; — and therefore no way to enforce that different people should have different levels of access.
          </p>

          <p>
            The security implications are significant. Within weeks, CrowdStrike published a full threat analysis of enterprise exposure risks. Cisco&apos;s AI security team documented malicious skills performing silent data exfiltration. Security researchers discovered 1,800+ exposed instances leaking API keys, OAuth tokens, and private conversations. A critical vulnerability (CVE-2026-25253, CVSS 8.8) was published enabling one-click remote code execution. Over 400 malicious skills were identified on the ClawHub marketplace.
          </p>

          <p>
            None of this is surprising. OpenClaw was built as a personal tool running on a single user&apos;s machine. The question is not whether people want powerful AI agents to augment and automate their work — OpenClaw proved they do, overwhelmingly. The question is who builds the infrastructure that makes it possible to deploy them within organizations.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold">
            The idea
          </p>

          <p>
            We are building a secure runtime for powerful AI agents in enterprise environments. Our vision is to enable companies to build and operate virtual employees — ranging from interactive assistants to fully autonomous agents — with the capability of OpenClaw but the security, governance, and multi-tenancy required by any organization.
          </p>

          <p>
            We believe that giving companies and their employees the ability to create virtual co-workers — right where they already do their work today — has the potential to fundamentally transform knowledge work at scale.
          </p>

          <p>
            This requires solving several hard challenges simultaneously:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-semibold">Multi-user identity and permissions</span> — the same agent must behave differently depending on who invokes it, inheriting the invoking user&apos;s specific access rights.
            </li>
            <li>
              <span className="font-semibold">Secure sandboxing</span> — each agent invocation runs in an isolated, stateless environment with no access to credentials or resources beyond what the current user is authorized to use.
            </li>
            <li>
              <span className="font-semibold">Zero-trust credential isolation</span> — the agent never has visibility into API keys, OAuth tokens, or authentication mechanisms, even indirectly.
            </li>
            <li>
              <span className="font-semibold">Verified tool and skill registries</span> — companies control which capabilities the agent has, which integrations are connected, and who has access to what.
            </li>
            <li>
              <span className="font-semibold">Shared context with isolated execution</span> — in team conversations, the agent maintains conversational context across multiple users while enforcing per-user permissions on every action.
            </li>
            <li>
              <span className="font-semibold">Company-wide context and memory</span> — creating a canonical agent that can see and reason across everything happening within the company — communications, knowledge bases, SaaS tools — while respecting access boundaries.
            </li>
            <li>
              <span className="font-semibold">Self-learning and skill evolution</span> — a loop where repeatable tasks are captured and translated into automated skills, initially through employees creating them manually, and eventually proactively through the agent observing workflows and codifying patterns.
            </li>
          </ul>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold">
            Architecture and approach
          </p>

          <p>
            The core architectural principle is straightforward: every agent invocation is a fresh, stateless cloud function, scoped entirely to the invoking user&apos;s permissions. The agent sees only the tools it is allowed to use, calls them without any knowledge of credentials, and dies after completing its task. Continuity across messages comes from an external memory store — not from a persistent process.
          </p>

          <pre className="text-xs md:text-sm leading-tight overflow-x-auto my-8 opacity-80">{`  User @-mentions agent in messaging surface (e.g. Slack)
                    |
                    v
          +-----------------------+
          |   Identity Gateway    |
          |   Authenticate user,  |
          |   resolve permissions  |
          +-----------+-----------+
                      |
                      v
          +-----------------------+
          |    Company Config     |
          |    Which tools are    |
          |    enabled? What are  |
          |    this user's        |
          |    permissions?       |
          +-----------+-----------+
                      |
                      v
 +----------------+ +-----+------+ +------------------+
 | User-defined   | |   Agent    | |   Tools API      |
 | Skills         +>+  Sandbox   +>+   Gateway        |
 | (employee-     | | (stateless | |   Injects user   |
 | created,       | |  cloud     | |   credentials,   |
 | within auth    | |  function) | |   executes,      |
 | scope)         | |            +>+   returns result  |
 +----------------+ |            | +------------------+
                    |            | +------------------+
                    |            +>+   Memory         |
                    |            | |   Read/write     |
                    +-----+------+ |   session, user, |
                          |        |   company memory |
                          v        +------------------+
                    +-----------+
                    |   Done    |
                    |   Write   |
                    |   back to |
                    |   memory, |
                    |   function|
                    |   dies    |
                    +-----------+`}</pre>

          <p className="font-semibold">
            The Identity Gateway
          </p>

          <p>
            When a user @-mentions the agent in a messaging surface (Slack, Teams, etc.), the message is intercepted by our Identity Gateway. The Gateway authenticates the user against the company&apos;s authentication provider and resolves their specific permission scope: which tools are they allowed to use, which data sources can they access, and what actions can they perform.
          </p>

          <p>
            The Gateway then initializes a fresh cloud function — the Agent Sandbox — with a tools manifest tailored to that specific user. The agent literally does not know about tools or integrations that the user is not authorized to access. They are simply not present in its context.
          </p>

          <p className="font-semibold">
            Zero-trust tool execution
          </p>

          <p>
            The list of available tools for a specific user is injected into the agent&apos;s context at initialization — the agent only knows about what it is allowed to use. When the agent invokes a tool, the actual execution is separately scoped: each call is routed through a Tools API Gateway, a separate process that the agent cannot reach.
          </p>

          <p>
            The agent can call tools — for example, <code className="text-sm opacity-80">notion_search(&quot;Q3 report&quot;)</code> or <code className="text-sm opacity-80">create_jira_ticket(title=&quot;...&quot;, project=&quot;ENG&quot;)</code> — but it only knows the function name and parameters. It has no concept of authentication. The Tools API Gateway resolves the invoking user&apos;s identity, retrieves their specific OAuth token or API key from a credential vault, checks the company&apos;s tool registry for authorization, executes the external API call with the user&apos;s credentials, and returns only the result to the agent.
          </p>

          <p>
            This is the fundamental architectural difference from OpenClaw, where API keys sit in plaintext config files accessible to any skill. In our architecture, even a successful prompt injection attack cannot extract credentials, because credentials do not exist anywhere in the agent&apos;s environment. They live in a separate layer the agent cannot access.
          </p>

          <p>
            This also means that the traditional permission model enforced by enterprise tools (Notion&apos;s workspace permissions, Google Drive&apos;s sharing settings, Active Directory groups) is fully maintained. The agent acts as the user, with the user&apos;s exact access level — no more, no less.
          </p>

          <p className="font-semibold">
            Verified tool registry and governance
          </p>

          <p>
            Before any agent runs, organization administrators configure the company&apos;s environment through a verified tool registry: which integrations are connected (Notion, Jira, Google Drive, GitHub, Salesforce, etc.), and which user roles or teams have access to each one. This functions as an internal app store for agent capabilities.
          </p>

          <p>
            The registry also controls governance settings: audit logging (every agent action is recorded with user identity, timestamp, tool accessed, and data touched), data retention policies, allowed LLM providers, maximum token budgets per session, and whether the agent can access a local filesystem for temporary work.
          </p>

          <p>
            The result: the agent becomes a governed corporate resource — like a managed laptop with approved software — rather than an uncontrolled personal tool with full system access.
          </p>

          <p className="font-semibold">
            Company-level agents
          </p>

          <p>
            In addition to user-scoped invocations, companies can define agents that operate with their own authorization scope, independent of any individual user&apos;s permissions. For example, a company might create a Customer Success Agent that has access to the CRM, the support ticketing system, and the customer communication history — exactly the tools and permissions it needs, nothing more. Or an Onboarding Agent that can access HR systems and internal documentation to guide new hires through their first weeks.
          </p>

          <p>
            These company-level agents are configured by the organization administrator with a fixed tool set and credential scope. When a user invokes them, the agent runs with its own predefined permissions rather than inheriting the user&apos;s. This is useful for standardized workflows where the agent needs consistent access regardless of who triggers it — while still logging every action and maintaining a full audit trail.
          </p>

          <p className="font-semibold">
            Memory: progressive disclosure across three scopes
          </p>

          <p>
            The agent&apos;s memory operates across three scopes — session, user, and company — accessed through one unified interface.
          </p>

          <p>
            <span className="font-semibold">Session memory</span> is scoped to a specific conversation thread. It stores the conversation history, which users are participating, and shared context accumulated during the thread. This is what allows multiple users to collaborate with the agent in the same Slack thread — every invocation loads the shared session state, regardless of who sent the latest message.
          </p>

          <p>
            <span className="font-semibold">User memory</span> is personal and persistent. It stores a user&apos;s preferences, past interactions, role context, and personal notes. It is loaded only for that user&apos;s invocations.
          </p>

          <p>
            <span className="font-semibold">Company memory</span> is organization-wide: the knowledge base, team structures, company policies, and shared documents.
          </p>

          <p>
            Not all memory is injected into every session. We use a progressive disclosure approach: a small amount of essential context (the current thread, the user&apos;s role, key company facts) is injected directly into the agent&apos;s context window to keep token usage low. Everything else is available through a queryable memory tool that the agent can call on demand. The memory layer automatically scopes results based on the invoking user&apos;s permissions.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold">
            Self-improvement and skill evolution
          </p>

          <p>
            One of the most powerful features of OpenClaw is that agents can self-improve: they can write their own skills and refine them over time. We believe employees should retain this ability within their authorized tool scope.
          </p>

          <p>
            For example, an employee might describe how they process incoming emails — sorting them by priority, flagging customer requests, drafting replies for routine inquiries. The agent can codify this into an employee-specific skill and retain it. These skills can then be invoked through cron schedules, heartbeat invocations, webhooks, or one-off requests.
          </p>

          <p>
            The governance layer ensures that employee-created skills can only operate within that employee&apos;s authorized tool scope. An employee cannot create a skill that accesses systems they don&apos;t have permission to use. Organization administrators retain visibility into all active skills through the governance console, and can promote useful employee-created skills to the company-wide verified registry if they prove valuable.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold">
            Vision: the autonomous AI superemployee
          </p>

          <p>
            The self-improvement loop points toward a longer-term vision. We envision a canonical AI superemployee — connected to all communication channels, knowledge bases, and SaaS tools. Always listening. In regular intervals, it extracts patterns and processes from the organization&apos;s workflows and codifies them into skills, becoming increasingly capable over time.
          </p>

          <p>
            A customer always asks a specific follow-up question after onboarding? The agent notices and creates a skill to proactively address it. The sales team always pulls the same four reports before a quarterly review? The agent observes, learns the pattern, and eventually prepares the package automatically. Over time, the agent moves from reactive assistant to proactive team member — automating workflows that no one had the time to formalize, because the agent learned them by watching the work happen.
          </p>

          <p>
            This is only possible with the governance and permission infrastructure we are building. Without it, an always-listening, self-improving agent is a security liability. With it, it becomes the most valuable employee a company can have.
          </p>

          <hr className="my-8 border-t border-current opacity-20" />

          <p className="font-semibold">
            Why now
          </p>

          <p>
            OpenClaw is here, and it is powerful. The speed and ease at which it is possible to build skills is staggering — a functional virtual employee with a dozen capabilities can be assembled in under a week. For anyone who has tried it, the potential is immediately obvious.
          </p>

          <p>
            This has created broad awareness among technology-forward leadership. Every CTO and Head of Engineering paying attention has seen what OpenClaw can do. The category does not need to be explained — the demand is proven and visceral. At the same time, security concerns are substantial and well-documented. CrowdStrike, Cisco, and Trend Micro have all published analyses of the risks within the past two weeks. The gap between what individuals can build and what companies can safely deploy is the opportunity.
          </p>

          <p>
            We have a narrow window to define the enterprise standard for this paradigm while the market is forming.
          </p>

        </div>
      </article>
    </main>
  );
}
