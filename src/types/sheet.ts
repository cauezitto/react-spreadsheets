/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Root {
  sheet_info: SheetInfo;
}

export interface SheetInfo {
  spreadsheetId: string;
  properties: Properties;
  sheets: Sheet[];
  spreadsheetUrl: string;
}

export interface Properties {
  title: string;
  locale: string;
  autoRecalc: string;
  timeZone: string;
  defaultFormat: DefaultFormat;
  spreadsheetTheme: SpreadsheetTheme;
}

export interface DefaultFormat {
  backgroundColor: BackgroundColor;
  padding: Padding;
  verticalAlignment: string;
  wrapStrategy: string;
  textFormat: TextFormat;
  backgroundColorStyle: BackgroundColorStyle;
}

export interface BackgroundColor {
  red: number;
  green: number;
  blue: number;
}

export interface Padding {
  right: number;
  left: number;
}

export interface TextFormat {
  foregroundColor: ForegroundColor;
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  foregroundColorStyle: ForegroundColorStyle;
}

export interface ForegroundColor {}

export interface ForegroundColorStyle {
  themeColor: string;
}

export interface BackgroundColorStyle {
  rgbColor: RgbColor;
}

export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface SpreadsheetTheme {
  primaryFontFamily: string;
  themeColors: ThemeColor[];
}

export interface ThemeColor {
  colorType: string;
  color: Color;
}

export interface Color {
  rgbColor: RgbColor2;
}

export interface RgbColor2 {
  red?: number;
  green?: number;
  blue?: number;
}

export interface Sheet {
  properties: Properties2;
  data: Daum[];
  merges: Merge[];
}

export interface Properties2 {
  sheetId: number;
  title: string;
  index: number;
  sheetType: string;
  gridProperties: GridProperties;
}

export interface GridProperties {
  rowCount: number;
  columnCount: number;
  rowGroupControlAfter: boolean;
  columnGroupControlAfter: boolean;
}

export interface Daum {
  rowData: RowDaum[];
  rowMetadata: RowMetadaum[];
  columnMetadata: ColumnMetadaum[];
}

export interface RowDaum {
  values: Value[];
}

export interface Value {
  userEnteredValue?: UserEnteredValue;
  effectiveValue?: EffectiveValue;
  formattedValue?: string;
  userEnteredFormat?: UserEnteredFormat;
  effectiveFormat?: EffectiveFormat;
}

export interface UserEnteredValue {
  stringValue?: string;
  numberValue?: number;
}

export interface EffectiveValue {
  stringValue?: string;
  numberValue?: number;
}

export interface UserEnteredFormat {
  horizontalAlignment?: string;
  textFormat?: TextFormat2;
  verticalAlignment?: string;
  borders?: Borders;
  wrapStrategy?: string;
  backgroundColor?: BackgroundColor2;
  backgroundColorStyle?: BackgroundColorStyle2;
  textRotation?: TextRotation;
  numberFormat?: NumberFormat;
}

export interface TextFormat2 {
  fontFamily?: string;
  fontSize: number;
  bold?: boolean;
  foregroundColor?: ForegroundColor2;
  foregroundColorStyle?: ForegroundColorStyle2;
  italic?: boolean;
}

export interface ForegroundColor2 {
  red?: number;
  green?: number;
  blue?: number;
}

export interface ForegroundColorStyle2 {
  themeColor?: string;
  rgbColor?: RgbColor3;
}

export interface RgbColor3 {
  red?: number;
  green?: number;
  blue?: number;
}

export interface Borders {
  top: Top;
  bottom: Bottom;
  left: Left;
  right?: Right;
}

export interface Top {
  style: string;
  width: number;
  color: Color2;
  colorStyle: ColorStyle;
}

export interface Color2 {}

export interface ColorStyle {
  rgbColor: RgbColor4;
}

export interface RgbColor4 {}

