"use client";

import { useState } from "react";

/**
 * SVZFC 海外移籍・挑戦サポート ページ
 * URL想定: https://svzfc.com/consulting/
 *
 * デザイン: 白背景・グレー・赤のみ。テキストベースのミニマルなレイアウト。
 * 組み込み手順はファイル末尾のコメントを参照してください。
 */

type ServiceType = "overseas" | "laos" | "tryout" | "other";

const SERVICES: {
  id: ServiceType;
  no: string;
  title: string;
  lead: string;
  points: string[];
}[] = [
  {
    id: "overseas",
    no: "01",
    title: "海外プロ契約相談",
    lead:
      "7カ国・14クラブでプレーした現役選手兼オーナーが、あなたの「海外で通用するのか」という問いに実践的に向き合います。",
    points: [
      "海外挑戦の可能性・タイミングの棚卸し",
      "エージェント/クラブとのマッチング相談",
      "契約書の読み方・条件交渉のポイント整理",
      "ビザ・渡航・現地生活の準備サポート",
    ],
  },
  {
    id: "laos",
    no: "02",
    title: "ラオスリーグ挑戦サポート",
    lead:
      "SVZFCの運営権を持つオーナーだからこそ、練習参加からトライアウト、契約までを現地から直接サポートできます。",
    points: [
      "SVZFCおよびラオスリーグ他クラブへのトライアウト調整",
      "就労ビザ・住居など現地生活の立ち上げ支援",
      "言語・文化面のフォロー(日本語対応)",
      "「初めての海外挑戦」として比較的挑戦しやすい環境",
    ],
  },
  {
    id: "tryout",
    no: "03",
    title: "国内トライアウト",
    lead:
      "海外挑戦の一歩目として、日本国内でのトライアウトを定期開催。プレーを直接見た上で次のステップをご案内します。",
    points: [
      "定期開催のZELOS TRYOUTへの参加案内",
      "参加後のフィードバックと個別面談",
      "適性に応じた「ラオス」または「他国」への道筋提示",
      "経歴・年齢を問わず挑戦したい方が対象",
    ],
  },
];

const FLOW = [
  { step: "01", title: "相談・エントリー", desc: "フォームまたはトライアウト参加からスタート。" },
  { step: "02", title: "ヒアリング", desc: "経歴・目標・希望環境を個別にすり合わせ。" },
  { step: "03", title: "マッチング", desc: "トライアウト先・挑戦先クラブをご案内。" },
  { step: "04", title: "契約・渡航支援", desc: "契約条件の確認、ビザ・渡航準備をサポート。" },
  { step: "05", title: "現地フォロー", desc: "生活立ち上げから定着までラオス在住スタッフが同行。" },
];

const STATS = [
  { num: "7", unit: "カ国", desc: "海外でのプレー経験(アルゼンチン含む)" },
  { num: "14", unit: "クラブ", desc: "これまでに所属したクラブ数" },
  { num: "6", unit: "年", desc: "ラオス在住・現地でのクラブ運営歴" },
  { num: "30+", unit: "名", desc: "海外挑戦をサポートしてきた選手数" },
];

