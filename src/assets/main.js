function sendEmail(pdfBase64, curso, Modalidade) {
  // Verifica se as variáveis de ambiente estão carregadas corretamente
  const username = import.meta.env.VITE_USERNAME_EMAIL;
  const password = import.meta.env.VITE_PASSWORD_EMAIL;

  // Valida se as variáveis de ambiente estão definidas
  if (!username || !password) {
    console.error("Faltando nome de usuário ou senha do e-mail.");
    return;
  }

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: username,
    Password: password,
    To: "incricaointercursos@gmail.com",
    From: "incricaointercursos@gmail.com",
    Subject: `Inscrição Intercursos, Curso: ${curso}.`,
    Body: `Aqui está o PDF em anexo da inscrição do Curso: <strong>${curso}</strong> na Modalidade: <strong>${Modalidade}</strong>.`,
    Attachments: [
      {
        name: "Inscrição.pdf",
        data: pdfBase64,
        contentType: "application/pdf",
      },
    ],
  }).then(response => {
    console.log("E-mail enviado com sucesso:", response);
  }).catch(error => {
    console.error("Erro ao enviar e-mail:", error);
  });
}

export function updateTeams() {
  const gender = document.getElementById("genderSelect").value;
  const teamSelect = document.getElementById("teamSelect");
  let teamsHtml =
    '<option value="" disabled selected>Selecione o time</option>';

  if (gender === "Masculino") {
    teamsHtml += `
            <option value="Medicina">Medicina</option>
            <option value="Direito">Direito</option>
            <option value="Historia/Pedagogia">História/Pedagogia</option>
            <option value="Ciências Contábeis">Ciências Contábeis</option>
            <option value="Bacharelado em Sistemas de Informação (BSI)">Bacharelado em Sistemas de Informação (BSI)</option>
            <option value="Matematica">Matemática</option>
          `;
  } else if (gender === "Feminino") {
    teamsHtml += `
<option value="Medicina">Medicina</option>
<option value="Direito">Direito</option>
<option value="História/Pedagogia">História/Pedagogia</option>
<option value="Geografia/ Ciências Contábeis">Geografia/ Ciências Contábeis</option>
          `;
  }

  teamSelect.innerHTML = teamsHtml;
}

async function submitFormPDF() {
  const { jsPDF } = window.jspdf;
  const { PDFDocument } = window.PDFLib;

  let verticalOffset = 40; // Starting vertical position for athletes
  const boxWidth = 180; // Width of the box
  const boxHeight = 15; // Height of the box
  const padding = 5; // Padding inside the box

  // Collect form data
  const formData = new FormData(document.getElementById("athleteForm"));
  const pdfData = {};

  formData.forEach((value, key) => {
    pdfData[key] = value;
  });

  // Create a new PDF with jsPDF
  const pdf = new jsPDF();

  // Add the title
  pdf.setFontSize(20);
  pdf.setFont("Helvetica", "bold");
  const title = "Inscrição Para o Intercursos";
  const pageWidth = pdf.internal.pageSize.width;
  const titleX = pageWidth / 2 - 45;
  pdf.text(title, titleX, verticalOffset - 20);
  verticalOffset += -5; // Space after the title

  // Add form data to the PDF
  pdf.setFontSize(14);
  pdf.setFont("Helvetica", "bold");
  pdf.text("Modalidade:", 10, verticalOffset);
  pdf.setFontSize(12);
  pdf.setFont("Helvetica", "normal");
  pdf.text(`${pdfData.gender}`, 40, verticalOffset);
  pdf.setFontSize(14);
  pdf.setFont("Helvetica", "bold");
  pdf.text("Curso:", 10, verticalOffset + 6);
  pdf.setFontSize(12);
  pdf.setFont("Helvetica", "normal");
  pdf.text(`${pdfData.team}`, 27, verticalOffset + 6);
  verticalOffset += 20; // Space after form data

  // Add athlete data to the PDF
  for (let i = 1; i <= 14; i++) {
    if (pdfData[`name${i}`] && pdfData[`matricula${i}`]) {
      // Draw the box
      pdf.rect(10, verticalOffset - padding, boxWidth, boxHeight - 2);

      // Add text inside the box
      pdf.setFontSize(12); // Font size for name
      pdf.text(`Nome: ${pdfData[`name${i}`]}`, 12, verticalOffset);

      pdf.setFontSize(10); // Font size for matricula
      pdf.text(
        `Matrícula: ${pdfData[`matricula${i}`]}`,
        12,
        verticalOffset + 5
      ); // Small space between name and matricula

      verticalOffset += boxHeight + padding - 7; // Move down for the next entry
    }
  }

  // Generate the PDF file
  const pdfBlob = pdf.output("blob");

  // Combine with uploaded PDFs
  const pdfFiles = [];
  for (let i = 1; i <= 14; i++) {
    const fileInput = document.getElementById(`file${i}`);
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const arrayBuffer = await file.arrayBuffer();
      pdfFiles.push(arrayBuffer);
    }
  }

  // Combine PDFs using pdf-lib
  const mergedPdf = await PDFDocument.create();
  const pdfBytes = await pdfBlob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const [page] = await mergedPdf.copyPages(pdfDoc, [0]);
  mergedPdf.addPage(page);

  for (const pdfFile of pdfFiles) {
    const pdf = await PDFDocument.load(pdfFile);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save the merged PDF and create a Blob URL
  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Convert Blob to Base64
  const pdfbase64 = await blobToBase64(blob);

  // Open the PDF in a new tab
  window.open(url);

  // Create a link for download and click it programmatically
  const link = document.createElement("a");
  link.href = url;
  link.download = "inscricao_intercursos.pdf";
  document.body.appendChild(link); // Add the link to the DOM
  //link.click(); // Simulate the click to start the download
  document.body.removeChild(link); // Remove the link from the DOM

  // Define the cursoselecionado
  const cursoselecionado = pdfData.team;
  const Modalidaselecionada = pdfData.gender; // Ajuste conforme necessário

  // Call sendEmail with the Base64 string and the selected course
  sendEmail(pdfbase64, cursoselecionado, Modalidaselecionada);
}

// Função para converter Blob em Base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1]; // Remove a parte inicial da URL (data:application/pdf;base64,)
      resolve(base64data);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

window.submitFormPDF = submitFormPDF;
window.updateTeams = updateTeams;
