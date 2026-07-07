import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/consulting-inquiry
 *
 * 現状はリクエスト内容をログ出力するだけのスタブです。
 * 本番運用では、以下のいずれかに差し替えてください:
 *   - Resend / SendGrid 等でスタッフ宛てにメール通知
 *   - 既存のCONTACTフォームが使っている送信処理を呼び出す
 *   - Google Sheets / Notion API 等への書き込み
 *
 * 個人情報を含むため、送信先・保存先は必ずアクセス制限された場所にしてください。
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const required = ["name", "email", "service"];
    for (const key of required) {
      if (!data?.[key]) {
        return NextResponse.json(
          { ok: false, error: `missing field: ${key}` },
          { status: 400 }
        );
      }
    }

    // TODO: ここで実際のメール送信/保存処理に差し替える
    console.log("[consulting-inquiry] new submission:", {
      ...data,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[consulting-inquiry] error:", err);
    return NextResponse.json({ ok: false, error: "invalid request" }, { status: 500 });
  }
}
