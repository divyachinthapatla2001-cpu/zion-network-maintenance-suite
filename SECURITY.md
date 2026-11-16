# Security

Do not disclose credentials or sensitive findings in public issues. This project does not request API keys or implement a private vulnerability-reporting backend. Use GitHub private vulnerability reporting if the repository offers it; otherwise contact the maintainer through an existing private channel before sharing sensitive details. No response SLA is promised.

Browser inputs remain local to application code. They are not sent to AI providers. HTML is parsed in a detached inert template, never attached to the active document, and report output is text-only. The suite does not execute pasted scripts. The maintenance demo fetches the bundled registry from the same origin; normal hosting requests still occur. Treat third-party HTML and JSON as untrusted data. Use non-sensitive examples and keep browser software current.

This is a diagnostic utility, not a penetration test, security scanner, or compliance certification. Repository maintainer: https://github.com/divyachinthapatla2001-cpu.
