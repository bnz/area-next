"use client"

import React, { useState } from "react"
import { Buffer } from "buffer"

const GITHUB_OWNER = "bnz"
const GITHUB_REPO = "aria-next"
const FILE_PATH = "data/translations.json" // путь до json-файла
const BRANCH = "main" // или "master"

function getUrl(search: string = "") {
	return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}${search}`
}

export default function Page() {
	const [token, setToken] = useState("")
	const [jsonText, setJsonText] = useState("")
	const [sha, setSha] = useState("")
	const [status, setStatus] = useState("")

	async function loadFile() {
		try {
			const res = await fetch(getUrl(`?ref=${BRANCH}`), {
				headers: {
					Authorization: `token ${token}`,
				},
			})
			const data = await res.json()
			const content = Buffer.from(data.content, "base64").toString("utf8")
			setJsonText(content)
			setSha(data.sha)
		} catch (err) {
			console.error(err)
			setStatus("Ошибка при загрузке файла")
		}
	}

	const saveFile = async () => {
		try {
			const base64Content = Buffer.from(jsonText).toString("base64")

			const res = await fetch(
				`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
				{
					method: "PUT",
					headers: {
						Authorization: `token ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message: "Обновление перевода через админку",
						content: base64Content,
						sha,
						branch: BRANCH,
					}),
				},
			)

			const result = await res.json()
			if (res.ok) {
				setSha(result.content.sha)
				setStatus("✅ Успешно сохранено!")
			} else {
				setStatus("❌ Ошибка при сохранении")
				console.error(result)
			}
		} catch (err) {
			console.error(err)
			setStatus("❌ Ошибка при сохранении")
		}
	}

	return (
		<div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
			<h1>Редактор JSON</h1>
			<input
				type="password"
				placeholder="Вставь GitHub Token"
				value={token}
				onChange={(e) => setToken(e.target.value)}
				style={{ width: "100%", marginBottom: "1rem" }}
			/>
			<button onClick={loadFile}>Загрузить JSON</button>
			<textarea
				rows={20}
				style={{ width: "100%", marginTop: "1rem", fontFamily: "monospace" }}
				value={jsonText}
				onChange={(e) => setJsonText(e.target.value)}
			/>
			<button onClick={saveFile} style={{ marginTop: "1rem" }}>
				💾 Сохранить
			</button>
			<div style={{ marginTop: "1rem", fontWeight: "bold" }}>{status}</div>
		</div>
	)
}