export default function ConsultingPage() {
  const [form, setForm] = useState({
    name: "",
    furigana: "",
    age: "",
    position: "",
    affiliation: "",
    service: "overseas" as ServiceType,
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/consulting-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="cx">
      {/* HERO */}
      <section className="hero">
        <p className="eyebrow">SVZFC OVERSEAS CHALLENGE SUPPORT</p>
        <h1>
          世界へ、ラオスへ。
          <br />
          次の挑戦を、ここから。
        </h1>
        <p className="heroLead">
          7カ国・14クラブでプレーし、現在はラオスでクラブオーナー兼現役選手として活動する渡邉卓矢が、
          海外挑戦のリアルな一歩を後押しします。
        </p>
        <a className="ctaBtn" href="#apply">
          相談・申込フォームへ
        </a>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2 className="sectionTitle">3つのサポート</h2>
        <div className="serviceList">
          {SERVICES.map((s) => (
            <article className="serviceRow" key={s.id}>
              <div className="serviceNo">{s.no}</div>
              <div className="serviceBody">
                <h3>{s.title}</h3>
                <p className="serviceLead">{s.lead}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATS / WHY */}
      <section className="why">
        <h2 className="sectionTitle">なぜZELOSに相談するのか</h2>
        <div className="statGrid">
          {STATS.map((s) => (
            <div className="statItem" key={s.desc}>
              <div className="statNum">
                {s.num}
                <span className="statUnit">{s.unit}</span>
              </div>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="whyNote">
          「選ばれる側」としてプレーする経験と、「選ぶ側」としてクラブを運営する経験の両方を持つからこそ、
          海外挑戦に対して現実的で具体的な助言ができます。
        </p>
      </section>

      {/* FLOW */}
      <section className="flow">
        <h2 className="sectionTitle">サポートの流れ</h2>
        <div className="flowList">
          {FLOW.map((f) => (
            <div className="flowStep" key={f.step}>
              <div className="flowNum">{f.step}</div>
              <div className="flowText">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="apply" id="apply">
        <h2 className="sectionTitle">相談・申込フォーム</h2>

        {status === "done" ? (
          <p className="doneMsg">
            送信ありがとうございました。内容を確認のうえ、担当よりご連絡いたします。
          </p>
        ) : (
          <form className="form" onSubmit={submit}>
            <div className="row">
              <label>
                お名前 <span className="req">必須</span>
                <input required value={form.name} onChange={update("name")} />
              </label>
              <label>
                ふりがな
                <input value={form.furigana} onChange={update("furigana")} />
              </label>
            </div>

            <div className="row">
              <label>
                年齢
                <input value={form.age} onChange={update("age")} placeholder="例: 24" />
              </label>
              <label>
                ポジション
                <input value={form.position} onChange={update("position")} placeholder="例: MF" />
              </label>
            </div>

            <label>
              現在の所属・経歴
              <input
                value={form.affiliation}
                onChange={update("affiliation")}
                placeholder="現在の所属チーム、直近の実績など"
              />
            </label>

            <label>
              ご希望のサポート内容 <span className="req">必須</span>
              <select value={form.service} onChange={update("service")}>
                <option value="overseas">海外プロ契約相談</option>
                <option value="laos">ラオスリーグ挑戦サポート</option>
                <option value="tryout">国内トライアウト</option>
                <option value="other">その他・相談したい</option>
              </select>
            </label>

            <div className="row">
              <label>
                メールアドレス <span className="req">必須</span>
                <input required type="email" value={form.email} onChange={update("email")} />
              </label>
              <label>
                電話番号(任意)
                <input value={form.phone} onChange={update("phone")} />
              </label>
            </div>

            <label>
              相談内容・自己PR
              <textarea
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="挑戦したい国・リーグ、現在の状況、質問したいことなど"
              />
            </label>

            <button className="submitBtn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "送信中..." : "送信する"}
            </button>
            {status === "error" && (
              <p className="errMsg">送信に失敗しました。時間をおいて再度お試しください。</p>
            )}
          </form>
        )}
      </section>

      <style jsx>{`
        .cx {
          --red: #c0272d;
          --red-dark: #9e1f24;
          --ink: #1a1a1a;
          --gray: #6f6f6f;
          --gray-light: #b8b8b8;
          --hairline: #e4e4e4;
          font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
          color: var(--ink);
          background: #ffffff;
        }
        section {
          max-width: 760px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }
        .hero {
          padding-top: 6.5rem;
          padding-bottom: 4rem;
        }
        .eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--red);
          font-weight: 600;
          margin: 0 0 1.2rem;
        }
        .hero h1 {
          font-family: "Noto Serif JP", serif;
          font-size: clamp(1.9rem, 4.4vw, 2.9rem);
          line-height: 1.5;
          font-weight: 600;
          margin: 0 0 1.6rem;
          border-bottom: 2px solid var(--ink);
          padding-bottom: 1.6rem;
          display: inline-block;
        }
        .heroLead {
          max-width: 560px;
          line-height: 2;
          font-size: 0.95rem;
          color: var(--gray);
        }
        .ctaBtn {
          display: inline-block;
          margin-top: 2.2rem;
          padding: 0.8rem 1.9rem;
          background: var(--red);
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.88rem;
          letter-spacing: 0.03em;
          transition: background 0.15s ease;
        }
        .ctaBtn:hover {
          background: var(--red-dark);
        }

        .sectionTitle {
          font-family: "Noto Serif JP", serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 2.6rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--hairline);
        }

        .serviceList {
          display: flex;
          flex-direction: column;
        }
        .serviceRow {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 1.4rem;
          padding: 2.2rem 0;
          border-bottom: 1px solid var(--hairline);
        }
        .serviceRow:first-child {
          padding-top: 0;
        }
        .serviceRow:last-child {
          border-bottom: none;
        }
        .serviceNo {
          font-family: "Noto Serif JP", serif;
          font-size: 1.4rem;
          color: var(--red);
          font-weight: 600;
        }
        .serviceBody h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 0.7rem;
        }
        .serviceLead {
          font-size: 0.88rem;
          line-height: 1.85;
          color: var(--gray);
          margin: 0 0 1rem;
        }
        .serviceBody ul {
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.83rem;
          line-height: 1.9;
          color: var(--ink);
        }
        .serviceBody li {
          position: relative;
          padding-left: 1.1rem;
        }
        .serviceBody li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--red);
        }

        .statGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
          margin-bottom: 2.4rem;
        }
        .statItem {
          border-top: 2px solid var(--ink);
          padding-top: 0.9rem;
        }
        .statNum {
          font-family: "Noto Serif JP", serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--red);
          line-height: 1;
        }
        .statUnit {
          font-size: 0.72rem;
          color: var(--gray);
          margin-left: 0.2rem;
        }
        .statItem p {
          font-size: 0.78rem;
          color: var(--gray);
          line-height: 1.6;
          margin: 0.6rem 0 0;
        }
        .whyNote {
          font-size: 0.88rem;
          line-height: 1.9;
          color: var(--gray);
          border-left: 2px solid var(--red);
          padding-left: 1.1rem;
        }

        .flowList {
          display: flex;
          flex-direction: column;
        }
        .flowStep {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 1.4rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--hairline);
        }
        .flowStep:first-child {
          padding-top: 0;
        }
        .flowStep:last-child {
          border-bottom: none;
        }
        .flowNum {
          font-family: "Noto Serif JP", serif;
          font-size: 1.1rem;
          color: var(--gray-light);
          font-weight: 600;
        }
        .flowText h4 {
          margin: 0 0 0.3rem;
          font-size: 0.96rem;
          font-weight: 600;
        }
        .flowText p {
          margin: 0;
          font-size: 0.83rem;
          color: var(--gray);
          line-height: 1.7;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.3rem;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--gray);
        }
        .req {
          color: var(--red);
          font-size: 0.68rem;
          margin-left: 0.2rem;
        }
        input,
        select,
        textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--hairline);
          color: var(--ink);
          font-size: 0.95rem;
          padding: 0.5rem 0.1rem;
          outline: none;
          font-family: inherit;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-bottom-color: var(--red);
        }
        .submitBtn {
          margin-top: 0.8rem;
          align-self: flex-start;
          background: var(--red);
          color: #fff;
          font-weight: 600;
          border: none;
          padding: 0.8rem 2.4rem;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .submitBtn:hover {
          background: var(--red-dark);
        }
        .submitBtn:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .doneMsg {
          color: var(--gray);
        }
        .errMsg {
          color: var(--red);
          font-size: 0.82rem;
        }

        @media (max-width: 600px) {
          .statGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .row {
            grid-template-columns: 1fr;
          }
          section {
            padding: 3.5rem 1.3rem;
          }
        }
      `}</style>
    </main>
  );
}

/**
 * ── 組み込みメモ ──────────────────────────────────────────
 * 1) このファイルを既存リポジトリの app/consulting/page.tsx に配置。
 *    → https://svzfc.com/consulting/ で公開されます。
 *
 * 2) app/api/consulting-inquiry/route.ts も合わせて配置してください
 *    (前回渡したファイルのままで変更ありません)。
 *
 * 3) 見出しに "Noto Serif JP" を使う想定です。読み込みがなければ
 *    layout.tsx の <head> 等に追加してください:
 *    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600&display=swap" rel="stylesheet" />
 *
 * 4) 既存のヘッダー/フッターは app/layout.tsx 側で共通適用されている
 *    前提のため、本ファイルには含めていません。
 * ──────────────────────────────────────────────────────────
 */
