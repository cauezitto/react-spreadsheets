import React, { useState, useRef } from "react";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import api from "@/services/api";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { json } from "stream/consumers";

export const getServerSideProps = async () => {
  try {
    const response = await api.get("/api/relatorio-fundicao");

    console.log(response.data.data.attributes.data);

    return { props: { relatorio: response.data.data.attributes.data } };
  } catch (err) {
    // console.log(process.env);
    console.log(err);
    return { props: {} };
  }
};

const App = (props: any) => {
  const { relatorio } = props;
  const [data, setData] = useState<Matrix<CellBase<any>>>([]);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = async (jsonData: Object[]) => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([842, 595]); // Tamanho A4 Paisagem
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let x = 40;
    let y = height - 40;
    const margin = 40; // Margem
    const pageHeight = height; // Altura da página
    const rowHeight = 30; // Distância entre linhas de texto

    // Título
    page.drawText("Relatório Itens Fundição", { x: 40, y: y, size: 16, font });
    y -= 30;

    // Cabeçalhos
    headers.forEach((header, i) => {
      page.drawText(header, {
        x: x,
        y: y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
      if (header === "DESCRICAO") {
        x += 170;
      } else x += 100;
    });

    y -= rowHeight; // Espaço após os cabeçalhos
    x = 40;

    const sanitizeText = (text: string) =>
      text.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");

    const breakText = (text: string, maxLength: number) => {
      const lines: string[] = [];
      let currentLine = "";

      text.split(" ").forEach((word) => {
        if (currentLine.length + word.length + 1 <= maxLength) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) {
        lines.push(currentLine);
      }
      return lines;
    };

    // Adicionando os dados das linhas
    jsonData.forEach((row: any) => {
      headers.forEach((header) => {
        // Verifica se há espaço suficiente para a próxima linha
        if (y - rowHeight < margin) {
          // Adiciona uma nova página
          page = pdfDoc.addPage([842, 595]);
          const { width, height } = page.getSize(); // Pega o tamanho da nova página
          y = height - margin; // Reinicia a posição y na parte superior
        }

        if (header === "DESCRICAO") {
          const descriptionLines = breakText(
            sanitizeText(String(row[header] || "")),
            27
          );

          // Desenha cada linha da descrição
          descriptionLines.forEach((line, lineIndex) => {
            // Verifica se há espaço suficiente para a próxima linha
            if (y - rowHeight < margin) {
              // Adiciona uma nova página
              page = pdfDoc.addPage([842, 595]);
              const { width, height } = page.getSize(); // Pega o tamanho da nova página
              y = height - margin; // Reinicia a posição y na parte superior
            }

            page.drawText(line, {
              x: x,
              y: y - lineIndex * 10, // Ajusta a posição para cada linha da descrição
              size: 9,
              color: rgb(0, 0, 0),
            });
          });
          x += 170;
        } else {
          page.drawText(sanitizeText(String(row[header] || "")), {
            x: x,
            y: y,
            size: 9,
            color: rgb(0, 0, 0),
          });
          x += 100;
        }
      });

      y -= rowHeight; // Move a posição y para a próxima linha
      x = 40; // Reinicia a posição x para a próxima linha
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Baixar o arquivo
    const fileName = "planilha_exportada.pdf";
    // saveAs(blob, fileName);

    // Abrir caixa de diálogo de impressão
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const handlePrint = () => {
    if (printRef.current) {
      const originalContents = document.body.innerHTML;
      const printContents = printRef.current.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Recarrega a página para restaurar a interface
    }
  };

  // Definir a nova ordem dos cabeçalhos
  const headers = [
    "ID",
    "REFERENCIA",
    "DESCRICAO",
    "GRUPO",
    "QUANTIDADE",
    "PESO_UNIT",
    "PESO_TOTAL",
  ];

  // Converter JSON para o formato da tabela
  const spreadsheetData = [
    headers.map((header) => ({
      value: header,
      // readOnly: true,
      className: "header-cell",
    })),
    ...relatorio.map((item: any) =>
      headers.map((header) => ({ value: item[header] }))
    ),
  ];

  function rgbToHex(rgbString: string) {
    // Remove "rgb(" e ")" e divide os valores separados por vírgula
    const rgbValues = rgbString
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map(Number); // Converte para número

    // Converte os valores RGB de 0-1 para 0-255
    const r = Math.round(rgbValues[0] * 255);
    const g = Math.round(rgbValues[1] * 255);
    const b = Math.round(rgbValues[2] * 255);

    // Converte cada valor em hexadecimal
    const hex = (n: number) => n.toString(16).padStart(2, "0");

    return `#${hex(r)}${hex(g)}${hex(b)}`;
  }

  return (
    <div>
      <style>
        {`
          .header-cell {
            font-weight: bold;
            background-color: #d3d3d3; /* Fundo cinza */
            text-align: center;
          }

          /* Ajustes para impressão */
          @media print {
            body {
              -webkit-print-color-adjust: exact; /* Garante cores no cabeçalho */
              print-color-adjust: exact;
            }
            
            .print-container {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }

            table {
              width: 100%;
              table-layout: fixed;
              font-size: 10px; /* Reduz tamanho da fonte para caber na folha */
            }

            th, td {
              padding: 5px;
              text-align: center;
              border: 1px solid #ccc;
              word-wrap: break-word;
            }

            @page {
              size: A4 landscape; /* Modo paisagem para caber melhor */
              margin: 10mm;
            }
          }
        `}
      </style>
      <button
        onClick={() => generatePDF(relatorio)}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        🖨️ Imprimir Planilha
      </button>
      <div ref={printRef} className="print-container">
        <Spreadsheet data={spreadsheetData} />
      </div>
    </div>
  );
};

export default App;
