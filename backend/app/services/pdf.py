from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from datetime import datetime

def generate_month_pdf(entries, year: int, month: int) -> BytesIO:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph(f"Щоденник за {month:02d}.{year}", styles['Title']))
    story.append(Spacer(1, 12))

    for entry in sorted(entries, key=lambda x: x.date):
        text = f"<b>{entry.date}</b> — {entry.emoji} {entry.text[:200]}..."
        if entry.advice:
            text += f"<br/><i>{entry.advice}</i>"
        story.append(Paragraph(text, styles['Normal']))
        story.append(Spacer(1, 6))

    doc.build(story)
    buffer.seek(0)
    return buffer