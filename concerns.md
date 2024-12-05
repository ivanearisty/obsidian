
**Operational**

Define  incident response plan, including escalation paths, communication channels, and rollback strategies for deployments

Ensure caching is configured to prevent unnecessary builds

Configure domains and subdomain that redirect to apex domain

**Security**

Implement a Content Security Policy (CSP) and proper security headers

Set up custom rules, IP blocking, and enabling managed rulesets for enhanced security. Setup Firewall.

Enable Log Drains to persist logs.

Review common SSL certificate issues.

Enable a Preview Deployment Suffix to use a custom domain for Preview Deployments

Commit lockfiles to pin dependencies and speed up builds through caching

Setup a firewall rule to block requests from bots.

**Reliability**

Enable Monitoring to debug and optimize performance, investigate errors and traffic, and more

Enable automatic function failover to add multi-region redundancy and protect against regional outages

Implement caching headers for static assets or function responses to reduce usage or origin requests

Consider using OpenTelemetry.

**Performance**

Enable Speed Insights for instant access to field performance data and Core Web Vitals

Review Time To First Byte (TTFB), Image Optimization, Script Optimization, and Font Optimization.

Ensure your Vercel Function region is the same as your origin API or database.

Consider the limitations of placing a third-party proxy in front of Vercel