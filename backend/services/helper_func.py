from config.Ai_config import client
from PyPDF2 import PdfReader
import docx



def extract_text(file):
    text = ""
    if file.filename.endswith(".pdf"):
        reader = PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() or ""
    elif file.filename.endswith(".docx"):
        doc = docx.Document(file)
        for para in doc.paragraphs:
            text += para.text + "\n"
    else:
        raise ValueError("Unsupported file type")
    return text


def parse_cv(cv_text: str):
    prompt = f"""
    You are an HR assistant helping recruiters.

    Step 1: Analyze the following CV text and extract:
      - Key technical skills
      - Soft skills
      - Work experience (short summary)
      - Education
    
    Step 2: Based only on the candidate’s claimed skills and experience,
    generate 5 general interview questions that a recruiter can use to test
    their knowledge and abilities.

    CV Text:
    {cv_text}
    """

    response = client.chat.completions.create(
        model="meta-llama/llama-3.3-8b-instruct:free",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    return response.choices[0].message.content

