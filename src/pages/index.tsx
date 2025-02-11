import React, { useState, useEffect } from "react";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import styles from "../styles/Sheets.module.css";
import { google, Auth, sheets_v4 } from "googleapis";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Root } from "@/types/sheet";

export const getServerSideProps = (async () => {
  try {
    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      scopes: [process.env.NEXT_PUBLIC_SCOPES_SHEETS!],
      credentials: {
        type: process.env.NEXT_PUBLIC_TYPE_GOOGLE!,
        private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY_SHEETS!,
        client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL!,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
        token_info_url: process.env.NEXT_PUBLIC_TOKEN_INFO_URL!,
        token_url: process.env.NEXT_PUBLIC_TOKEN_URL!,
      },
    });

    const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID!;

    const googleSheets = google.sheets({
      version: "v4",
      auth,
    });

    const sheet = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
      ranges: ["Planilha1"],
      includeGridData: true,
      prettyPrint: true,
    });

    return { props: { sheet_info: sheet.data } };
  } catch (err) {
    // console.log(process.env);
    console.log(err);
    return { props: {} };
  }
}) satisfies GetServerSideProps<{ sheet_info?: sheets_v4.Schema$Spreadsheet }>;

const App = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState<Matrix<CellBase<any>>>([]);

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

  useEffect(() => {
    const load_data = async () => {
      if (!props.sheet_info) return;
      const sheetData: Root = props as Root;
      if (!sheetData) console.log(sheetData, "props");
      const matrixData: any = sheetData.sheet_info.sheets[0].data
        .map((daum) =>
          daum.rowData.map((row) =>
            row.values.map((value) => {
              const formattedValue = value.formattedValue || "";
              // const userEnteredFormat = value.userEnteredFormat || {};
              // console.log(value.effectiveFormat?.borders);
              const border_bottom =
                value.effectiveFormat?.borders?.bottom?.style;
              const border_left = value.effectiveFormat?.borders?.left?.style;
              const border_right = value.effectiveFormat?.borders?.right?.style;
              const border_top = value.effectiveFormat?.borders?.top?.style;
              const text_align = value.effectiveFormat?.horizontalAlignment;

              const rgb_color = value.effectiveFormat?.textFormat
                ?.foregroundColorStyle?.rgbColor?.red
                ? value.effectiveFormat?.textFormat?.foregroundColorStyle
                    ?.rgbColor
                : null;

              const bold_style = value.effectiveFormat?.textFormat.bold;

              const classes = `${
                border_bottom ? styles.stroke_on_bottom : " "
              }  ${border_left ? styles.stroke_on_left : " "}  ${
                border_right ? styles.stroke_on_right : " "
              }   ${border_top ? styles.stroke_on_top : " "}  ${
                text_align === "CENTER" ? styles.text_align_center : ""
              }`;

              const color = rgb_color
                ? rgbToHex(
                    `rgb(${rgb_color.red ? rgb_color.red : 0}, ${
                      rgb_color.green ? rgb_color.green : 0
                    }, ${rgb_color.blue ? rgb_color.blue : 0})`
                  )
                : "#000";

              // console.log(color);

              if (formattedValue == "") console.log(value);

              return {
                value: formattedValue,
                className: classes,
                // readOnly: true,
                DataViewer: () => (
                  <div
                    onClick={() => {
                      console.log(value.effectiveFormat);
                    }}
                    style={{
                      color,
                      fontWeight: bold_style ? "bold" : undefined,
                      fontFamily: "Calibri",
                    }}
                  >
                    {formattedValue}
                  </div>
                ),
              };
            })
          )
        )
        .flat();

      setData(matrixData);
    };

    load_data();
  }, [null]);

  return (
    <div>
      <Spreadsheet data={data} />
    </div>
  );
};

export default App;