export interface Bottom {
  style: string;
  width: number;
  color: Color3;
  colorStyle: ColorStyle2;
}

export interface Color3 {}

export interface ColorStyle2 {
  rgbColor: RgbColor5;
}

export interface RgbColor5 {}

export interface Left {
  style: string;
  width: number;
  color: Color4;
  colorStyle: ColorStyle3;
}

export interface Color4 {}

export interface ColorStyle3 {
  rgbColor: RgbColor6;
}

export interface RgbColor6 {}

export interface Right {
  style: string;
  width: number;
  color: Color5;
  colorStyle: ColorStyle4;
}

export interface Color5 {}

export interface ColorStyle4 {
  rgbColor: RgbColor7;
}

export interface RgbColor7 {}

export interface BackgroundColor2 {
  red: number;
  green: number;
  blue: number;
}

export interface BackgroundColorStyle2 {
  rgbColor: RgbColor8;
}

export interface RgbColor8 {
  red: number;
  green: number;
  blue: number;
}

export interface TextRotation {
  vertical: boolean;
}

export interface NumberFormat {
  type: string;
  pattern: string;
}

export interface EffectiveFormat {
  backgroundColor: BackgroundColor3;
  padding: Padding2;
  horizontalAlignment?: string;
  verticalAlignment: string;
  wrapStrategy: string;
  textFormat: TextFormat3;
  backgroundColorStyle: BackgroundColorStyle3;
  hyperlinkDisplayType?: string;
  borders?: Borders2;
  textRotation?: TextRotation2;
  numberFormat?: NumberFormat2;
}

export interface BackgroundColor3 {
  red: number;
  green: number;
  blue: number;
}

export interface Padding2 {
  right: number;
  left: number;
}

export interface TextFormat3 {
  foregroundColor: ForegroundColor3;
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  foregroundColorStyle: ForegroundColorStyle3;
}

export interface ForegroundColor3 {
  red?: number;
  green?: number;
  blue?: number;
}

export interface ForegroundColorStyle3 {
  rgbColor?: RgbColor9;
  themeColor?: string;
}

export interface RgbColor9 {
  red?: number;
  green?: number;
  blue?: number;
}

export interface BackgroundColorStyle3 {
  rgbColor: RgbColor10;
}

export interface RgbColor10 {
  red: number;
  green: number;
  blue: number;
}

export interface Borders2 {
  top: Top2;
  bottom: Bottom2;
  left: Left2;
  right?: Right2;
}

export interface Top2 {
  style: string;
  width: number;
  color: Color6;
  colorStyle: ColorStyle5;
}

export interface Color6 {}

export interface ColorStyle5 {
  rgbColor: RgbColor11;
}

export interface RgbColor11 {}

export interface Bottom2 {
  style: string;
  width: number;
  color: Color7;
  colorStyle: ColorStyle6;
}

export interface Color7 {}

export interface ColorStyle6 {
  rgbColor: RgbColor12;
}

export interface RgbColor12 {}

export interface Left2 {
  style: string;
  width: number;
  color: Color8;
  colorStyle: ColorStyle7;
}

export interface Color8 {}

export interface ColorStyle7 {
  rgbColor: RgbColor13;
}

export interface RgbColor13 {}

export interface Right2 {
  style: string;
  width: number;
  color: Color9;
  colorStyle: ColorStyle8;
}

export interface Color9 {}

export interface ColorStyle8 {
  rgbColor: RgbColor14;
}

export interface RgbColor14 {}

export interface TextRotation2 {
  vertical: boolean;
}

export interface NumberFormat2 {
  type: string;
  pattern: string;
}

export interface RowMetadaum {
  pixelSize: number;
}

export interface ColumnMetadaum {
  pixelSize: number;
}

export interface Merge {
  sheetId: number;
  startRowIndex: number;
  endRowIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
}
/* eslint-enable @typescript-eslint/no-empty-interface */
