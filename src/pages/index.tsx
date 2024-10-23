import React, { useState, useEffect } from "react";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import styles from "../styles/Sheets.module.css";
import { google, Auth, sheets_v4 } from "googleapis";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Root } from "@/types/sheet";

export const getServerSideProps = (async () => {
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    scopes: [process.env.SCOPES!],
    credentials: {
      type: process.env.TYPE!,
      private_key: process.env.PRIVATE_KEY!,
      client_email: process.env.CLIENT_EMAIL!,
      client_id: process.env.CLIENT_ID!,

      token_info_url: process.env.TOKEN_INFO_URL!,
      token_url: process.env.TOKEN_URL!,
    },
  });

  const spreadsheetId = process.env.SPREADSHEET_ID!;

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
}) satisfies GetServerSideProps<{ sheet_info: sheets_v4.Schema$Spreadsheet }>;

const App = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState<Matrix<CellBase<unknown>>>([]);

  useEffect(() => {
    const load_data = async () => {
      if (!props.sheet_info) return;
      const sheetData: Root = props as Root;
      if (!sheetData) console.log(sheetData, "props");
      const matrixData = sheetData.sheet_info.sheets[0].data
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

              const classes = `${
                border_bottom ? styles.stroke_on_bottom : " "
              }  ${border_left ? styles.stroke_on_left : " "}  ${
                border_right ? styles.stroke_on_right : " "
              }   ${border_top ? styles.stroke_on_top : " "}`;

              return {
                value: formattedValue,
                className: classes,
                readOnly: true,
              };
            })
          )
        )
        .flat();

      setData(matrixData);
    };

    load_data();
  }, []);

  return (
    <div>
      <Spreadsheet data={data} />
    </div>
  );
};

export default App;
