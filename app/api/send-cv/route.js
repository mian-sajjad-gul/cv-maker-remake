import { NextResponse } from "next/server";
import { Resend } from "resend";

function generateResumeHtml({
  candidateName,
  recipientName,
  userMessage,
  data,
  shareUrl,
}) {
  const p = data?.personal || {};
  const experiences = data?.experience || [];
  const educations = data?.education || [];
  const skills = data?.skills || [];
  const summary = data?.summary || "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${candidateName || "Candidate"} - CV</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0f172a; color: #ffffff; padding: 32px 28px; }
    .header h1 { margin: 0 0 6px 0; font-size: 26px; font-weight: 800; color: #ffffff; }
    .header .subtitle { color: #94a3b8; font-size: 14px; margin: 0; }
    .contacts { margin-top: 12px; font-size: 13px; color: #cbd5e1; }
    .contacts a { color: #818cf8; text-decoration: none; }
    .content { padding: 28px; }
    .message-box { background: #f1f5f9; border-left: 4px solid #4f46e5; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px; font-size: 14px; color: #334155; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
    .item { margin-bottom: 14px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #0f172a; }
    .item-sub { font-size: 13px; color: #64748b; margin-top: 2px; }
    .item-desc { font-size: 13px; color: #334155; margin-top: 4px; white-space: pre-line; }
    .skills-pills { display: flex; flex-wrap: wrap; gap: 6px; }
    .skill-tag { background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin: 2px 4px 2px 0; }
    .cta-area { text-align: center; padding: 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
    .btn { display: inline-block; background: #0f172a; color: #ffffff !important; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; padding: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${p.name || candidateName || "Curriculum Vitae"}</h1>
      <p class="subtitle">${p.title || "Professional Profile"}</p>
      <div class="contacts">
        ${[p.email, p.phone, p.location].filter(Boolean).join(" · ")}
      </div>
    </div>

    <div class="content">
      ${userMessage ? `
      <div class="message-box">
        <strong>Note from ${candidateName || "Candidate"}:</strong>
        <p style="margin: 6px 0 0 0; white-space: pre-wrap;">${userMessage}</p>
      </div>` : ""}

      ${summary ? `
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0;">${summary}</p>
      </div>` : ""}

      ${experiences.length > 0 ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${experiences.map(exp => `
          <div class="item">
            <div class="item-header">
              <span>${exp.role || exp.title || "Role"}</span>
              <span style="color: #64748b; font-size: 12px;">${[exp.startDate, exp.endDate || "Present"].filter(Boolean).join(" — ")}</span>
            </div>
            <div class="item-sub">${exp.company || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
            ${exp.description ? `<div class="item-desc">${exp.description}</div>` : ""}
          </div>
        `).join("")}
      </div>` : ""}

      ${educations.length > 0 ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${educations.map(edu => `
          <div class="item">
            <div class="item-header">
              <span>${edu.degree || edu.field || "Degree"}</span>
              <span style="color: #64748b; font-size: 12px;">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</span>
            </div>
            <div class="item-sub">${edu.school || edu.institution || ""}${edu.location ? ` · ${edu.location}` : ""}</div>
          </div>
        `).join("")}
      </div>` : ""}

      ${skills.length > 0 ? `
      <div class="section">
        <div class="section-title">Key Skills</div>
        <div class="skills-pills">
          ${skills.map(s => `<span class="skill-tag">${typeof s === "string" ? s : s.name}</span>`).join(" ")}
        </div>
      </div>` : ""}
    </div>

    ${shareUrl ? `
    <div class="cta-area">
      <p style="font-size: 13px; color: #64748b; margin: 0 0 12px 0;">View full high-resolution ATS format and print options:</p>
      <a href="${shareUrl}" class="btn">View Interactive CV Online &rarr;</a>
    </div>` : ""}

    <div class="footer">
      Sent via <strong>CVPair</strong> — Professional CV & Resume Platform
    </div>
  </div>
</body>
</html>
`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      recipientName = "",
      candidateName = "Candidate",
      subject,
      userMessage = "",
      resumeData = {},
      shareUrl = "",
    } = body;

    if (!recipientEmail || !recipientEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid recipient email address is required." },
        { status: 400 }
      );
    }

    const emailSubject = subject || `${candidateName} — Resume / CV Presentation`;
    const htmlContent = generateResumeHtml({
      candidateName,
      recipientName,
      userMessage,
      data: resumeData,
      shareUrl,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // 1. If live Resend API key is present in environment
    if (apiKey && apiKey !== "re_your_api_key_here") {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: `CVPair Resumes <${fromEmail}>`,
        to: [recipientEmail.trim()],
        subject: emailSubject,
        html: htmlContent,
      });

      if (error) {
        console.error("[Resend Error]:", error);
        return NextResponse.json(
          { error: error.message || "Failed to dispatch email via Resend" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        dispatched: true,
        id: data?.id,
        message: `CV successfully sent to ${recipientEmail} via Resend.`,
      });
    }

    // 2. Simulated/Sandbox Mode (when RESEND_API_KEY is not yet populated)
    console.log(`[Resend Sandbox] Email prepared for ${recipientEmail}:`, {
      subject: emailSubject,
      candidate: candidateName,
    });

    return NextResponse.json({
      success: true,
      simulated: true,
      message: `CV sent to ${recipientEmail}! (Development mode: To connect live mail delivery, set RESEND_API_KEY in .env)`,
    });
  } catch (err) {
    console.error("[Send CV API Error]:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error dispatching email." },
      { status: 500 }
    );
  }
}
