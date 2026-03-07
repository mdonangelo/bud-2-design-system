import { CopyButton } from "./CopyButton";
import s from "./TokenTable.module.css";

interface TokenRow {
  token: string;
  value: string;
  usage: string;
}

interface TokenTableProps {
  headers?: [string, string, string];
  rows: TokenRow[];
}

export function TokenTable({
  headers = ["Token", "Valor", "Uso"],
  rows,
}: TokenTableProps) {
  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td className={s.tokenCell}>
                <CopyButton text={`var(${row.token})`}>{row.token}</CopyButton>
              </td>
              <td className={s.valueCell}>{row.value}</td>
              <td className={s.usageCell}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
